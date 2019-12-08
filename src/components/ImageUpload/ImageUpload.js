import React, { Component } from 'react';
import axios from 'axios';
 
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

  handleChange = (ev) => {
    this.setState({success: false, url : ""});

  }
  handleUpload = (ev) => {
    let file = this.upload.files[0];
    // Split the filename to get the name and type

    let fileParts = this.upload.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    console.log("Filename=", fileName);
    console.log("Filetype=", fileType);
    axios.post('/sign_s3',{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      const returnData = response.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url;
      this.props.handleAddImageUrl(url);
      console.log("Recieved a signed request ", signedRequest);
      console.log('returnData for axios.post to /sign_s3:', returnData);

      const options = {
        headers: {
          'Content-Type': fileType
        }
      };

console.log("About to axios.put, signedRequest=", signedRequest);
console.log("About to axios.put, file=", file);
console.log("About to axios.put, options=", options);


      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        console.log("Received error on axios.put, ", JSON.stringify(error));
        alert("ERROR ", JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }


  render() {
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