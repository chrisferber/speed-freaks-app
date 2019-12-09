// brings in aws-sdk controller to communicate with aws api
const aws = require('aws-sdk');
 // Configure dotenv to load in the .env file
require('dotenv').config();
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

const S3_BUCKET = process.env.Bucket;
// Export this function so we can call it from the ImageUpload component
exports.sign_s3 = (req,res) => {
  const s3 = new aws.S3();  // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
// Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 50,
    ContentType: fileType,
    ACL: 'public-read'
  };

// Make a request to the S3 API to get a signed URL which will be used to upload files to my S3 bucket
s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      res.json({success: false, error: err})
    }
    // Data payload of what is being sent back to client, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json({success:true, data:{returnData}});
  });
}
