import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';
import { Button, Text, Icon, Footer, FooterTab } from 'native-base';


export default class FooterBottomTab extends React.Component {
    constructor(){
        super();
        this.state = {
            userType: ''
        };
    }
    static navigationOptions = ({ navigation }) => ({

    });

    async componentDidMount(){
        let userType = await AsyncStorage.getItem('userType');
        this.setState({userType: userType});
    }
  

  render(){
    const { navigation, navigationState } = this.props;

    return (
        <Footer>
            <FooterTab>
            { this.state.userType && this.state.userType === 'Tradie' &&   
                <Button
                vertical
                active={navigationState.index === 0}
                onPress={() => navigation.navigate('JobsOnMap')}
                style={{backgroundColor:'transparent'}}>
                    <Icon ios='ios-pin-outline' android='md-pin' />
                    <Text style={styles.tabTextTradie} > Map </Text>
                </Button>
            }
            <Button
                vertical
                active={navigationState.index === 1}
                onPress={() => navigation.navigate('Jobs')}
                style={{backgroundColor:'transparent'}}>
                <Icon ios='ios-home-outline' android='md-home' />
                <Text style={this.state.userType === 'Customer'? styles.tabTextCustomer: styles.tabTextTradie}> Jobs </Text>
            </Button> 
            <Button
                vertical
                active={navigationState.index === 2}
                onPress={() => navigation.navigate('Jobs')}
                style={{backgroundColor:'transparent'}}>
                <Icon ios='ios-notifications-outline' android='md-notifications' />
                <Text style={this.state.userType === 'Customer'? styles.tabTextCustomer: styles.tabTextTradie}> Notifications </Text>
            </Button> 

            <Button
                vertical
                active={navigationState.index === 3}
                onPress={() => navigation.navigate('Profile')}
                style={{backgroundColor:'transparent'}}>
                <Icon ios='ios-settings-outline' android='md-settings' />
                <Text style={this.state.userType === 'Customer'? styles.tabTextCustomer: styles.tabTextTradie} > Profile </Text>
            </Button>
            
            </FooterTab>
        </Footer>
    );
  }
}



const styles = StyleSheet.create({

    tabTextTradie: {
        fontSize: 9,
    },
    tabTextCustomer: {
        fontSize: 13,
    },
  });
  