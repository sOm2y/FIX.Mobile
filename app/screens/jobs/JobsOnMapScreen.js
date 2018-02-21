import React from "react";
import {
  View
} from "react-native";
import { reset } from 'redux-form';
import {Callouts} from './Callouts';



export default class JobsOnMap extends React.Component {



  render(){
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
        <Callouts />
       
     
    );
  }
}