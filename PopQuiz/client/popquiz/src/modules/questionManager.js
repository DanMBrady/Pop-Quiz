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