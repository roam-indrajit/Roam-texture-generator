import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-west-1' });

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE = 'seamlessTextures'; 

export async function storeTextureMetadata({ id, prompt, imageUrl }) {
  await dynamoDb.put({
    TableName: TABLE,
    Item: {
      id,
      prompt,
      imageUrl,
      createdAt: new Date().toISOString(),
    },
  }).promise();
}
