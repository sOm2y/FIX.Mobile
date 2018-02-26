import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Constants, Location, Permissions, AppLoading } from 'expo';
import MapView, { Marker, Callout, ProviderPropType } from 'react-native-maps';
import CustomCallout from './CustomCallout';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class Callouts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      region: {
       
      },
      markers: [
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE - SPACE,
          },
        },
      ],
    };
  }

  async componentWillMount() {

    if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
    } else {
        await this.getLocationAsync();
        
    }
    
  }

  show() {
    this.marker1.showCallout();
  }

  hide() {
    this.marker1.hideCallout();
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
    this.setState({region:coords,isReady:true, markers: [
      {
        coordinate: {
          latitude: location.coords.latitude + SPACE,
          longitude: location.coords.longitude + SPACE,
        },
      },
      {
        coordinate: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      },
      {
        coordinate: {
          latitude: location.coords.latitude + SPACE,
          longitude: location.coords.longitude - SPACE,
        },
      },
    ]});
    console.log(this.state.region);
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


  render() {
    const { region, markers } = this.state;
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={region}
        >
          <Marker
            ref={ref => { this.marker1 = ref; }}
            coordinate={markers[0].coordinate}
            title="This is a native view"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" // eslint-disable-line max-len
          />
          <Marker
            coordinate={markers[1].coordinate}
          >
            <Callout style={styles.plainView}>

              <View>
                <Text>This is a your current position</Text>
              </View>
            </Callout>
          </Marker>
          <Marker
            coordinate={markers[2].coordinate}
            calloutOffset={{ x: -8, y: 28 }}
            calloutAnchor={{ x: 0.5, y: 0.4 }}
          >
            <Callout tooltip style={styles.customView}>
              <CustomCallout>
                <Text>This is a custom callout bubble view</Text>
              </CustomCallout>
            </Callout>
          </Marker>
        </MapView>
        <View style={styles.buttonContainer}>
          <View style={styles.bubble}>
            <Text>Tap on markers to see different callouts</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.show()} style={[styles.bubble, styles.button]}>
            <Text>Show</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.hide()} style={[styles.bubble, styles.button]}>
            <Text>Hide</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Callouts.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  customView: {
    width: 140,
    height: 100,
  },
  plainView: {
    width: 60,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
