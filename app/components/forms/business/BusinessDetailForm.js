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

export class BusinessDetailForm extends React.Component {
  constructor() {
    super();
    this.state = {
      businessCategories: []
    };
  }

  componentWillMount() {
    getBusinessCategories().then(res => {
      this.setState({ businessCategories: res });
    });
  }
  componentDidMount() {
    // change(this.props.form, 'businessPhone', this.props.user.phoneNumber);
    // change(this.props.form, 'businessEmail', this.props.user.email);
  }

  static navigationOptions = ({ navigation }) => ({});

  onSubmit = (address, dispatch, formName) => {
    // change(formName,, uploadResponse);
  };

  render() {
    const {
      handleSubmit,
      navigation,
      pristine,
      submitting,
      previousPage,
      pickerItems,
      // user
    } = this.props;

    return (
      <Form>
        <Field
          name="businessName"
          type="text"
          component={renderName}
          label="Business Name"
        />

        <Field
          name="businessLegalName"
          type="text"
          component={renderName}
          label="Business Legal Name"
        />

        <Field
          name="businessAddress"
          type="text"
          component={renderAddress}
          label="Your Business address"
        />
        <Field
          name="businessPhone"
          type="text"
          component={renderName}
          label="Your Business phone"
        />
        <Field
          name="businessEmail"
          type="text"
          component={renderName}
          label="Your Business email"
        />

        <Field
          label="Business Categories"
          name="businessCategoryIds"
          iosHeader="Select Business Category"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ flex: Platform.OS === 'ios' ? undefined : 1 }}
          placeholder="Select Business Category"
          placeholderStyle={{ color: '#bfc6ea' }}
          mode="dropdown"
          component={renderPicker}
        >
          {this.state.businessCategories &&
            this.state.businessCategories[0] &&
            this.state.businessCategories.map((value, key) => {
              return <Item key={key} label={value.name} value={[value.id]} />;
            })}
        </Field>

        <Button
          block
          primary
          style={{ marginTop: 10 }}
          onPress={handleSubmit}
          disabled={pristine || submitting}
        >
          <Text>Next</Text>
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
})(BusinessDetailForm);
