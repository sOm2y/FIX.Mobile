import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';
import {  Button, Text, List, ListItem, Spinner, Body } from "native-base";

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

  render() {
    let { image } = this.state;

    return (
      <List>
        
        <ListItem style={{ marginLeft: 0}}>
          <Text>
            Example: Upload ImagePicker result
          </Text>
        </ListItem>
        <ListItem style={{ marginLeft: 0}}>
          <Button block primary
            onPress={this._pickImage}>
            <Text>  Pick an image from camera roll</Text>
          </Button>

          <Button block primary onPress={this._takePhoto}>
            <Text>Take A Photo</Text>
          </Button>
        </ListItem>
        <ListItem style={{ marginLeft: 0}}>
          {this._maybeRenderImage()}
          {this._maybeRenderUploadingOverlay()}
        </ListItem>
      </List>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
          <Spinner color="" />
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <List>
         <ListItem style={{ marginLeft: 0}}>
         <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
       </ListItem>
       
       <ListItem>
           <Text
           onPress={this._copyToClipboard}
           onLongPress={this._share}>
           {image}
         </Text>
       </ListItem>
      </List>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({ image: uploadResult.location });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}