/**ADD_token adiciona um token, payload é uma informação do tipo string 
 * OU (|) um ID
*/
export type Action = { type: 'ADD_TOKEN' | 'ADD_ID'; payload: string}


export const addToken = (token: string): Action => ({
    type: "ADD_TOKEN",
    payload: token
})

export const addId = (id: string): Action => ({
    type:'ADD_ID',
    payload: id
})