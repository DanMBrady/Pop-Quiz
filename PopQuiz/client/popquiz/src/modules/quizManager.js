const baseUrl = `/api/quiz`;

export const getAllQuizes = ()=>{
    return fetch(baseUrl)
    .then((res)=>res.json())
}