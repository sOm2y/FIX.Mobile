import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  AsyncStorage,
  RefreshControl,
  Platform
} from 'react-native';
import { Notifications, Expo, Constants } from 'expo';
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
  Icon
} from 'native-base';
import { getAccessToken, postDeviceInfo } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import {
  logout,
  refreshJobs,
  navigateToCreateJob,
  navigationBackLoggedIn,
  jobDetail
} from '../../actions/actionCreator';

const deviceWidth = Dimensions.get('window').width;

const logo = require('../../resource/images/xero.png');
const cardImage = require('../../resource/images/tradie.jpg');

export class JobsScreen extends React.Component {
  componentDidMount() {
    getAccessToken()
      .then(value => {
        if (value !== null) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + value;
          console.log(axios.defaults.headers.common['Authorization']);
          if (this.props.userType) {
            this.props.refreshJobs(this.props.userType);
            console.log(this.props.userType);
          }
        }
      })
      .catch(err => {
        console.log(err);
        toastShow('Token expired, please login again', 'danger', 3000);
      });
  }

  static navigationOptions = ({ navigation }) => ({});

  render() {
    const { navigation, jobs, userType, isRefreshing } = this.props;
    const { navigate } = navigation;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Jobs</Title>
          </Body>
        </Header>
        <Content
          padder={Platform.OS === 'ios' ? true:false }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => this.props.refreshJobs(userType)}
         
            />
          }
        >
          {!!userType &&
            userType === 'Customer' && (
              <Button
                style={styles.button}
                block
                primary
                onPress={this.props.navigateToCreateJob}
              >
                <Text>Add new Job</Text>
              </Button>
            )}

          {jobs &&
            jobs.length > 0 &&
            jobs.map((job, key) => {
              return (
                <Card style={styles.mb} key={key}>
                  <CardItem
                    button
                    bordered
                    onPress={() => this.props.jobDetail(job.id)}
                  >
                    <Left>
                      <Thumbnail source={logo} />
                      <Body>
                        <Text>{job.title}</Text>
                        <Text note>{job.jobDate}</Text>
                      </Body>
                    </Left>
                    <Right>
                      <Icon name="ios-arrow-forward-outline" />
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
                              width: deviceWidth / 1.18,
                              marginVertical: 5
                            }}
                            source={{
                              uri:
                                'https://smartgeoio.blob.core.windows.net/fix/' +
                                job.jobImages[0].fileName
                            }}
                          />
                        )}
                      <Text>{job.description}</Text>
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
              );
            })}
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
    jobs: state.JobReducer.jobsResult,
    isRefreshing: state.JobReducer.isRefreshing,
    userType: state.ProfileReducer.userType
    // form: props.wizardLabel
  };
};

const mapDispatchToProps = {
  navigationBackLoggedIn,
  navigateToCreateJob,
  refreshJobs,
  logout,
  jobDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsScreen);
