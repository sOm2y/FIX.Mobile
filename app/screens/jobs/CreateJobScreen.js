import React from "react";
import {
  View
} from "react-native";
import { reset } from 'redux-form';
import { postJob } from '../../services/jobService';
import { toastShow } from '../../services/toastService';
import WizardJobForm from '../../components/wizards/WizardJobForm';




export default class CreateJobScreen extends React.Component {

  constructor(){
    super();
    this.state = {
      isVisible:false
    }
  }

  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    this.setState({isVisible:true});
    
    return postJob(values)
    .then(res => {
      
      dispatch(reset('WizardJobForm'));
      navigation.navigate("JobFinder");
      toastShow("SignIn Successfully", "success", 3000); 
    }).catch( err => {
      toastShow("SignIn Unsuccessfully", "danger", 3000);   
    });
}
  render(){
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (

        <WizardJobForm wizardLabel='WizardJobForm' onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />
     
    );
  }
}