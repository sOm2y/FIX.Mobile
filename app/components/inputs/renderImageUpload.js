import React from 'react';
import {
  ActivityIndicator,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change } from 'redux-form';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';
import GridView from 'react-native-super-grid';

import {
  Button,
  Text,
  List,
  ListItem,
  Spinner,
  Body,
  ActionSheet,
  Icon,
  H1,
  H3
} from 'native-base';
import { uploadService } from '../../services/uploadService';

const BUTTONS = ['Take a photo', 'Choose from camera roll', 'Cancel'];

class ImageUpload extends React.Component {
  state = {
    images: [],
    uploading: false
  };

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      images: files
    });
  };

  render() {
    let { images, uploading } = this.state;

    return (
      <List>
        <Text note style={{alignSelf:'center'}}>You can upload up to two images at a time</Text>
        {this._maybeRenderImage()}
        <TouchableOpacity
          style={{
            backgroundColor: '#ccc',
            width: 100,
            height: 80,
            alignItems: 'center',
            marginLeft: 10
          }}
          onPress={this.popUpActionSheet}
        >
          <Icon style={{ paddingTop: 25 }} size={100} name="md-add" />
        </TouchableOpacity>
        {/* {this._maybeRenderUploadingOverlay()} */}

        <Button
          block
          primary
          style={{ marginTop: 10 }}
          onPress={this.uploadImages}
          disabled={uploading}
        >
          {uploading ? <Spinner color="white" /> : <Text>Upload Images</Text>}
        </Button>
      </List>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return <Spinner color="" />;
    }
  };

  removeImage = image => {
    let { images } = this.state;
    let removedImages = images.filter(ele => ele !== image);
    this.setState({ images: removedImages });
    console.log(image.uri);
  };
  _maybeRenderImage = () => {
    let { images } = this.state;
    if (!images) {
      return;
    }

    return (
      <GridView
        itemDimension={100}
        items={images}
        renderItem={image => (
          <View>
            <Image
              source={{ uri: image.uri }}
              style={{ width: 100, height: 80 }}
            />
            <TouchableOpacity
              onPress={() => this.removeImage(image)}
              style={{ flex: 1, position: 'absolute' }}
            >
              <Icon
                style={{
                  position: 'absolute',
                  // top: 0,
                  left: 73,
                  color: 'red'
                }}
                fontSize={10}
                name="md-close-circle"
              />
            </TouchableOpacity>
          </View>

          // <Text onPress={this._copyToClipboard} onLongPress={this._share}>
          //   {image.uri}
          // </Text>
        )}
      />
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      // allowsEditing: true,
      // aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  popUpActionSheet = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: 'UPLOAD PHOTOS'
      },
      buttonIndex => {
        if (buttonIndex === 0) this._takePhoto();
        else if (buttonIndex === 1) this._pickImage();
        this.setState({ clicked: BUTTONS[buttonIndex] });
      }
    );
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true
      // aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  uploadImages = async () => {
    const { change } = this.props;
    const { images, uploading } = this.state;
    let uploadResponse, uploadResult;
    try {
      this.setState({ uploading: true });
      let formData = new FormData();

      images.map((image, key) => {
        let uri = image.uri;
        let uriParts = uri.split('.');
        let fileType = uriParts[1];
        formData.append('photo', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`
        });
      });

      uploadResponse = await uploadService(formData);

      this.setState({ uploading: false });

      change('WizardJobForm', 'jobImages', uploadResponse);
    } catch (error) {
      this.setState({ uploading: false });
      alert(
        'We are having issues to upload your photos, please try again later.'
      );
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;
    const { change } = this.props;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        let tempImages = this.state.images;
        tempImages.push(pickerResult);

        // let formData = new FormData();
        // formData.append('photo', {
        //   uri,
        //   name: `photo.${fileType}`,
        //   type: `image/${fileType}`
        // });

        // uploadResponse = await uploadService(formData);

        // //TODO: support multiple upload
        // this.setState({
        //   image:
        //     'https://smartgeoio.blob.core.windows.net/fix/' +
        //     uploadResponse[0].fileName
        // });

        this.setState({
          images: tempImages,
          uploading: false
        });
        // change('WizardJobForm', 'jobImages', uploadResponse);
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      this.setState({ uploading: false });
      alert(
        'We are having issues to upload your photos, please try again later.'
      );
    }
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ change }, dispatch);
};

export default connect(null, mapDispatchToProps)(ImageUpload);
