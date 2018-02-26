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
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { change } from "redux-form";
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';
import {  Button, Text, List, ListItem, Spinner, Body, ActionSheet } from "native-base";
import { uploadService } from '../../services/uploadService';

const BUTTONS = ["Take a photo", "Choose from camera roll", "Cancel"];

class ImageUpload extends React.Component {
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
            onPress={this.popUpActionSheet}>
            <Text>Upload</Text>
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

  popUpActionSheet = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: "UPLOAD PHOTOS"
      },
      buttonIndex => {
        if(buttonIndex === 0)
          this._takePhoto();
        else if(buttonIndex === 1)
          this._pickImage();
        this.setState({ clicked: BUTTONS[buttonIndex] });
      }
    )}
  

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;
    const { change } = this.props;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        console.log(pickerResult);
        let uri = pickerResult.uri;
        let uriParts = uri.split('.');
        let fileType = uri[uri.length - 1];
      
        let formData = new FormData();
        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });

        uploadResponse = await uploadService(formData);
      
        
        //TODO: support multiple upload
        this.setState({ image: 'https://smartgeoio.blob.core.windows.net/fix/'+uploadResponse[0].fileName });
        console.log(uploadResponse);
        this.setState({ uploading: false });
        change('WizardJobForm','jobImages', uploadResponse);

      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      this.setState({ uploading: false });
      alert('We are having issues to upload your photos, please try again later.');
    } 
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({change}, dispatch);
}

export default connect(null, mapDispatchToProps)(ImageUpload)