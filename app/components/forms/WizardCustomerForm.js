import React from "react";
import { StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';
import { Container,Header, Body, Title, Content, Button, Text, Left, Icon, Right} from "native-base";

import CredentialForm from './SignUp/CredentialForm';
import DetailForm from './SignUp/DetailForm';
import AddrerssForm from './SignUp/AddrerssForm';
import ConfirmationForm from './SignUp/ConfirmationForm';
import { nextPage, previousPage } from '../../actions/index';


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

@translate(['home', 'common'], { wait: true })

class WizardCustomerForm extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });

  render(){
    const { t, i18n, navigation, page, onSubmit } = this.props;
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
          title = 'Address';
          break;
        case 3:
          title = 'Confirmation';
          break;
        default:
          title = 'Sign Up';
      }
      return title;
       
    }

    return (
      <Container>
        <Header>
            <Left>
            {page === 0 &&
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
            }
            </Left>
          <Body>
            <Text>{displayWizardTitle(page)}</Text>
          </Body>
          <Right />
        </Header>
        <Content padder keyboardShouldPersistTaps={'always'}>
        <StepIndicator stepCount={4} customStyles={thirdIndicatorStyles} currentPosition={page} labels={["Credential","Personal Detail","Address","Confirmation"]} />
        {page === 0 &&<CredentialForm onSubmit={this.props.nextPage} />}
        {page === 1 &&<DetailForm previousPage={this.props.previousPage} onSubmit={this.props.nextPage} />}
        {page === 2 &&<AddrerssForm previousPage={this.props.previousPage} onSubmit={this.props.nextPage} />}
        {page === 3 &&<ConfirmationForm previousPage={this.props.previousPage}  onSubmit={onSubmit} />}
        </Content>
      </Container>
    );
  }
}

WizardCustomerForm.propTypes = {
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

function mapStateToProps(state){
  return{
    page : state.page
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ previousPage: previousPage, nextPage: nextPage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardCustomerForm);