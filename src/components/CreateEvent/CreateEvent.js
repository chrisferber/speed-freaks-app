import React, { Component } from 'react';
import ReactS3Uploader from 'react-s3-uploader';
 
class CreateEvent extends Component {
 
  handleFinishedUpload = info => {
    console.log('File uploaded with filename', info.filename)
    console.log('Access it on s3 at', info.fileUrl)
  }
 
  render() {
    const uploadOptions = {
      server: 'http://localhost:5000',
      signingUrlQueryParams: {uploadType: 'avatar'},
    }
    const s3Url = 'https://prime-example.s3.amazonaws.com'
 
    return (
      <ReactS3Uploader
        onFinish={this.handleFinishedUpload}
        s3Url={s3Url}
        maxSize={1024 * 1024 * 5}
        upload={uploadOptions}
      />
    )
  }
}

export default (CreateEvent);