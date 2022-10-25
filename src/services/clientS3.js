// const { S3 } = require("aws-sdk");
const { S3, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

exports.s3Uploadv3 = async (file, folder) => {
  const randomNum = Math.floor(Math.random() * 1000);
  const key = `${folder}/${randomNum}-${file.originalname}`;
  const endpoint = `https://reuso.nyc3.digitaloceanspaces.com/${key}`;
  console.log(file)

  const s3client = new S3({
    forcePathStyle: false,
    endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "nyc3",
    credentials: {
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET,
    }
  });

  const param = {
    Bucket: process.env.SPACES_NAME,
    Key: key ,
    // Permissions: "public-read",
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  await s3client.send(new PutObjectCommand(param))

  return endpoint;
};
