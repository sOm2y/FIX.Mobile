import React from 'react';
import { ListItem, Body, Text, Right, Radio, List } from 'native-base';

export const renderAddressList = ({ input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
    
  this.state.addressList && this.state.addressList[0] &&
        <List>
            {this.state.addressList.map((value, key)=>{
                return ( <ListItem style={styles.listItem} key={key} button onPress={this.handleSelectAddress.bind(this,key)}> 
              
                    <Body>
                        <Text>{value.description}</Text>
                    </Body>
                    <Right>
                        <Radio key={key} selected={this.state.selectedAddressIndex===key} />
                    </Right>

                </ListItem>)
            })}
            
        </List>
            
);
const styles = StyleSheet.create({
  listItem:{
    marginLeft: 0, 
    paddingLeft: 17
  }
});