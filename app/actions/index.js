export const increment = () => {
    return{
      type: "Increment"
    };
  }
  
export const decrement = () => {
  return{
    type: "Decrement"
  };
}

export const submitPersonalDetailForm = (result) => {
  return{
    type: "SubmitPersonalDetailForm",
    payload: result
  }
}