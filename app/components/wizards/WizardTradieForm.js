import React from "react";
import { StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';
import { Container,Header, Body, Title, Content, Button, Left, Icon, Right} from "native-base";

import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';

import CredentialForm from '../forms/register/CredentialForm';
import DetailForm from '../forms/register/DetailForm';
import BusinessListForm from '../forms/business/BusinessListForm';
import ConfirmationForm from '../forms/register/ConfirmationForm';
import { nextPage, previousPage, navigationBack } from '../../actions/actionCreator';

const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#157efc',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#157efc',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#157efc',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#157efc',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#157efc'
}

class WizardTradieForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = (values, dispatch) => {
    values = Object.assign({userType:1},values);
    console.log(values);
    return postUserAccount(values)
    .then(res => {
      this.props.nextPage();
      toastShow("Tradie account has been created", "success", 3000); 
    }).catch( err => {
      toastShow("Register failed, please try again", "danger", 3000);   
    });
  }

  render(){
    const { t, i18n, navigation, page, onSubmit, wizardLabel, onAddBusiness } = this.props;
    const displayWizardTitle = (pageIndex) => {
      let title = ''
      switch(pageIndex){
        case 0:
          title = 'Credential';
          break;
        case 1:
          title = 'Personal Detail';
         break;
        case 2:
          title = 'Business';
          break;
        default:
          title = 'Sign Up';
      }
      return title;
       
    }

    return (
      <Container>
        <Header>
           
            {page === 0 &&
              <Left>
                <Button transparent onPress={this.props.navigationBack}>
                    <Icon name="arrow-back" />
                </Button>
              </Left>
            }
          <Body>
            <Title>{displayWizardTitle(page)}</Title>
          </Body>
          {page === 0 && <Right />}
        </Header>
        <Content padder keyboardShouldPersistTaps={'always'}>
        <StepIndicator stepCount={3} customStyles={thirdIndicatorStyles} currentPosition={page} labels={["Credential","Personal Detail","Business"]} />
        {page === 0 &&<CredentialForm  {...this.props} onSubmit={this.props.nextPage} />}
        {page === 1 &&<DetailForm  {...this.props} previousPage={this.props.previousPage} onSubmit={(values,dispatch) => this.onSubmit(values, dispatch)}  />}
        {page === 2 &&<BusinessListForm formLabel='businessDetailForm' {...this.props}/>} 
        
      
        </Content>
      </Container>
    );
  }
}

WizardTradieForm.propTypes = {
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
};

//TODO: Bug from nativebase
const styles = StyleSheet.create({
  listItem:{
    marginLeft: 0, 
    paddingLeft: 17
  }
 
});

const mapStateToProps = (state, props) =>{
  return{
    page : state.page,
    form: props.wizardLabel
  };
}

const mapDispatchToProps = {
  navigationBack,
  previousPage,
  nextPage
};


export default connect(mapStateToProps, mapDispatchToProps)(WizardTradieForm);