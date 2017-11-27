let page= 0;
export default function(state=page, action){
  switch (action.type) {
    case "NEXT_PAGE": page ++;
      break;
    case "PREVIOUS_PAGE": page --;
      break;
  }
  return page;
}