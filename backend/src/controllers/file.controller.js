// Controlador de archivos: URLs prefirmadas para S3.
import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3, BUCKET_NAME } from '../config/aws.js';

const fail = (res, error) =>
  res.status(500).json({ message: error.message || 'Error interno' });

export const list = async (_req, res) => {
  try {
    const { Contents = [] } = await s3.send(
      new ListObjectsV2Command({ Bucket: BUCKET_NAME }),
    );
    res.json(
      Contents.map((item) => ({
        key: item.Key,
        size: item.Size,
        lastModified: item.LastModified,
      })),
    );
  } catch (error) {
    fail(res, error);
  }
};

export const uploadUrl = async (req, res) => {
  try {
    const { fileName, contentType } = req.body || {};
    if (!fileName) {
      return res.status(400).json({ message: 'El campo fileName es obligatorio' });
    }

    const safeName = String(fileName).replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `${Date.now()}-${safeName}`;

    const url = await getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType || 'application/octet-stream',
      }),
      { expiresIn: 300 },
    );

    res.json({ key, url, method: 'PUT', expiresIn: 300 });
  } catch (error) {
    fail(res, error);
  }
};

export const downloadUrl = async (req, res) => {
  try {
    const key = req.query.key;
    if (!key) {
      return res.status(400).json({ message: 'El parámetro key es obligatorio' });
    }

    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({ Bucket: BUCKET_NAME, Key: String(key) }),
      { expiresIn: 300 },
    );

    res.json({ key, url, expiresIn: 300 });
  } catch (error) {
    fail(res, error);
  }
};
