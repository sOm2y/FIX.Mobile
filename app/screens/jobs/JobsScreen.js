import React from 'react';
import {
  StyleSheet,
  Image,
  Dimensions,
  AsyncStorage,
  RefreshControl,
  Platform,
  View
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
import Moment from 'moment';
import Swiper from 'react-native-swiper';
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

const logo = require('../../resource/images/job_thumbnail.png');
const cardImage = require('../../resource/images/tradie.jpg');

export class JobsScreen extends React.Component {
  componentDidMount() {
    if (this.props.accessToken) {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + this.props.accessToken;

      if (this.props.userType) {
        this.props.refreshJobs(this.props.userType);
      }
    }
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
          padder={Platform.OS === 'ios' ? true : false}
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
            jobs.reverse().map((job, key) => {
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
                        <Text uppercase>{job.title}</Text>
                        <Text note>
                          Post on {Moment(job.jobDate).format('DD MMM YYYY')}
                        </Text>
                      </Body>
                    </Left>
                    {/* <Right> */}

                    <Icon name="ios-arrow-forward-outline" />
                    {/* </Right> */}
                  </CardItem>

                  <CardItem>
                    <Body>
                      <Swiper
                        style={styles.wrapper}
                        height={150}
                        onMomentumScrollEnd={(e, state, context) =>
                          console.log('index:', state.index)
                        }
                        // dot={
                        //   <View
                        //     style={{
                        //       backgroundColor: 'rgba(0,0,0,.2)',
                        //       width: 5,
                        //       height: 5,
                        //       borderRadius: 4,
                        //       marginLeft: 3,
                        //       marginRight: 3,
                        //       marginTop: 3,
                        //       marginBottom: 3
                        //     }}
                        //   />
                        // }
                        // activeDot={
                        //   <View
                        //     style={{
                        //       backgroundColor: '#000',
                        //       width: 8,
                        //       height: 8,
                        //       borderRadius: 4,
                        //       marginLeft: 3,
                        //       marginRight: 3,
                        //       marginTop: 3,
                        //       marginBottom: 3
                        //     }}
                        //   />
                        // }
                        paginationStyle={{
                          bottom: -20
                        }}
                      >
                        {job.jobImages &&
                          job.jobImages.length > 0 &&
                          job.jobImages.map((image, key) => {
                            return (
                              <View key={key} style={styles.slide}>
                                <Image
                                  resizeMode="cover"
                                  style={styles.image}
                                  source={{
                                    uri:
                                      'https://smartgeoio.blob.core.windows.net/fix/' +
                                      image.fileName&&image.fileName
                                  }}
                                />
                              </View>
                            );
                          })}
                      </Swiper>
                      <Text style={{ marginTop: 25 }}>{job.description}</Text>
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
  },
  container: {
    flex: 1
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state, props) => {
  return {
    jobs: state.JobReducer.jobsResult,
    isRefreshing: state.JobReducer.isRefreshing,
    userType: state.ProfileReducer.userType,
    accessToken: state.ProfileReducer.access_token
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
