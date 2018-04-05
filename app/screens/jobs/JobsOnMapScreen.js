import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { PROVIDER_GOOGLE } from 'expo';
import { NavigationActions } from 'react-navigation';
import { reset } from 'redux-form';
import Callouts from './Callouts';

export class JobsOnMap extends React.Component {
 
  constructor() {
    super();
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = navigation;

    return <Callouts provider={PROVIDER_GOOGLE} />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    userType: state.ProfileReducer.userType
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(JobsOnMap);
