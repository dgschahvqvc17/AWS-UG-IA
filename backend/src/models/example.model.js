// Modelo: datos persistidos en DynamoDB.
import { randomUUID } from 'node:crypto';
import { GetCommand, PutCommand, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { ddb, TABLE_NAME } from '../config/aws.js';

export const findAll = async () => {
  const { Items = [] } = await ddb.send(new ScanCommand({ TableName: TABLE_NAME }));
  return Items;
};

export const findById = async (id) => {
  const { Item } = await ddb.send(
    new GetCommand({ TableName: TABLE_NAME, Key: { id } }),
  );
  return Item ?? null;
};

export const create = async ({ nombre, descripcion }) => {
  const item = {
    id: `example#${randomUUID()}`,
    type: 'example',
    nombre,
    descripcion,
    createdAt: new Date().toISOString(),
  };

  await ddb.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
  return item;
};

export const remove = async (id) => {
  await ddb.send(new DeleteCommand({ TableName: TABLE_NAME, Key: { id } }));
  return true;
};
