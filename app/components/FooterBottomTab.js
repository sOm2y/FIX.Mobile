import React from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StepIndicator from 'react-native-step-indicator';
import PropTypes from 'prop-types';
import { Button, Text, Icon, Footer, FooterTab } from 'native-base';


export class FooterBottomTab extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            isFirstTimeload: true
        };
       
    }
    static navigationOptions = ({ navigation }) => ({

    });

    async componentWillMount(){
    }

    componentDidMount(){

        // if(this.props.navigationState.index !== 0 && this.state.isFirstTimeload ){
        //     this.props.navigationState.index = 0;
        //     this.setState({isFirstTimeload:false});
        // }
    }
  

  render(){
    const { navigation, navigationState, userType } = this.props;
    
    return (
        <Footer>
            <FooterTab>
        
            <Button
                vertical
                active={navigationState.index === 0}
                onPress={() => navigation.navigate('Jobs')}
            >
                <Icon ios='ios-home-outline' android='md-home' />
                <Text style={userType === 'Customer'? styles.tabTextCustomer: styles.tabTextTradie}> Jobs </Text>
            </Button> 
            { !!userType && userType === 'Tradie' &&   
                <Button
                vertical
                active={navigationState.index === 1}
                onPress={() => navigation.navigate('JobsOnMap')}
                >
                    <Icon ios='ios-pin-outline' android='md-pin' />
                    <Text style={styles.tabTextTradie}> Map </Text>
                </Button>
            }
            <Button
                vertical
                active={navigationState.index === 2}
                onPress={() => navigation.navigate('Notifications')}
                >
                <Icon ios='ios-notifications-outline' android='md-notifications' />
                <Text style={userType === 'Customer'? styles.tabTextCustomer: styles.tabTextTradie}> Alerts </Text>
            </Button> 

            <Button
                vertical
                active={navigationState.index === 3}
                onPress={() => navigation.navigate('Profile')}
               >
                <Icon ios='ios-settings-outline' android='md-settings' />
                <Text style={userType === 'Customer'? styles.tabTextCustomer: styles.tabTextTradie} > Profile </Text>
            </Button>
            
            </FooterTab>
        </Footer>
    );
  }
}



const styles = StyleSheet.create({

    tabTextTradie: {
        //fontSize: 13,
    },
    tabTextCustomer: {
        //fontSize: 13,
    },
  });
  
const mapStateToProps = (state, props) => {
    return {
      userType: state.ProfileReducer.userType
      // form: props.wizardLabel
    };
};
  
const mapDispatchToProps = {
};
  
export default connect(mapStateToProps, mapDispatchToProps)(FooterBottomTab);