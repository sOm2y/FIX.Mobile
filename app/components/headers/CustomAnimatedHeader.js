/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  PixelRatio,
  StyleSheet,
  View
} from 'react-native';
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
  Icon,
  Left,
  Right,
  Switch
} from 'native-base';
import Moment from 'moment';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

class CustomAnimatedHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(['Simplicity Matters'])
    };
  }

  render() {
    const { onScroll = () => {} } = this.props;
    
    return (
      <ParallaxScrollView
        onScroll={onScroll}
        headerBackgroundColor="#333"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        renderBackground={() => (
          <View key="background">
            <Image
              source={require('../../resource/images/profile_bg.jpg')}
              style={{
                width: window.width,
                height: PARALLAX_HEADER_HEIGHT
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                width: window.width,
                backgroundColor: 'rgba(0,0,0,.4)',
                height: PARALLAX_HEADER_HEIGHT
              }}
            />
          </View>
        )}
        renderForeground={() => (
          <View key="parallax-header" style={styles.parallaxHeader}>
            <Image
              style={styles.avatar}
              source={require('../../resource/images/user1.png')}
            />
            <Text style={styles.sectionSpeakerText}>Hi {this.props.user.userName}</Text>
            <Text style={styles.sectionTitleText}>
              First Join at {Moment(this.props.user.joinDate).format('DD MMM YYYY')}
            </Text>
          </View>
        )}
      >
        <List>
          <ListItem icon style={styles.listItem}>
            <Left>
              <Icon name="user" type='FontAwesome'/>
            </Left>
            <Body>
              <Text>Full Name: {this.props.user.fullName}</Text>
            </Body>
          </ListItem>
          <ListItem icon style={styles.listItem}>
            <Left>
              <Icon name="mail" />
            </Left>
            <Body>
              <Text>Email: {this.props.user.email}</Text>
            </Body>
          </ListItem>
          <ListItem icon style={styles.listItem}>
            <Left>
              <Icon name="phone" type='FontAwesome' />
            </Left>
            <Body>
              <Text>Phone: {this.props.user.phone}</Text>
            </Body>
          </ListItem>

          <Button
            style={{ margin: 10 }}
            block
            onPress={this.props.showChangePasswordModal}
          >
            <Text>CHANGE PASSWORD</Text>
          </Button>
        </List>
        <Button style={{ margin: 10 }} block onPress={this.props.logout}>
          <Text>SIGN OUT</Text>
        </Button>
      </ParallaxScrollView>

      /* <Text>{t('title')}</Text>
    <List>
      <ListItem style={[styles.listItem]}>
        <Button block
        onPress={() => { i18n.changeLanguage('cn') }}>
        <Text>{t('title')}</Text>
        </Button>
      </ListItem>
      <ListItem style={[styles.listItem]}>
        <Button block
        onPress={() => { i18n.changeLanguage('en') }}>
        <Text>{t('title')}</Text>
        </Button>
      </ListItem>
    </List> */
    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
    width: AVATAR_SIZE,
    height: AVATAR_SIZE
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});

export default CustomAnimatedHeader;
