import React from "react";
import { StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reset } from 'redux-form';
import PropTypes from 'prop-types';
import { Container,Header, Body, Title, Content, Button, Text, Left, Icon, Right} from "native-base";
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import CredentialForm from '../../components/forms/SignUp/CredentialForm';
import DetailForm from '../../components/forms/SignUp/DetailForm';
import AddrerssForm from '../../components/forms/SignUp/AddrerssForm';
import ConfirmationForm from '../../components/forms/SignUp/ConfirmationForm';
import { nextPage, previousPage } from '../../actions/index';


@translate(['home', 'common'], { wait: true })

class Customer extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    return postUserAccount(values)
    .then(res => {
      navigation.navigate("Home");
      dispatch(reset('PersonalDetailForm'));
      toastShow("SignIn Successfully", "success", 3000); 
    }).catch( err => {
      console.log(err);
      toastShow("SignIn Unsuccessfully", "danger", 3000);   
    });
}
  render(){
    const { t, i18n, navigation, page } = this.props;
    const { navigate } = navigation;

    return (
      <Container>
        <Header>
            <Left>
            {page === 0 &&
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
            }
            </Left>
          <Body>
            <Title>Personal Detail</Title>
          </Body>
          <Right />
        </Header>
        <Content padder keyboardShouldPersistTaps={'always'}>
        {page === 0 &&<CredentialForm onSubmit={this.props.nextPage} />}
        {page === 1 &&<DetailForm previousPage={this.props.previousPage} onSubmit={this.props.nextPage} />}
        {page === 2 &&<AddrerssForm previousPage={this.props.previousPage} onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />}
        {/* {page === 3 &&<ConfirmationForm previousPage={this.props.previousPage}  onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />} */}
        </Content>
      </Container>
    );
  }
}

Customer.propTypes = {
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired
};

//TODO: Bug from nativebase
const styles = StyleSheet.create({
  listItem:{
    marginLeft: 0, 
    paddingLeft: 17
  }
 
});

function mapStateToProps(state){
  return{
    page : state.page
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ previousPage: previousPage, nextPage: nextPage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer);