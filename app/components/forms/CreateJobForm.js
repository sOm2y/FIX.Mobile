import React from "react";
import { StyleSheet } from 'react-native';
import { translate } from 'react-i18next';
import { Container, Header, Left, Icon, Body, Right, Content, Button, Text, List, Spinner, Separator, ListItem } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validateHelper';
import { renderName } from '../../components/inputs/renderUsername';
import { renderPassword } from '../../components/inputs/renderPassword';
import ImageUpload from '../ImageUpload';


@translate(['home', 'common'], { wait: true })

export class CreateJobForm extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: screenProps.t('home:title')
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
                <Text>Create Job</Text>
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
                <ListItem style={{ marginLeft: 0}}>
                <Body>
                    <Text>Title</Text>
                    </Body>
                </ListItem>
                <ListItem style={{ marginLeft: 0}}>
                    <Body>
                    <Text>Category</Text>
                    </Body>
                </ListItem>
                <ListItem style={{ marginLeft: 0}}>
                <Body>
                    <Text>Lee Allen</Text>
                    </Body>
                </ListItem>
                <Separator bordered>
                    <Text>TITLE & CATEGORY</Text>
                </Separator>
                <ListItem style={{ marginLeft: 0}}>
                    <Body>
                        <Text>Your username : </Text>
                    </Body>
                </ListItem>
                <ListItem style={{ marginLeft: 0}}>
                    <Body>
                        <Text>Your email : </Text>
                    </Body>
                </ListItem>
                <ListItem style={{ marginLeft: 0}}>
                    <Body>
                        <Text>Your phone number : </Text>
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
  form: 'CreateJobForm', //                 <------ same form name
  validate,
})(CreateJobForm);
