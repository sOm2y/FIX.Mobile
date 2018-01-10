import React from "react";
import { StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';
import { Container,Header, Body, Title, Content, Button, Text, Left, Icon, Right} from "native-base";

import CredentialForm from '../forms/signup/CredentialForm';
import DetailForm from '../forms/signup/DetailForm';
import AddrerssForm from '../forms/signup/AddrerssForm';
import ConfirmationForm from '../forms/signup/ConfirmationForm';
import { nextPage, previousPage } from '../../actions/actionCreator';


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


class WizardCustomerForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({
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
            <Title>{displayWizardTitle(page)}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder keyboardShouldPersistTaps={'always'}>
        <StepIndicator stepCount={3} customStyles={thirdIndicatorStyles} currentPosition={page} labels={["Credential","Personal Detail","Address","Confirmation"]} />
        {page === 0 &&<CredentialForm onSubmit={this.props.nextPage} />}
        {page === 1 &&<DetailForm previousPage={this.props.previousPage} onSubmit={this.props.nextPage} />}
        {page === 2 &&<ConfirmationForm previousPage={this.props.previousPage}  onSubmit={onSubmit} />}
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