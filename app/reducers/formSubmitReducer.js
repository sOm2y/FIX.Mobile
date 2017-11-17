let count= 0;
export default (state=count, action) => {
  switch (action.type) {
    case "SubmitPersonalDetailForm": count++;
      break;

  }
  return count;
}