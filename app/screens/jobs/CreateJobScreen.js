import React from "react";
import { reset } from 'redux-form';
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import WizardJobForm from '../../components/wizards/WizardJobForm';



export default class CreateJobScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    navigation.navigate("JobFinder");
    return postUserAccount(values)
    .then(res => {
    
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
        <WizardJobForm onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />
    );
  }
}