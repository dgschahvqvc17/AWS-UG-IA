import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TABLE_NAME = process.env.TABLE_NAME;

export const handler = async (event) => {
  const records = event.Records ?? [];

  await Promise.all(
    records.map(async (record) => {
      const bucket = record.s3.bucket.name;
      const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

      await ddb.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: {
            id: `s3#${bucket}#${key}`,
            type: 's3-object',
            bucket,
            key,
            size: record.s3.object.size,
            eventTime: record.eventTime,
            updatedAt: new Date().toISOString(),
          },
        }),
      );
    }),
  );

  return { processed: records.length };
};
