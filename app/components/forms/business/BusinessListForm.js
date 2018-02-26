import React from "react";
import { Modal, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text, Card, CardItem, Spinner, List, ListItem, Content, Container, Header, Left, Icon, Body, Title, Right } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderPicker } from "../../../components/inputs/renderPicker";
import { renderTextarea } from "../../../components/inputs/renderTextarea";
import { getBusinesses, postBusiness } from '../../../services/businessService';
import { toastShow } from '../../../services/toastService';
import {showBusinessModal, hideBusinessModal, registerSuccess} from '../../../actions/actionCreator';
import BusinessDetailForm  from "./BusinessDetailForm";


export class BusinessListForm extends React.Component{
    constructor(props){
        super(props);
        console.log("businesslist props"+ props);
        this.state = {
            business:{}
        };
    }

    static navigationOptions = ({ navigation }) => ({
    });

    componentDidMount() {
        getBusinesses()
        .then(res => {
            this.setState({business:res});
            console.log(res);
        })
        .catch(err => {

        })
        
    }

    onSubmit = (business, dispatch) => {
        console.log(business);
        let registerBusiness = {
            businessName: business.businessName,
            businessLegalName: business.businessLegalName,
            taxNumber: business.taxNumber,
            businessAddress: business.businessAddress.description,
            longitude: business.businessAddress.longitude,
            latitude: business.businessAddress.latitude,
            businessPhone: business.businessPhone,
            businessEmail: business.businessEmail
        } 
        console.log(registerBusiness);
        postBusiness(registerBusiness)
        .then(res => {
            this.setState({business: res});
            this.props.hideBusinessModal;
            toastShow("Add business Successfully", "success", 3000);   
        })
        .catch(err => {
            this.props.hideBusinessModal;
            toastShow("Add business unsuccessfully", "success", 3000);   
        })
    }

    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage, pickerItems, formName, isBusinessModalShowed, user } = this.props;
        
        return (
            <Content>
                <Title>Hi {this.props.user.firstName}</Title>
                { this.state.business && (JSON.stringify( this.state.business) !== '{}')&&
                <Card>
                    <CardItem header>
                        <Text>{this.state.business.businessName}</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>
                                {this.state.business.businessAddress}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem footer>
                    <Text>{this.state.business.taxNumber}</Text>
                    </CardItem>
                </Card>
                }
               
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={this.props.showBusinessModal} 
                disabled={pristine || submitting}>
                    <Text>Add Your Business</Text>
                </Button>

                <Button block transparent
                style={{ marginTop: 10 }}
                onPress={this.props.registerSuccess} >
                    <Text>Skip</Text>
                </Button>

             
                <Modal
                visible={isBusinessModalShowed}
                animationType={'fade'}
                onRequestClose={this.props.hideBusinessModal}
                >
                    <Container style={styles.modalContainer}>
                        <Header>
                 
                        <Body>
                            <Title>{formName}</Title>
                        </Body>
                      
                        </Header>
                        <Content padder keyboardShouldPersistTaps={'always'}>
                            <BusinessDetailForm {...this.props} form={formName} onSubmit={(values, dispatch)=>this.onSubmit(values, dispatch)} />
                            <Button block primary
                            style={{ marginTop: 10 }}
                            onPress={this.props.hideBusinessModal}>
                                <Text>Cancel</Text>
                            </Button>
                        </Content>
                    </Container>
                </Modal>
            </Content>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: '#e9e9ef',
    }
  });

const mapStateToProps = (state, props) =>{
    return{
        isBusinessModalShowed : state.BusinessReducer.isBusinessModalShowed,
        formName: props.formLabel
    };
}
  
const mapDispatchToProps = {
    showBusinessModal,
    hideBusinessModal,
    registerSuccess
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessListForm);