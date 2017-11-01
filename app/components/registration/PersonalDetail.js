import React from "react";
import { translate } from 'react-i18next';
import { Content, Item, Input, Icon, InputGroup, Text } from 'native-base';

@translate(['home', 'common'], { wait: true })

export class PersonalDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            isValid: null
        };
    }

  static navigationOptions = ({ screenProps }) => ({
    title: screenProps.t('home:title')
  });

  handleInputChange = (text) => {
      if(text === '12345')
        this.setState({ userName: text, isValid: true });
  };

  render(){
    const { t, i18n,  } = this.props;

    return (
        <Content>
        <Item success={this.state.isValid}>
            <Input 
            autoCapitalize="none"
            onChangeText={ (text) => this.handleInputChange(text) }
            onSubmitEditing={ (event) => {
                  this._root.Password.focus();
            }}
            />
             {this.state.isValid && (<Icon name='checkmark-circle' />)}
          
        </Item>
        
        <Item>  
            <Text>{this.state.userName}</Text>
        </Item>
        </Content>
    );
  }
}
