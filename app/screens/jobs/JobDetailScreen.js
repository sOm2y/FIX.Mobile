import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import { Notifications, Expo } from 'expo';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  List,
  ListItem,
  Button,
  Text,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Icon,
  Input
} from 'native-base';
import { getAccessToken, postDeviceInfo } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import {
  logout,
  navigateToCreateJob,
  navigateToJobs,
  navigationBackLoggedIn,
  showQuoteModal,
  hideQuoteModal,
  submitQuote
} from '../../actions/actionCreator';
import { QuoteModal } from '../../components/modals/QuoteModal';

export class JobDetailScreen extends React.Component {
  //TODO: Put job state to reducer
  constructor(props) {
    super(props);
    this.state = {
      job: {}
    };
  }

  async componentWillMount() {}

  componentDidMount() {
    //this.props.refreshJobs();
  }

  static navigationOptions = ({ navigation }) => ({});

  render() {
    const { navigation, isRefreshing, job, isQuoteModalOpened, userType, user} = this.props;
    const { navigate } = navigation;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.props.navigationBackLoggedIn}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Job Detail</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>{job.title}</Text>
                  <Text note>{job.jobDate}</Text>
                  <Text>{job.description}</Text>
                </Body>
              </Left>
              <Right>
                <Text>{job.jobStatus}</Text>
              </Right>
            </CardItem>

            <CardItem>
              <Body>
                {job.jobImages &&
                  job.jobImages.length > 0 && (
                    <Image
                      style={{
                        alignSelf: 'center',
                        height: 150,
                        resizeMode: 'cover',
                        width: 320,
                        marginVertical: 5
                      }}
                      source={{
                        uri:
                          'https://smartgeoio.blob.core.windows.net/fix/' +
                          job.jobImages[0].fileName
                      }}
                    />
                  )}
              </Body>
            </CardItem>
            <CardItem style={{ paddingVertical: 0 }}>
              <Left>
                <Button transparent>
                  <Icon name="ios-locate-outline" />
                  <Text>{job.location.description}</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>

          {/* Quotes */}
          {job.quotes &&
            job.quotes.length > 0 &&
            job.quotes.reverse().map((quote, key) => {
              return (
                <Card key={key}>
                  <CardItem header>
                    <Text>Quote From: {quote.businessName}</Text>
                  
                    {/*<Input disabled={!quote.canEdit} value={quote.notes} /> */}
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        Estimate Cost ${quote.amount}
                      </Text>
                      <Text>
                        Estimate Time {quote.hours}
                      </Text>
                    </Body>
                    <Right>
                      <Icon name="ios-arrow-forward-outline" />
                    </Right>
                  </CardItem>
                  <CardItem footer>
                    <Body>
                      <Text note>{quote.startTime}</Text>
                    </Body>
                  </CardItem>
                </Card>
              );
            })}

          {job.assignedBusiness === null && userType === 'Tradie' &&
            <Button
              block
              style={styles.button}
              onPress={this.props.showQuoteModal}
            >
              <Text>Quote this job</Text>
            </Button>
          }
          <QuoteModal
            jobId={job.id}
            businessId={this.props.user.businesses&& this.props.user.businesses.length>0&&this.props.user.businesses[0].id}
            submitQuote={this.props.submitQuote}
            showModal={isQuoteModalOpened}
            closeModal={this.props.hideQuoteModal}
          />
        </Content>
      </Container>
    );
  }
}

//TODO: Bug from nativebase
let { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 17
  },
  button: {
    marginBottom: 20
  },
  image: {
    width: width,
    flex: 1,
    height: 200
  }
});

const mapStateToProps = (state, props) => {
  return {
    isRefreshing: state.JobReducer.isRefreshing,
    job: state.JobReducer.jobResult,
    isQuoteModalOpened: state.QuoteReducer.isQuoteModalOpened,
    userType: state.ProfileReducer.userType,
    user : state.ProfileReducer.user
    // form: props.wizardLabel
  };
};

const mapDispatchToProps = {
  navigationBackLoggedIn,
  navigateToCreateJob,
  navigateToJobs,
  showQuoteModal,
  hideQuoteModal,
  submitQuote,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailScreen);
