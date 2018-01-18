const validate = values => {
  const error= {};
  error.email= '';
  error.name= '';
  error.title='';
  var ema = values.email;
  var nm = values.username;
  var title = values.title;
  if(values.email === undefined){
    ema = '';
  }
  if(values.username === undefined){
    nm = '';
  }
  if(values.title === undefined){
    title = '';
  }
  if(ema.length < 8 && ema !== ''){
    error.email= 'too short';
  }
  if(!ema.includes('@') && ema !== ''){
    error.email= '@ not included';
  }

  if(nm.length > 30){
    error.username= 'max 30 characters';
  }

  if(title.length > 30){
    error.title = 'max 30 characters';
  }
return error;
};
  
export default validate;
  