import React, { Component } from 'react';
import { Container, Content, Header, Body, Title, Text, List, ListItem, Icon, Left} from "native-base";
import { View, Modal, StyleSheet, Button } from 'react-native';

export class ChangePasswordModal extends React.Component {

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
                <Title>CHANGE PASSWORD</Title>
              </Body>
            </Header>
            
            <Content>
              <List>
                <ListItem icon style={styles.listItem}>
                  <Left>
                    <Icon name="lock" />
                  </Left>
                  <Body>
                    <Text>Old Password: </Text>
                  </Body>
                </ListItem>
              </List>

              <Button
                onPress={this.props.closeModel}
                title="Change Password"
              />
              <Button
                onPress={this.props.closeModel}
                title="Cancel"
              />
            </Content>
          </Container>
        </Modal>
        
      </View>
    );
  }
}


export default ChangePasswordModal;

const styles = StyleSheet.create({
  listItem:{
    marginLeft: 0, 
    paddingLeft: 17
  }
});