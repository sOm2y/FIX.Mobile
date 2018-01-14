import React from "react";
import { connect } from "react-redux";
import { reset } from 'redux-form';
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import { registerSuccess } from "../../actions/actionCreator";
import WizardCustomerForm from '../../components/wizards/WizardCustomerForm';


class CustomerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = (values, dispatch) => {
    console.log(values);
    return postUserAccount(values)
    .then(res => {
      dispatch(registerSuccess);
      dispatch(reset('WizardForm'));
      toastShow("SignIn Successfully", "success", 3000); 
    }).catch( err => {
      toastShow("SignIn Unsuccessfully", "danger", 3000); 
      console.log(err);  
    });
}
  render(){
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
     <WizardCustomerForm wizardLabel='WizardCustomerForm' navigation={navigation} onSubmit={(values,dispatch) => this.onSubmit(values, dispatch)} />
    );
  }
}

const mapDispatchToProps = {
  // registerSuccess
};

const CustomerRegister = connect(null, mapDispatchToProps)(CustomerScreen);

export default CustomerRegister;