import express from "express";
import { S3 } from "aws-sdk";
import multer from "multer";
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { join } from "path";
require("dotenv").config();

const app = express();
const port = 3000;

// AWS SDK yapılandırması
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  endpoint: process.env.LOCALSTACK_ENDPOINT,
  s3ForcePathStyle: true,
});

// Multer yapılandırması
const upload = multer({ dest: "uploads/" });

// S3 bucket oluşturma
s3.createBucket({ Bucket: process.env.S3_BUCKET_NAME }, (err, data) => {
  if (err && err.code !== "BucketAlreadyOwnedByYou") {
    console.log("Error creating bucket:", err);
  } else {
    console.log(`Bucket created: ${process.env.S3_BUCKET_NAME}`);
  }
});

// Dosya yükleme endpointi
app.post("/upload", upload.single("file"), (req, res) => {
  const fileContent = readFileSync(req.file.path);
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.file.originalname,
    Body: fileContent,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send(err);
    }
    res.send(`File uploaded successfully. ${data.Location}`);
  });
});

// Dosya indirme endpointi
app.get("/download/:filename", (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: req.params.filename,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error("Error downloading file:", err);
      return res.status(500).send(err);
    }

    const filePath = join(__dirname, "uploads", req.params.filename);
    writeFileSync(filePath, data.Body);
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
      }
      unlinkSync(filePath);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
