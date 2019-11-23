import React, { Component } from 'react';
import ReactS3Uploader from 'react-s3-uploader';
import axios from 'axios';
import ImageUpload from '../ImageUpload/ImageUpload';
 
class CreateEvent extends Component {
render() {
    return (
      <>
        <h1>Create an Event</h1>
        <div>
          <ImageUpload />
        </div>
      </>
    );
  }
}

export default (CreateEvent);