import React from 'react';
import { Picker } from 'native-base';

export const renderPicker= ({ input, label, children, ...custom }) => {
    
    return ( 
        <Picker placeholder="Select One" {...input} selectedValue={input.value} onValueChange={(value, index) => input.onChange(value)} {...custom}> 
            { children }
        </Picker> );
};