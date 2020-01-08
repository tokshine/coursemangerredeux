 //note 'export default function' did not work for me courseReducer(state=[],action){
 
 function courseReducer(state=[],action){
    switch(action.type){
        //state.push(action.course)// dont do this cos you are mutating the array 
    case "CREATE_COURSE":
       return [...state,{...action.course}];
   default:
            return state;

    }
}

//this worked for me
export default courseReducer;