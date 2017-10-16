import React from "react";
import { View } from "react-native";
import { Text, Button, Content, Form, Item, Input, Label } from "native-base";
import { onSignIn } from "../services/auth";

export default ({ navigation }) => (
  <Content>
    <Form>
      <Item floatingLabel>
        <Label>Username</Label>
        <Input />
      </Item>
      <Item floatingLabel last>
        <Label>Password</Label>
        <Input />
      </Item>
      <Button 
        block  
        onPress={() => {
          onSignIn().then(() => navigation.navigate("SignedIn"));
        }}
      >
        <Text>SIGN UP</Text>
      </Button>

      <Button
        block
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text>SIGN IN</Text>
      </Button>
    </Form>
  </Content>
);