import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Item } from 'native-base';
import { connect } from 'react-redux'
import DatePicker from 'react-native-datepicker'

export const renderDatePicker = ({ input:{value, onChange}, label, type, meta: { touched, error, warning, dispatch } }) => {
    var hasError= false;
    if(value == null ){
        value =(new Date()).getFullYear();
    }
    if(error !== undefined){
        hasError= true;
    }

    return (
      <Item style={{paddingTop:15,paddingBottom:15}}>
      <DatePicker
        style={{width: 200}}
        date={value}
        mode="datetime"
        placeholder="select date"
        format="DD-MM-YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date,time) => { 
            value=time;
            onChange(value);console.log(date+' '+time); 
        }}
      />
      </Item>
    );
  
};

function mapStateToProps (state, props) {
    return {
      input : state.input
    }
  }
  
  function mapDispatchToProps (dispatch, props) {
    return bindActionCreators({}, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(renderDatePicker)