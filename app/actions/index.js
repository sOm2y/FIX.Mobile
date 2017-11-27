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

export const nextPage = () => {
  return{
    type: "NEXT_PAGE"
  };
}

export const previousPage = () => {
  return{
    type: "PREVIOUS_PAGE"
  };
}