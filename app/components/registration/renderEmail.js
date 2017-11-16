import React from 'react';
import { Item, Input, Text } from 'native-base';

export const renderEmail= ({ input, label, type, meta: { touched, error, warning } }) => {
    var hasError= false;
    if(error !== undefined){
        hasError= true;
    }
    return ( 
        <Item style= {{ margin: 10 }} error= {hasError}>
            <Text>Email</Text>
            <Input {...input}/>
            {hasError ? <Text>{error}</Text> : <Text />}
        </Item> );
};