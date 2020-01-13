 //note 'export default function' did not work for me courseReducer(state=[],action){
 import * as types  from  "../actions/actionTypes";
 function courseReducer(state=[],action){
    switch(action.type){
        //state.push(action.course)// dont do this cos you are mutating the array 
    case types.CREATE_COURSE:
       return [...state,{...action.course}]; 
    case types.LOAD_COURSES_SUCCESS:
        return action.courses;   
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );  
   default:
            return state;

    }
}

//this worked for me
export default courseReducer;