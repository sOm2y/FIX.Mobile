import React from "react";
import { View } from "react-native";
import { Content, Button, Text } from "native-base";
import { onSignOut } from "../services/auth";

export default ({ navigation }) => (
  <Content>
    <Button
      block
      onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
    >
    <Text>SIGN OUT</Text>
    </Button>
  </Content>

);