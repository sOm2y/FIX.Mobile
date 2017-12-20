let count= 0;
const navigationReducer = (state=count, action) => {
  switch (action.type) {
    case "Increment": count++;
      break;
    case "Decrement": count--;
      break;
  }
  return count;
}
export default navigationReducer;