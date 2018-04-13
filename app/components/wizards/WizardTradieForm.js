import React from 'react';
import { Permissions, Notifications, Constants } from 'expo';
import { StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Button,
  Left,
  Icon,
  Right
} from 'native-base';

import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';

import CredentialForm from '../forms/register/CredentialForm';
import DetailForm from '../forms/register/DetailForm';
import BusinessListForm from '../forms/business/BusinessListForm';
import ConfirmationForm from '../forms/register/ConfirmationForm';
import {
  nextPage,
  previousPage,
  login,
  setUserType,
  navigationBackLoggedOut
} from '../../actions/actionCreator';
import InvoiceDetailForm from '../forms/business/InvoiceDetailForm';
import BusinessDetailForm from '../forms/business/BusinessDetailForm';
import { postBusiness } from '../../services/businessService';

const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
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
};

class WizardTradieForm extends React.Component {
  constructor() {
    super();
  }
  static navigationOptions = ({ navigation }) => ({});

  onSubmit = async (values, dispatch) => {
    let pushToken = '';
    if (Constants.isDevice) {
      pushToken = await Notifications.getExpoPushTokenAsync();
    }
    values = Object.assign({ deviceToken: pushToken, userType: 1 }, values);

    console.log(values);

    return postUserAccount(values)
      .then(res => {
        
        this.props.setUserType(res.usertype);
        this.props.nextPage();


        // toastShow("Tradie account has been created", "success", 3000);
      })
      .catch(err => {
        toastShow('Register failed, please try again', 'danger', 3000);
      });
  };

  onPostBusiness = (business, dispatch) => {
    console.log(business);
    postBusiness(business)
      .then(res => {
        dispatch(reset('businessForm'));
        dispatch(reset('WizardTradieForm'));

        this.props.login();
        toastShow('Add business Successfully', 'success', 3000);
      })
      .catch(err => {
        toastShow('Add business unsuccessfully', 'success', 3000);
      });
  };

  render() {
    const { t, i18n, navigation, page, onSubmit, wizardLabel } = this.props;
    const displayWizardTitle = pageIndex => {
      let title = '';
      switch (pageIndex) {
        case 0:
          title = 'Credential';
          break;
        case 1:
          title = 'Personal Detail';
          break;
        case 2:
          title = 'Business Detail';
          break;
        case 3:
          title = 'Invoice Detail';
          break;
        default:
          title = 'Sign Up';
      }
      return title;
    };

    return (
      <Container>
        <Header>
          {page === 0 && (
            <Left>
              <Button transparent onPress={this.props.navigationBackLoggedOut}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
          )}
          <Body>
            <Title>{displayWizardTitle(page)}</Title>
          </Body>
          {page === 0 && <Right />}
        </Header>
        <Content padder keyboardShouldPersistTaps={'always'}>
          <StepIndicator
            stepCount={4}
            customStyles={thirdIndicatorStyles}
            currentPosition={page}
            labels={[
              'Credential',
              'Personal Detail',
              'Business Detail',
              'Invoice Detail'
            ]}
          />
          {page === 0 && (
            <CredentialForm {...this.props} onSubmit={this.props.nextPage} />
          )}
          {page === 1 && (
            <DetailForm
              {...this.props}
              previousPage={this.props.previousPage}
              onSubmit={(values, dispatch) => this.onSubmit(values, dispatch)}
            />
          )}
          {page === 2 && (
            <BusinessDetailForm
              {...this.props}
              form="businessForm"
              previousPage={this.props.previousPage}
              onSubmit={this.props.nextPage}
            />
          )}
          {page === 3 && (
            <InvoiceDetailForm
              {...this.props}
              form="businessForm"
              previousPage={this.props.previousPage}
              onSubmit={(values, dispatch) =>
                this.onPostBusiness(values, dispatch)
              }
            />
          )}
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
  listItem: {
    marginLeft: 0,
    paddingLeft: 17
  }
});

const mapStateToProps = (state, props) => {
  return {
    page: state.page,
    form: props.wizardLabel
  };
};

const mapDispatchToProps = {
  navigationBackLoggedOut,
  previousPage,
  nextPage,
  login,
  setUserType
};

export default connect(mapStateToProps, mapDispatchToProps)(WizardTradieForm);
