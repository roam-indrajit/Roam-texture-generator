import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: process.env.MY_AWS_REGION
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE = 'seamlessTextures'; // or your actual table name

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing texture ID' });
  }

  try {
    const result = await dynamoDb.get({
      TableName: TABLE,
      Key: { id }
    }).promise();

    if (!result.Item) {
      return res.status(404).json({ error: 'Texture not found' });
    }

    return res.status(200).json(result.Item);
  } catch (err) {
    console.error('DynamoDB error:', err);
    return res.status(500).json({ error: 'Failed to fetch texture data' });
  }
}
