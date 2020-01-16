import * as types from "../actions/actionTypes";
import initialState from "./initialState";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS"; //see  if the string end in _success
}

 function apiCallStatusReducer(state = initialState.apiCallsInProgress,action) {   
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if ( action.type === types.API_CALL_ERROR ||   actionTypeEndsInSuccess(action.type)  ) 
  {
    return state - 1; //1-1 
  }

  return state;
}

export default  apiCallStatusReducer;