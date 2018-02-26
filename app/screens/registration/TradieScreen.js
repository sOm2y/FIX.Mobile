import React from "react";
import { connect } from "react-redux";
import { reset } from 'redux-form';
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import { registerSuccess, showBusinessModal, hideBusinessModal } from "../../actions/actionCreator";

import WizardTradieForm from '../../components/wizards/WizardTradieForm';

class TradieScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });
  
  render(){
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
     <WizardTradieForm wizardLabel='WizardTradieForm' navigation={navigation}/>
    );
  }
}

const mapDispatchToProps = {
  registerSuccess,
  showBusinessModal
};

const TradieRegister = connect(null, mapDispatchToProps)(TradieScreen);

export default TradieRegister;