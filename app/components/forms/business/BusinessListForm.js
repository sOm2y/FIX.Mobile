import React from "react";
import { Modal, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text, Form, Spinner, List, ListItem, Content, Container, Header, Left, Icon, Body, Title, Right } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderPicker } from "../../../components/inputs/renderPicker";
import { renderTextarea } from "../../../components/inputs/renderTextarea";
import { getBusinesses } from '../../../services/businessService';
import {showBusinessModal, hideBusinessModal} from '../../../actions/actionCreator';
import BusinessDetailForm  from "./BusinessDetailForm";


export class BusinessListForm extends React.Component{

    static navigationOptions = ({ navigation }) => ({
    });

    componentDidMount() {
        getBusinesses()
        .then(res => {
            
        }).catch(err => {

        })
        
    }

    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage, pickerItems, formName, isBusinessModalShowed } = this.props;
        
        return (
            <Content>
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={this.props.showBusinessModal} 
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
                            <BusinessDetailForm form={formName} onSubmit={(values, dispatch)=>this.onSubmit(values.address, dispatch)} />
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