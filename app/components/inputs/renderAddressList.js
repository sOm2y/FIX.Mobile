import React from 'react';
import { ListItem, Body, Text, Right, Radio } from 'native-base';

export const renderAddressList = ({ input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
    
    <ListItem icon>
    {this.renderIcon(icon)}
    <Body>
      <Text>
        {label}
      </Text>
    </Body>
    <Right>
      <Radio
        {...input}
        selectedValue={ value }
        onValueChange={ value => onChange(value) }
      />
    </Right>
  </ListItem>
);