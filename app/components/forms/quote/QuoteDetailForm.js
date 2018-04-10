import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Right,
  Icon,
  Spinner,
  View
} from 'native-base';
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderPhone } from '../../inputs/renderPhone';
import { renderTextarea } from '../../inputs/renderTextarea';
import { updateQuote } from "../../../actions/actionCreator";

export class QuoteDetailForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({});

  render() {
    const { handleSubmit, navigation, submitting, quote, isUpdating } = this.props;

    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Quote From: {quote.businessName}</Text>
        

            {/*<Input disabled={!quote.canEdit} value={quote.notes} /> */}
          </CardItem>
          <CardItem>
            <Body>
                <Text>Estimate Cost ${quote.amount}</Text>
                <Text>Estimate Time {quote.hours}</Text>
                <Text>Note: {quote.notes}</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Body>
              <Text note>{quote.startTime}</Text>
            </Body>
          </CardItem>
        </Card>
        <Button
          block
          primary
          style={{ marginTop: 10 }}
          onPress={() => this.props.updateQuote({
              id: quote.id,
              jobId: quote.jobId,
              quoteOwnerId: quote.quoteOwnerId,
              accepted: true
          })}
          disabled={isUpdating}
        >
          {isUpdating ? <Spinner color="white" /> : <Text>Accept Quote</Text>}
        </Button>
        {/* <Button
          block
          primary
          style={{ marginTop: 10 }}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <Spinner color="white" />
          ) : (
            <Text>Decline Quote</Text>
          )}
        </Button> */}
      </View>
    );
  }
}
const mapStateToProps = (state, props) => {
    return {
        quote: state.QuoteReducer.quoteDetail,
        isUpdating: state.QuoteReducer.isUpdating,

      // form: props.wizardLabel
    };
  };
  
  const mapDispatchToProps = {
    updateQuote
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(QuoteDetailForm);
  