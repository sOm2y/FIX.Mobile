import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  Text,
  Card,
  CardItem,
  Spinner,
  List,
  ListItem,
  Content,
  Container,
  Header,
  Left,
  Icon,
  Body,
  Title,
  Right
} from 'native-base';
import { Field, reduxForm, reset } from 'redux-form';
import StepIndicator from 'react-native-step-indicator';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderPicker } from '../../../components/inputs/renderPicker';
import { renderTextarea } from '../../../components/inputs/renderTextarea';
import { getBusinesses, postBusiness } from '../../../services/businessService';
import { toastShow } from '../../../services/toastService';
import {
  showBusinessModal,
  hideBusinessModal,
  registerSuccess,
  nextPage,
  previousPage
} from '../../../actions/actionCreator';
import BusinessDetailForm from './BusinessDetailForm';
import InvoiceDetailForm from './InvoiceDetailForm';

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

export class BusinessListForm extends React.Component {
  constructor(props) {
    super(props);
    console.log('businesslist props' + props);
    this.state = {
      businesses: []
    };
  }

  static navigationOptions = ({ navigation }) => ({});

  componentDidMount() {
    getBusinesses()
      .then(res => {
        this.setState({ business: res });
        console.log(res);
      })
      .catch(err => {});
  }

  onSubmit = (business, dispatch) => {
    console.log(business);
    postBusiness(business)
      .then(res => {
        this.state.businesses.push(business);
        this.setState(this.state.businesses);
        this.props.hideBusinessModal();
        dispatch(reset('businessDetailForm'));
        dispatch(reset('WizardTradieForm'));
        toastShow('Add business Successfully', 'success', 3000);
      })
      .catch(err => {
        this.props.hideBusinessModal();
        toastShow('Add business unsuccessfully', 'success', 3000);
      });
  };

  render() {
    const {
      handleSubmit,
      navigation,
      pristine,
      submitting,
      previousPage,
      pickerItems,
      formName,
      isBusinessModalShowed,
      user,
      page
    } = this.props;

    const displayWizardTitle = pageIndex => {
      let title = '';
      switch (pageIndex) {
        case 0:
          title = 'Business Detail';
          break;
        case 1:
          title = 'Invoice Detail';
          break;

        default:
          title = 'Business Detail';
      }
      return title;
    };

    return (
      <Content>
        <Title>Hi {this.props.user.firstName}</Title>
        {this.state.businesses &&
          this.state.businesses.length > 0 &&
          this.state.businesses.map((business, key) => {
            return (
              <Card key={key}>
                <CardItem header>
                  <Text>{business.businessName}</Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text>Address: {business.businessAddress.description}</Text>
                    <Text>Phone: {business.businessPhone}</Text>
                    <Text>Email: {business.businessEmail}</Text>
                  </Body>
                </CardItem>
                <CardItem footer>
                  <Text>{business.taxNumber}</Text>
                </CardItem>
              </Card>
            );
          })}

        <Button
          block
          primary
          style={{ marginTop: 10 }}
          onPress={this.props.showBusinessModal}
          disabled={pristine || submitting}
        >
          <Text>Add Your Business</Text>
        </Button>

        <Button
          block
          transparent
          style={{ marginTop: 10 }}
          onPress={this.props.registerSuccess}
        >
          <Text>Finish</Text>
        </Button>

        <Modal
          visible={isBusinessModalShowed}
          animationType={'fade'}
          onRequestClose={this.props.hideBusinessModal}
        >
          <Container style={styles.modalContainer}>
            <Header>
              <Body>
                <Title>{formName}</Title>
              </Body>
            </Header>
            <Content padder keyboardShouldPersistTaps={'always'}>
  
              <StepIndicator
                stepCount={2}
                customStyles={thirdIndicatorStyles}
                currentPosition={page}
                labels={['Business Detail', 'Invoice Detail']}
              />
              {page === 2 && (
                <BusinessDetailForm
                  {...this.props}
                  form={formName}
                  previousPage={this.props.previousPage}
                  onSubmit={this.props.nextPage}
                />
              )}
              {page === 3 && (
                <InvoiceDetailForm
                  {...this.props}
                  form={formName}
                  onSubmit={(values, dispatch)=> this.onSubmit(values, dispatch)}
                />
              )}

              {page !== 3 && (
                <Button
                  block
                  primary
                  style={{ marginTop: 10 }}
                  onPress={this.props.hideBusinessModal}
                >
                  <Text>Cancel</Text>
                </Button>
              )}
            </Content>
          </Container>
        </Modal>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#e9e9ef'
  }
});

const mapStateToProps = (state, props) => {
  return {
    isBusinessModalShowed: state.BusinessReducer.isBusinessModalShowed,
    formName: props.formLabel,
    page: state.page
  };
};

const mapDispatchToProps = {
  showBusinessModal,
  hideBusinessModal,
  registerSuccess,
  previousPage,
  nextPage
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessListForm);
