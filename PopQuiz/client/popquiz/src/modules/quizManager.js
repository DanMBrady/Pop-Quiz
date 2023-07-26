const baseUrl = `/api/quiz`;

export const getAllQuizes = ()=>{
    return fetch(baseUrl)
    .then((res)=>res.json())
}

export const getAllUserQuizzes = (id)=>{
    return fetch(`${baseUrl}/GetByUser/${id}`)
    .then((res)=>res.json())
}

export const getAllQuizQuestions =(id)=>{
return fetch(`${baseUrl}/GetWithQuestions${id}`)
.then((res)=>res.json())
}

export const addQuiz = (quiz) =>{
    return fetch(`${baseUrl}/add`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(quiz)
    });
};

export const updateQuiz = (quiz) =>{
    return fetch(`${baseUrl}/update/${quiz.id}`,{
        method:"PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(quiz)
    });
};

export const deleteQuiz =(id)=>{
    return fetch(`${baseUrl}/${id}`,{
        method:"DELETE",
    });
};