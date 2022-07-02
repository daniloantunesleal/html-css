import { Action } from "./Action";

export interface UserState {
    tokens: string,
    id: string
}


const initialState = {
    tokens:"",
    id:""
}

export const userReducer = (state: UserState = initialState, action: Action) => {
    switch(action.type){
        case "ADD_TOKEN":{
            return { tokens: action.payload, id: state.id }
        }

        case "ADD_ID":{ //action.payload é a informação carregada pela ação
            return {id: action.payload, tokens: state.tokens}
        }

        default:
            return state
    }
}