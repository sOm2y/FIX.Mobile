import React from "react";
import { Button, Text, Form, Spinner, List, ListItem } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderPicker } from "../../../components/inputs/renderPicker";
import { renderTextarea } from "../../../components/inputs/renderTextarea";
import { getBusinesses } from '../../../services/businessService';
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
        const { handleSubmit, navigation, pristine, submitting, previousPage, pickerItems } = this.props;
        
        return (
            <Form>
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit} 
                disabled={pristine || submitting}>
                    <Text>Add Your Business</Text>
                </Button>

                <List>
        
                    <ListItem style={{ marginLeft: 0}}>
                    <Text>
                       
                    </Text>
                    </ListItem>
        
                </List>

                <BusinessDetailForm onSubmit={(values, dispatch)=>this.onSubmit(values.address, dispatch)} />
                {this.state.isLoadingAddress && <Spinner color='white' />}
                
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit} 
                disabled={pristine || submitting}>
                    <Text>Finish</Text>
                </Button>
            </Form>
        );
    }
}

export default reduxForm({
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(BusinessListForm);
