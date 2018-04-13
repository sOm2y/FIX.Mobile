import React from "react";
import { Permissions, Notifications, Constants } from 'expo';
import { connect } from "react-redux";
import { reset } from 'redux-form';
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import { login, setUserType } from "../../actions/actionCreator";
import WizardCustomerForm from '../../components/wizards/WizardCustomerForm';


class CustomerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = async (values, dispatch) => {

    let pushToken = '';
    if(Constants.isDevice){
      pushToken = await Notifications.getExpoPushTokenAsync();
    }
    return postUserAccount(values)
    .then(res => {
      dispatch(reset('WizardCustomerForm'));

      this.props.setUserType(res.usertype);
      this.props.login();
     
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
    login,
    setUserType
};

const CustomerRegister = connect(null, mapDispatchToProps)(CustomerScreen);

export default CustomerRegister;