import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';
import JobMap from '../inputs/renderJobMap';

export default class JobMapModal extends Component {
   
  render() {
    const {isJobMapVisible} = this.props;
    return (
        <View style={styles.container}>
          <Modal
              visible={isJobMapVisible}
              animationType={'slide'}
             // onRequestClose={}
          >

          <JobMap />
          </Modal>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
});