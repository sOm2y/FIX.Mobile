const validate = values => {
  const error= {};
  error.email= '';
  error.name= '';
  var ema = values.email;
  var nm = values.username;
  if(values.email === undefined){
    ema = '';
  }
  if(values.username === undefined){
    nm = '';
  }
  if(ema.length < 8 && ema !== ''){
    error.email= 'too short';
  }
  if(!ema.includes('@') && ema !== ''){
    error.email= '@ not included';
  }

  if(nm.length > 8){
    error.username= 'max 8 characters';
  }
return error;
};
  
export default validate;
  