import React from 'react';
import { Item, Input, Text, Label } from 'native-base';

export const renderPassword = ({ input, label, type, meta: { touched, error, warning } }) => {
    var hasError= false;
    if(error !== undefined){
        hasError= true;
    }
    return ( 
        <Item floatingLabel style= {{ margin: 10 }} error= {hasError} last>
            <Label>{label}</Label>
            <Input type={type} {...input}/>
            {hasError ? <Text>{error}</Text> : <Text />}
        </Item> );
};