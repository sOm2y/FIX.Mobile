import React from 'react';
import { Button, Text, Form, Spinner } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderPhone } from '../../inputs/renderPhone';
import { renderTextarea } from '../../inputs/renderTextarea';

export class QuoteForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({});

  render() {
    const { handleSubmit, navigation, submitting } = this.props;

    return (
      <Form>
        <Field
          name="amount"
          type="currency"
          component={renderPhone}
          label="How much will cost for this job?"
        />
        <Field
          name="hours"
          type="number"
          component={renderPhone}
          label="How many hours can work be done?"
        />
        <Field
          name="note"
          type="text"
          component={renderTextarea}
          label="Note for customer"
        />

        <Button
          block
          primary
          style={{ marginTop: 10 }}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <Spinner color="white" />
          ) : (
            <Text>Send Quote</Text>
          )}
        </Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: 'QuoteForm', //                 <------ same form name
  validate
})(QuoteForm);
