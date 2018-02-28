import React from "react";
import { View } from "react-native";
import { connect } from 'react-redux';
import { reset } from 'redux-form';

import { toastShow } from '../../services/toastService';
import { getMessages } from '../../services/notificationService';


export class CustomerScreen extends React.Component {
    constructor() {
      super();
      this.state = {
        messages:[]
       }
    }
  
    static navigationOptions = ({ navigation }) => ({

    });

    componentDidMount() {
        getAccessToken().then(value => {
          if(value !== null){
            axios.defaults.headers.common['Authorization'] = 'Bearer '+ value;
            console.log(axios.defaults.headers.common['Authorization']);
            getMessages().then((messageList) => {
              this.setState({messages: messageList});
            }).catch(err => {
              console.log(err);
              //toastShow(err.data.message, "danger", 3000);   
              toastShow("Failed to retrieve messages, please touch to refresh.", "danger", 3000);   
              //this.props.logout();
            });
          }
        }).catch((err)=>{
          console.log(err);
          toastShow('Token expired, please login again', "danger", 3000);   
        });    
    }

    render(){
      const { navigation } = this.props;
      const { navigate } = navigation;
  
      return (
        <Container>
            <Header>
            <Body>
                <Title>Notifications</Title>
            </Body>
            </Header>

            <Content padder>

                <Button style={styles.button}
                        block 
                        primary
                        onPress={this.props.deleteAllReadMessages}
                >
                </Button>

                {
                    this.state.messages && this.state.messages.length > 0 && this.state.messages.reverse().map((message, key) => {
                        return (
                            <Card style={styles.mb} key={key}>
                                <CardItem bordered>
                                    <Left>
                                        <Thumbnail source={logo} />
                                        <Body>
                                            <Text>{message.title}</Text>
                                            <Text note>{message.content}</Text>
                                            
                                            <Button style={styles.button}>
                                                <Icon name="ios-someIcon" />
                                                <Text>Accept/Decline/Reply/Delete</Text>
                                            </Button>
                                        </Body>
                                    </Left>
                                </CardItem>
                            </Card>
                        )
                    })
                }    
            </Content>
        </Container>
      );
    }
  }

  const mapStateToProps = (state, props) => {
    return { };
  }
  const mapDispatchToProps = {
    
  };
  
  
  export default CustomerMessenger = connect(mapStateToProps, mapDispatchToProps)(CustomerScreen);