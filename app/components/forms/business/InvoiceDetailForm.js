import React from 'react';
import { Platform } from 'react-native';
import { Button, Text, Form, Spinner, Icon, Item } from 'native-base';
import { Field, reduxForm, change } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderAddress } from '../../../components/inputs/renderAddress';
import { renderPicker } from '../../../components/inputs/renderPicker';
import AddAddressForm from '../../forms/address/AddAddressForm';
import { getBusinessCategories } from '../../../services/businessService';
import { renderPhone } from '../../inputs/renderPhone';

export class InvoiceDetailForm extends React.Component {
  constructor() {
    super();
    this.state = {
      businessCategories: []
    };
  }

  componentWillMount() {

  }
  componentDidMount() {

  }

  static navigationOptions = ({ navigation }) => ({});


  render() {
    const {
      handleSubmit,
      navigation,
      pristine,
      submitting,
      previousPage,
      pickerItems,
      user
    } = this.props;

    return (
      <Form>
        <Field
          name="taxNumber"
          type="text"
          component={renderName}
          label="Company Tax Number"
        />

        <Field
          name="businessBank"
          type="text"
          component={renderName}
          label="Business Bank Name"
        />

        <Field
          name="businessBankAccount"
          type="number"
          component={renderPhone}
          label="Business Bank Account"
        />

        <Button
          block
          primary
          style={{ marginTop: 10 }}
          onPress={handleSubmit}
          disabled={pristine || submitting}
        >
             {submitting ? <Spinner color='white' />: <Text>Register</Text>}
        </Button>
        <Button
          bordered
          block
          primary
          style={{ marginTop: 10 }}
          onPress={previousPage}
          disabled={submitting}
        >
          <Text>Previous</Text>
        </Button>
      </Form>
    );
  }
}

export default reduxForm({
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(InvoiceDetailForm);
