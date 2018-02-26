import React from 'react';
import { Picker, Item } from 'native-base';

export const renderPicker = ({ input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
  <Item>
    <Picker
    selectedValue={ value }
    onValueChange={ value => onChange(value) }
    { ...inputProps }
    { ...pickerProps }>
    { children }
  </Picker>
  </Item>
);