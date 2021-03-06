import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import QuoteDetailForm from '../forms/quote/QuoteDetailForm';

export class QuoteDetailModal extends React.Component {
  //   onSubmit = (values, dispatch) => {
  //     Object.assign(values,{jobId:this.props.jobId,businessId:this.props.businessId})
  //     this.props.submitQuote(values);
  //     dispatch(reset('QuoteForm'));
  //   };
  render() {
    const { navigation } = this.props;
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
                <Title>Quote Detail</Title>
              </Body>
            </Header>

            <Content padder keyboardShouldPersistTaps={'always'}>
              <QuoteDetailForm />

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

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 17
  }
});


