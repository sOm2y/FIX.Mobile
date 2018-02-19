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
import {showBusinessModal, hideBusinessModal} from '../../../actions/actionCreator';
import BusinessDetailForm  from "./BusinessDetailForm";


export class BusinessListForm extends React.Component{
    constructor(){
        super();
        this.state = {
            business:{}
        };
    }

    static navigationOptions = ({ navigation }) => ({
    });

    componentDidMount() {
        getBusinesses()
        .then(res => {
            // this.set
            console.log(res);
        })
        .catch(err => {

        })
        
    }

    onSubmit = (address, dispatch) => {
        console.log(address);
        postBusiness(address)
        .then(res => {
            this.setState({business: res});
            toastShow("Add business Successfully", "success", 3000);   
        })
        .catch(err => {
            toastShow("Add business unsuccessfully", "success", 3000);   
        })
    }

    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage, pickerItems, formName, isBusinessModalShowed } = this.props;
        
        return (
            <Content>
                {this.state.business && this.state.business.length >1 &&
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
                    <Text>Tax Number: {this.state.business.taxNumber}</Text>
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
                onPress={this.props.showBusinessModal} >
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
                            <BusinessDetailForm form={formName} onSubmit={(values, dispatch)=>this.onSubmit(values, dispatch)} />
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
    hideBusinessModal
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessListForm);