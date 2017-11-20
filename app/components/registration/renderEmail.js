import React from 'react';
import { Item, Input, Icon } from 'native-base';

export const renderEmail= ({ input, label, type, meta: { touched, error, warning } }) => {
    var hasError= false;
    if(error !== undefined){
        hasError= true;
    }
    return ( 
        <Item style= {{ margin: 10 }} error= {hasError} success={!hasError&&touched}>
            <Input type={type} placeholder={label} {...input}/>
            {!hasError&&touched&& <Icon name='checkmark-circle' />}
            {hasError&& <Icon name='close-circle' />}
        </Item> );
};