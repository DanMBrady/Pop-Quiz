const baseUrl = `/api/quiz`;

export const getAllQuizes = ()=>{
    return fetch(baseUrl)
    .then((res)=>res.json())
}

export const getAllQuizQuestions =(id)=>{
return fetch(`${baseUrl}/GetWithQuestions${id}`)
.then((res)=>res.json())
}