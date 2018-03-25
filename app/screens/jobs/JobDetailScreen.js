import React from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  AsyncStorage,
  RefreshControl
} from "react-native";
import { Notifications, Expo } from "expo";
import { connect } from "react-redux";
import axios from "axios";
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
} from "native-base";
import { getAccessToken, postDeviceInfo } from "../../services/authService";
import { getJobs } from "../../services/jobService";
import { toastShow } from "../../services/toastService";
import {
  logout,
  refreshJobs,
  createJob,
  navigationBack
} from "../../actions/actionCreator";

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
    const { navigation, isRefreshing } = this.props;
    const { navigate } = navigation;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Job Detail</Title>
          </Body>
        </Header>
        <Content padder>
          <Card style={styles.mb} key={key}>
            <CardItem bordered>
              <Left>
                <Thumbnail source={logo} />
                <Body>
                  <Text>{job.title}</Text>
                  <Text note>{job.jobDate}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
                {job.jobImages &&
                  job.jobImages.length > 0 && (
                    <Image
                      style={{
                        alignSelf: "center",
                        height: 150,
                        resizeMode: "cover",
                        width: deviceWidth / 1.18,
                        marginVertical: 5
                      }}
                      source={{
                        uri:
                          "https://smartgeoio.blob.core.windows.net/fix/" +
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
        </Content>
      </Container>
    );
  }
}

//TODO: Bug from nativebase
let { width } = Dimensions.get("window");
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
    isRefreshing: state.JobReducer.isRefreshing
    // form: props.wizardLabel
  };
};

const mapDispatchToProps = {
  navigationBack,
  createJob,
  refreshJobs,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailScreen);
