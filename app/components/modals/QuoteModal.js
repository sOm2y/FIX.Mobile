import React, { Component } from 'react';
import { reset } from 'redux-form';
import {
  Container,
  Content,
  Header,
  Button,
  Body,
  Title,
  Text,
  List,
  ListItem,
  Icon,
  Left
} from 'native-base';
import { View, Modal, StyleSheet } from 'react-native';
import QuoteForm from '../forms/quote/QuoteForm';
import { postChangePassword } from '../../services/profileService';
import { toastShow } from '../../services/toastService';

export class QuoteModal extends React.Component {
  onSubmit = (values, dispatch) => {
      
    return postChangePassword(values)
      .then(res => {
        dispatch(reset('QuoteForm'));
        this.props.closeModel();
        toastShow('Password has been changed Successfully.', 'success', 3000);
      })
      .catch(err => {
        this.props.closeModel();
        toastShow('Change password failed, please try again.', 'danger', 3000);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.props.showModal}
          animationType={'slide'}
          onRequestClose={this.props.closeModel}
        >
          <Container>
            <Header>
              <Body>
                <Title>Quotation</Title>
              </Body>
            </Header>

            <Content padder keyboardShouldPersistTaps={'always'}>
              <QuoteForm
                onSubmit={(values, dispatch) => {
                  this.onSubmit(values, dispatch);
                }}
              />

              <Button
                block
                transparent
                onPress={this.props.closeModal}
                style={{ marginTop: 10 }}
              >
                <Text>Cancel</Text>
              </Button>
            </Content>
          </Container>
        </Modal>
      </View>
    );
  }
}

export default QuoteModal;

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 17
  }
});
