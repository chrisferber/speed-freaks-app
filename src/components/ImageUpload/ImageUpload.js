import React, { Component } from 'react';
import axios from 'axios';

// This component is rendered in CreateEvent component
// Allows a user to upload an image file on their local computer to be displayed with a created event by using the AWS S3 api
class ImageUpload extends Component {

constructor(props){
    super(props);
    this.state = {
      success : false,
      url : "",
      error: false,
      errorMessage : ""
    }
  }

  // Function that sets local state to success: false, url: "" to reset image upload process, called onChange of input for file
  handleChange = (ev) => {
    this.setState({success: false, url : ""});
  } // End handleChange function

  // Function called on UPLOAD button click
  // Makes axios.post request to sign_s3.js controller which returns a signedRequest needed for authorization to store file in S3 Bucket 
  // Then makes axios.put request with signedRequest to give that aws provided url the user inputed file
  handleUpload = (ev) => {
    let file = this.upload.files[0];
    // Split the filename to get the name and type

    let fileParts = this.upload.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    axios.post('/sign_s3',{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      const returnData = response.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url;
      this.props.handleAddImageUrl(url); // uses handleAddImageUrl function to give CreateEvent component's local state the url

      // defines paramaters needed by AWS api
      const options = {
        headers: {
          'Content-Type': fileType
        }
      };

      axios.put(signedRequest,file,options)
      .then(result => {
        this.setState({success: true});
      })
      .catch(error => {
        alert("ERROR ", JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  } // End handleUpload function

  render() {
    {/* Creates custom messages to render to notify user on successful or unsuccessful image upload */}
    const SuccessMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        <br/>
      </div>
    )
    const ErrorMessage = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'red'}}>FAILED UPLOAD</h3>
        <span style={{color: 'red', backgroundColor: 'black'}}>ERROR: </span>
        <span>{this.state.errorMessage}</span>
        <br/>
      </div>
    )
    return (
      <>
      <div className="imageUpload">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <SuccessMessage/> : null}
          {this.state.error ? <ErrorMessage/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.upload = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>
      <div>
        
      </div>
      </>
    );
  }
}

export default (ImageUpload);