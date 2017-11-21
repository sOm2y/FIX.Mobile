import React from 'react';
import { Item, Input, Icon } from 'native-base';

export const renderPhone = ({ input, label, type, meta: { touched, error, warning } }) => {
    var hasError= false;
    if(error !== undefined){
        hasError= true;
    }
    return ( 
        <Item style= {{ margin: 10 }} error= {hasError} success={!hasError&&touched&&input.value.length>0}>
            <Input type={type} 
                placeholder={label}  
                autoCapitalize="none"
                keyboardType="numeric"
                autoCorrect={false} {...input}/>
            {!hasError&&touched&&input.value.length>0&& <Icon name='checkmark-circle' />}
            {hasError&& <Icon name='close-circle' />}
        </Item> );
};