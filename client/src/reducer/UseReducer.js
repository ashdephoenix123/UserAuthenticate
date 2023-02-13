
export const initialState = false;

export const reducer = (state, action)=>{
    if(action.type === 'USER'){
        return action.payload
    }
    return state;
}

//type is the name of the action
// payload is the value 

