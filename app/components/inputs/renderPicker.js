import React from 'react';
import { Picker } from 'native-base';

export const renderPicker = ({ input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
    
    <Picker
    selectedValue={ value }
    onValueChange={ value => onChange(value.name) }
    { ...inputProps }
    { ...pickerProps }>
    { children }
  </Picker>
);