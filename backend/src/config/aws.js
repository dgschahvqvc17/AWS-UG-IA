import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION || 'us-east-2';

export const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region }));
export const s3 = new S3Client({ region });

export const TABLE_NAME = process.env.DYNAMODB_TABLE || 'aws-ug-ia-dev-items';
export const BUCKET_NAME =
  process.env.S3_BUCKET || 'aws-ug-ia-dev-files-591015654164';
