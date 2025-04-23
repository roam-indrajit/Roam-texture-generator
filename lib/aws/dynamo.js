import AWS from 'aws-sdk';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: process.env.MY_AWS_REGION
});

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
