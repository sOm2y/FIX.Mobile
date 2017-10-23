import React from "react";
import { View } from "react-native";
import { Card, Button} from "native-base";
import { onSignIn } from "../services/auth";

export default class SignIn extends React.Component {
  static navigationOptions = ({ navigation}) => ({
    title: 'SignIn'
  });

  render(){
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
    
        </Card>
      </View>
    );
  }
}
