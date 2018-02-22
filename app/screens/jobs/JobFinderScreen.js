import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  Platform
} from "react-native";
import { connect } from 'react-redux';
import { Constants, Location, Permissions, AppLoading } from 'expo';
import MapView from 'react-native-maps';
import { navigationBack } from '../../actions/actionCreator';
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Left, Right, Icon } from "native-base";


const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
];

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;
    
class JobFinderScreen extends Component {
  constructor(){
      super();
      this.state = {
          markers: [
          {
              coordinate: {
              latitude: 45.521016,
              longitude: -122.6561917,
              },
              title: "Your Location",
              description: "This is the fourth best place in Auckland",
              image: require("../../resource/images/tradie.jpg"),
          }
          ],
          region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
          },
          isReady: false
      };
  }

  async componentWillMount() {
      this.index = 0;
      this.animation = new Animated.Value(0);

      if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
      } else {
          await this.getLocationAsync();
          
      }
      
    }

    componentDidMount() {
      // We should detect when scrolling has stopped then animate
      // We should just debounce the event listener here
      this.animation.addListener(({ value }) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= this.state.markers.length) {
          index = this.state.markers.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }
  
        clearTimeout(this.regionTimeout);
        this.regionTimeout = setTimeout(() => {
          if (this.index !== index) {
            this.index = index;
            const { coordinate } = this.state.markers[index];
            this.map.animateToRegion(
              {
                ...coordinate,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta,
              },
              350
            );
          }
        }, 10);
      });
    }


  getRegionFrom(lat, lon, distance) {
      distance = distance/2
      const circumference = 40075
      const oneDegreeOfLatitudeInMeters = 111.32 * 1000
      const angularDistance = distance/circumference

      const latitudeDelta = distance / oneDegreeOfLatitudeInMeters
      const longitudeDelta = Math.abs(Math.atan2(
              Math.sin(angularDistance)*Math.cos(lat),
              Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)))

      return {
          latitude: lat,
          longitude: lon,
          latitudeDelta,
          longitudeDelta,
      }
  }

  getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
      this.setState({
          errorMessage: 'Permission to access location was denied',
      });
      }
  
      let location = await Location.getCurrentPositionAsync({});
  
      let coords = this.getRegionFrom(location.coords.latitude,location.coords.longitude,500);
      console.log(coords);
      
      this.setState({isReady:true, region: coords, markers:[
        {
          coordinate: {
            latitude: location.coords.latitude+0.001,
            longitude: location.coords.longitude+0.001,
            },
            title: "Your first tradie",
            description: "This is the fourth best place in Auckland",
            image: Images[0],
        },
        {
          coordinate: {
            latitude: location.coords.latitude+0.02,
            longitude: location.coords.longitude+0.01,
            },
            title: "Your second tradie",
            description: "This is the fourth best place in Auckland",
            image: Images[1],
        },
        {
          coordinate: {
            latitude: location.coords.latitude+0.01,
            longitude: location.coords.longitude+0.02,
            },
            title: "Your third tradie",
            description: "This is the fourth best place in Auckland",
            image: Images[2],
        }
      ]});
      console.log(this.state.region);
  }
  
  render() {
    const { navigation } = this.props;
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Container>
      <Header>
          <Right>
  
              <Button transparent onPress={this.props.navigationBack}>
                <Text>
                 Skip
                 </Text>
              </Button>
          
          </Right>
        <Body>
          <Title>Create Job</Title>
        </Body>
        <Right />
      </Header>
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});
const mapStateToProps = (state, props) =>{
  return{
  };
}

const mapDispatchToProps = {
  navigationBack
};

export default connect(mapStateToProps, mapDispatchToProps)(JobFinderScreen);