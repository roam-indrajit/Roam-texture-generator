import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-west-1' });

const s3 = new AWS.S3();
const BUCKET = 'roam-seamless-textures'; 

export async function uploadBase64ToS3(base64Data, key) {
  const buffer = Buffer.from(base64Data, 'base64');

  await s3.putObject({
    Bucket: BUCKET,
    Key: key,
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: 'image/png',
  }).promise();

  return `https://${BUCKET}.s3.us-west-1.amazonaws.com/${key}`;
}
