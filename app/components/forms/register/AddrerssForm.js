import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import {
  Button,
  Text,
  Form,
  Spinner,
  List,
  ListItem,
  Radio,
  Left,
  Body,
  Right,
  Icon,
  Item
} from 'native-base';
import { Field, reduxForm, reset } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderPicker } from '../../inputs/renderPicker';
import { getAddresses } from '../../../services/addressService';
import { postAddress } from '../../../services/addressService';
import { toastShow } from '../../../services/toastService';
import AddAddressForm from '../address/AddAddressForm';

export class AddressForm extends React.Component {
  constructor() {
    super();
    this.state = {
      addressList: [],
      isLoadingAddress: true,
      isSelected: false,
      selectedAddressIndex: 0
    };
  }
  componentDidMount() {
    getAddresses().then(res => {
      this.setState({ addressList: res, isLoadingAddress: false });
      console.log(res);
    });
  }

  onSubmit = (values, dispatch) => {
    console.log(values);
    return postAddress(values)
      .then(res => {
        console.log(res);
        dispatch(reset('AddAddressForm'));
        this.setState({ isLoadingAddress: true });
        getAddresses()
          .then(res => {
            this.setState({ addressList: res, isLoadingAddress: false });
            console.log(res);
          })
          .catch(() => {
            this.setState({ isLoadingAddress: false });
          });

        toastShow('Add Address Successfully', 'success', 3000);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoadingAddress: false });
        toastShow('Add Address Unsuccessfully', 'danger', 3000);
      });
  };

  handleSelectAddress(i, event) {
    this.setState({ selectedAddressIndex: i });
  }

  static navigationOptions = ({ navigation }) => ({});

  render() {
    const {
      handleSubmit,
      navigation,
      pristine,
      submitting,
      previousPage,
      selectAddressName
    } = this.props;

    return (
      <Form>
        <AddAddressForm
          onSubmit={(values, dispatch) =>
            this.onSubmit(values.address, dispatch)
          }
        />
        {this.state.isLoadingAddress && <Spinner color="white" />}

        <Field
          label="Select Address"
          name={selectAddressName}
          iosHeader="Select Address"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ flex: Platform.OS === 'ios' ? undefined : 1 }}
          placeholder="Select Address"
          placeholderStyle={{ color: '#bfc6ea' }}
          mode="dropdown"
          component={renderPicker}
        >
          {this.state.addressList &&
            this.state.addressList[0] &&
            this.state.addressList.map((value, key) => {
              return <Item key={key} label={value.description} value={value} />;
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
  //   form: 'WizardForm', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(AddressForm);

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 17
  }
});
