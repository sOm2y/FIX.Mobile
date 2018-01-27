import React from 'react';
import { List } from 'native-base';

export const renderPicker = ({ input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
    
    <List
    selectedValue={ value }
    onValueChange={ value => onChange(value) }
    { ...inputProps }
    { ...pickerProps }>
    { children }
  </List>
);