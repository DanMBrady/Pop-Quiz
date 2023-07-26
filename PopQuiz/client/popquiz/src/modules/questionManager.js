const baseUrl=`/api/question`

export const addQuestion = (question) =>{
return fetch(`${baseUrl}/add`,{
    method:"POST",
    headers: {
        "Content-Type": "application/json"
    },
    body:JSON.stringify(question)
});
};

export const getQuestionById = (id)=>{
    return fetch(`${baseUrl}/${id}`)
    .then((res)=>res.json())
}

export const updateQuestion = (question) =>{

    return fetch(`${baseUrl}/update/${question.id}`,{
        method:"PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(question)
    });
};

export const deleteQuestion =(id)=>{
    return fetch(`${baseUrl}/${id}`,{
        method:"DELETE",
    });
};