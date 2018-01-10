import React from "react";
import { StyleSheet } from 'react-native';
import { Container, Header, Left, Icon, Body, Right, Content, Button, Text, List, Spinner, Separator, ListItem, Title, Item, Label, Input } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../inputs/renderUsername';
import { renderPassword } from '../../inputs/renderPassword';
import { renderPicker } from '../../inputs/renderPicker';
import ImageUpload from '../../ImageUpload';


class JobDetailForm extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
    });

    render(){
        const { handleSubmit, navigation, submitting } = this.props;
        
        return (
            <Container>
            <Header>
                <Left>
        
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                
                </Left>
              <Body>
                <Title>Create Job</Title>
              </Body>
              <Right />
            </Header>
            <Content>
                <Separator bordered>
                    <Text>UPLOAD IMAGES</Text>
                </Separator>
                <ImageUpload />
                <List>
               
                <Separator bordered>
                    <Text>TITLE & CATEGORY</Text>
                </Separator>
           


                 
                 
                    <Field
                    name="title"
                    type="text"
                    component={renderName}
                    label="Title"
                />
                    
       
     
                <ListItem style={{ marginLeft: 0}}>
                    <Body>
  
                    <Field name="vehicleType" mode="dropdown" style={{left: 10}} component={renderPicker} >
                        <Item label="Car" value="Car" />
                        <Item label="Bus" value="Bus" />
                        <Item label="Bajaji" value="Bajaji" />
                        <Item label="Motorbike" value="Motobike" />
                        <Item label="Camel" value="Camel" />
                    </Field>
                    </Body>
                </ListItem>
                <ListItem style={{ marginLeft: 0}}>
                <Body>
                    <Text>SubCategory</Text>
                </Body>
                </ListItem>
                <Separator bordered>
                    <Text>JOB DETAIL</Text>
                </Separator>
                <ListItem style={{ marginLeft: 0}}>
                    <Body>
                        <Text>Description</Text>
                    </Body>
                </ListItem>
                <ListItem style={{ marginLeft: 0}}>
                    <Body>
                        <Text>Start Date</Text>
                    </Body>
                </ListItem>
                <ListItem style={{ marginLeft: 0}}>
                    <Body>
                        <Text>Budget </Text>
                    </Body>
                </ListItem>
                </List>
                <Button block primary 
                style={{ margin: 10 }}
                onPress={handleSubmit}
                disabled={submitting}>
                    {submitting ? <Spinner color='white' />: <Text>Continue</Text>}
                </Button>
                <Button block bordered 
                style={{ margin: 10 }}
                onPress={handleSubmit}
                disabled={submitting}>
                    {submitting ? <Spinner color='white' />: <Text>Save & Exit</Text>}
                </Button>
                <Button block transparent dark
                style={{ margin: 10 }}
                onPress={handleSubmit}
                disabled={submitting}>
                    {submitting ? <Spinner color='white' />: <Text>Reset</Text>}
                </Button>

            </Content>
            </Container>
        );
    }
}

export default reduxForm({
  form: 'JobDetailForm', //                 <------ same form name
  validate,
})(JobDetailForm);
