import React from 'react';
import { Item, Input, Icon, Label } from 'native-base';

export const renderPhone = ({ input, label, type, meta: { touched, error, warning } }) => {
    var hasError= false;
    if(error !== undefined){
        hasError= true;
    }
    return ( 
        <Item floatingLabel style= {{ margin: 10, flexDirection: 'row-reverse' }} error= {hasError} success={!hasError&&touched&&input.value.length>0}>
            <Label>{label}</Label>
            <Input type={type} 
                autoCapitalize="none"
                keyboardType="numeric"
                autoCorrect={false} {...input}/>
            {!hasError&&touched&&input.value.length>0&& <Icon name='checkmark-circle' />}
            {hasError&& <Icon name='close-circle' />}
        </Item> );
};