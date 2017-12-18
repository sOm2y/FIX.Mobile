import React from "react";
import { reset } from 'redux-form';
import { postUserAccount } from '../services/authService';
import { toastShow } from '../services/toastService';
import CreateJobForm from '../components/forms/CreateJobForm';



export default class CreateJob extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    return postUserAccount(values)
    .then(res => {
      navigation.navigate("Home");
      dispatch(reset('WizardForm'));
      toastShow("SignIn Successfully", "success", 3000); 
    }).catch( err => {
      toastShow("SignIn Unsuccessfully", "danger", 3000);   
    });
}
  render(){
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
        <CreateJobForm navigation={navigation} onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />
    );
  }
}