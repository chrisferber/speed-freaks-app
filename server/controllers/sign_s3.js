const aws = require('aws-sdk');
require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
console.log('Calling aws.config.update');
console.log("Access Key=", process.env.AWSAccessKeyId);
console.log("Secret Key=", process.env.AWSSecretKey);
console.log("Bucket=", process.env.Bucket);
aws.config.update({
  region: 'us-east-2', // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

const S3_BUCKET = process.env.Bucket;
console.log("S3_BUCKET=", S3_BUCKET);
// Export this function so we can call it from somewhere else
console.log('About to make exports.sign_s3 call');
exports.sign_s3 = (req,res) => {
  const s3 = new aws.S3();  // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
// Set up the payload of what we are sending to the S3 api
console.log('About to set up s3Params');
console.log("S3_BUCKET=", S3_BUCKET);
console.log("fileName=", fileName);
console.log("fileType=", fileType);

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 50,
    ContentType: fileType,
    ACL: 'public-read'
  };

  console.log('About to make request to S3 API in sign_s3.js');
  console.log("S3Params=", s3Params);

// Make a request to the S3 API to get a signed URL which we can use to upload our file
s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      res.json({success: false, error: err})
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json({success:true, data:{returnData}});
  });
}
