const baseUrl = `/api/score`

export const getAllScores = (quizId) =>{
    return fetch(`${baseUrl}/getbyquiz/${quizId}`)
    .then((res)=>res.json())
}

export const addScore = (score)=>{
    return fetch(`${baseUrl}/add`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(score)
    });
};