import React from 'react';
import { Item, Input, Text, Label } from 'native-base';

export const renderPhone = ({ input, label, type, meta: { touched, error, warning } }) => {
    var hasError= false;
    if(error !== undefined){
        hasError= true;
    }
    return ( 
        <Item floatingLabel style= {{ margin: 10 }} error= {hasError}>
            <Label>{label}</Label>
            <Input {...input}/>
            {hasError ? <Text>{error}</Text> : <Text />}
        </Item> );
};