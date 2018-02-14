import React from "react";
import { Modal, StyleSheet } from 'react-native';
import { Button, Text, Form, Spinner, List, ListItem, Content } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderPicker } from "../../../components/inputs/renderPicker";
import { renderTextarea } from "../../../components/inputs/renderTextarea";
import { getBusinesses } from '../../../services/businessService';
import BusinessDetailForm  from "./BusinessDetailForm";


export default class BusinessListForm extends React.Component{
    state = {
        modalVisible: false
    }
    
    static navigationOptions = ({ navigation }) => ({
    });

    componentDidMount() {
        getBusinesses()
        .then(res => {
            
        }).catch(err => {

        })
        
    }

    openModal() {
        this.setState({modalVisible:true});
    }
    
    closeModal() {
    this.setState({modalVisible:false});
    }
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage, pickerItems } = this.props;
        
        return (
            <Content>
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={this.openModal()} 
                disabled={pristine || submitting}>
                    <Text>Add Your Business</Text>
                </Button>

                <List>
        
                    <ListItem style={{ marginLeft: 0}}>
                    <Text>
                       
                    </Text>
                    </ListItem>
        
                </List>
                <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                onRequestClose={() => this.closeModal()}
                >

                <BusinessDetailForm onSubmit={(values, dispatch)=>this.onSubmit(values.address, dispatch)} />


                </Modal>
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit} 
                disabled={pristine || submitting}>
                    <Text>Finish</Text>
                </Button>
            </Content>
        );
    }
}

