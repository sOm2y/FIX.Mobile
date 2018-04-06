import React from "react";
import {Platform} from 'react-native';
import { Button, Text, Form, Item, Icon } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderPassword } from "../../../components/inputs/renderPassword";
import { renderDatePicker } from "../../../components/inputs/renderDatePicker";
import { renderTextarea } from "../../../components/inputs/renderTextarea";
import { renderPicker } from "../../../components/inputs/renderPicker";
import { getAddress } from '../../../services/addressService';
import { getBusinessCategories } from '../../../services/businessService';


export class JobDetailForm extends React.Component{
    constructor() {
        super();
        this.state = {
            businessCategories: []
        };
      }

    componentWillMount(){
        getBusinessCategories().then(res => {
            this.setState({businessCategories:res});
        });
    }
    
    static navigationOptions = ({ navigation }) => ({
    });
    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage } = this.props;
        
        return (
            <Form>
                <Field
                    name="title"
                    type="text"
                    component={renderName}
                    label="Title"
                />

                <Field
                    name="description"
                    type="text"
                    component={renderTextarea}
                    label="Description"
                />
                
                <Field label="Business Categories" 
                name="businessCategoryId" 
                iosHeader="Select Business Category" 
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ flex:(Platform.OS === 'ios') ? undefined : 1 }}
                placeholder="Select Business Category"
                placeholderStyle={{ color: "#bfc6ea" }} mode="dropdown" component={renderPicker} >
                    {this.state.businessCategories && this.state.businessCategories[0] &&
                        this.state.businessCategories.map((value, key) => {
                        return <Item key={key} label={value.name} value={value.id} />
                        })
                     }
                </Field>
                

                <Field
                    name="jobDate"
                    type="text"
                    component={renderDatePicker}
                    label="Date"
                />

            
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit} 
                disabled={pristine || submitting}>
                    <Text>Next</Text>
                </Button>

            </Form>
        );
    }
}

export default reduxForm({
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(JobDetailForm);
