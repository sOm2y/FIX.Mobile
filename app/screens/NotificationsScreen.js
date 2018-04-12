import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Header,
  Body,
  Title,
  Button,
  Text,
  List,
  ListItem,
  Thumbnail,
  Left,
  Right
} from "native-base";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  jobDetail
} from "../actions/actionCreator";
import { onSignOut } from "../services/authService";
import { getNotifications } from "../services/notificationService";

class NotificationsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      notifications: []
    };
  }

  componentDidMount() {
    getNotifications()
      .then(res => {
        this.setState({ notifications: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  static navigationOptions = ({ navigation }) => ({});
  render() {
    const { t, i18n, navigation, count } = this.props;
    const { navigate } = navigation;

    return (
      <Container>
        <Header>
          <Body>
            <Title>Notifications</Title>
          </Body>
        </Header>
        <Content>
          <List
            dataArray={this.state.notifications.reverse()}
            renderRow={notification => (
              <ListItem avatar style={styles.listItem}>
                <Left>
                  <Thumbnail
                    small
                    source={require("../resource/images/user1.png")}
                  />
                </Left>
                <Body>
                  <Text>{notification.content}</Text>
                  {/*} <Text numberOfLines={1} note>{notification.daysAgo}</Text>*/}
                  <Text note>{notification.daysAgo}</Text>
                </Body>
                <Right>
                  <Button
                    transparent
                    onPress={() => this.props.jobDetail(notification.jobId)}
                  >
                    <Text>View job</Text>
                  </Button>
                </Right>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count
  };
}
const mapDispatchToProps = {
  jobDetail
}
export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationsScreen
);

const styles = StyleSheet.create({
  listItem: {
    marginLeft: 0,
    paddingLeft: 17
  }
});
