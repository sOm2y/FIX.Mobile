import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import { Constants, Location, Permissions, AppLoading } from 'expo';
import MapView from 'react-native-maps';
import { navigationBack, jobs } from '../../actions/actionCreator';
import { Container,Header, Body, Title, Content, List, ListItem, Button, Text, Left, Right, Icon } from "native-base";
import {inviteTradies} from '../../services/jobService';
import { toastShow } from '../../services/toastService';

const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
];

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 6;
const CARD_WIDTH = width / 2;
    
class TradieFinderScreen extends Component {
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
              ownerId: 0
          }
          ],
          region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
          },
          isReady: false,
          invitedTradieIds: [],
          selectedBusiness: []
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
          await this.getLocationAsync(this.props.searchResult.businessList);
          
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

  getLocationAsync = async (businessList) => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
      this.setState({
          errorMessage: 'Permission to access location was denied',
      });
      }
  
      let location = await Location.getCurrentPositionAsync({});
  
      let coords = this.getRegionFrom(location.coords.latitude,location.coords.longitude,500);
      console.log(coords);

      let availbleBusiness = {
        isReady:true,
        region: coords,
        markers : businessList.map( business => (
          {
            coordinate: {
              latitude: business.latitude,
              longitude: business.longitude
            },
            title: business.businessLegalName,
            description: business.businessAddress,
            image: Images[0],
            ownerId: business.ownerId
          }
        ))
      };
      
      this.setState(availbleBusiness);
  }

  remove = (array, element) => {
    return array.filter(e => e !== element);
  }

  selectTradies = (business, key) => {
    let currentBusinessList = this.state.selectedBusiness;
    let isDuplicate = false;
    if(currentBusinessList.length >0){
      currentBusinessList.map((value,index)=>{
        if(value.index === key){
        
          currentBusinessList = [...currentBusinessList.slice(0, index), ...currentBusinessList.slice(index+1)];
          isDuplicate = true;
        }
      });
      if(!isDuplicate){
        currentBusinessList.push({index:key,value:business});
      }
    }else{
      currentBusinessList.push({index:key,value:business});
    }
    this.setState({selectedBusiness: currentBusinessList});
    console.log(this.state.selectedBusiness);


  }
  
  submitInvitedTradie = () => {
    let tempTradies = [];
    this.state.selectedBusiness.map( (tradie, key) => {
      tempTradies.push(tradie.value.ownerId);
    });
    let invitedTradies ={
      jobId: this.props.searchResult.jobId,
      invitedTradieIds: tempTradies
    }
    inviteTradies(invitedTradies).then( res => {
      toastShow("Invite selected tradies  successfully", "success", 3000); 
      this.props.jobs();
    }).catch( err => {
      toastShow("Failed to invite tradies Please try again.", "danger", 3000);   
    });
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
      <Left />
        <Body>
          <Title>Select Tradie for your job</Title>
        </Body>
        <Right>
  
        <Button transparent onPress={this.props.jobs}>
          <Text>
           Skip
           </Text>
        </Button>
    
    </Right>
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
            <TouchableOpacity onPress={() => this.selectTradies( marker, index)} style={styles.card} key={index}>
              {/* <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              /> */}
              {
                this.state.selectedBusiness.length>0 && this.state.selectedBusiness.map((value,key)=>{
                  if(value.index === index ){
                     return <Icon style={styles.iconStyle} key={key} name='checkmark-circle' />
                  }
                })
              }
              <View style={styles.textContent}>
                <Text numberOfLines={2} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={3} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
        <Button block light onPress={() => this.submitInvitedTradie() }>
            <Text>Invite Tradies</Text>
          </Button>
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
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 13,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    // position: 'absolute',
    // right: 0,
    color: '#2F823C'
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
    searchResult : state.JobReducer.searchResult
  };
}

const mapDispatchToProps = {
  navigationBack,
  jobs
};

export default connect(mapStateToProps, mapDispatchToProps)(TradieFinderScreen);