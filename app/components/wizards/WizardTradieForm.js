import React from "react";
import { StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Container,Header, Body, Title, Content, Button, Left, Icon, Right} from "native-base";

import CredentialForm from '../forms/register/CredentialForm';
import DetailForm from '../forms/register/DetailForm';
import AddrerssForm from '../forms/register/AddrerssForm';
import ConfirmationForm from '../forms/register/ConfirmationForm';
import { nextPage, previousPage } from '../../actions/actionCreator';


class WizardTradieForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  render(){
    const { t, i18n, navigation, page, onSubmit, wizardLabel } = this.props;
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
            <Title>{displayWizardTitle(page)}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder keyboardShouldPersistTaps={'always'}>
        {page === 0 &&<CredentialForm  {...this.props} onSubmit={this.props.nextPage} />}
        {page === 1 &&<DetailForm  {...this.props} previousPage={this.props.previousPage} onSubmit={this.props.nextPage} />}
        {page === 2 &&<AddrerssForm  {...this.props} previousPage={this.props.previousPage} onSubmit={this.props.nextPage} />}
        {page === 3 &&<ConfirmationForm  {...this.props} previousPage={this.props.previousPage}  onSubmit={onSubmit} />}
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

function mapStateToProps(state, props){
  return{
    page : state.page,
    form: props.wizardLabel
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ previousPage: previousPage, nextPage: nextPage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardTradieForm);