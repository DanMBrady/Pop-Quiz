import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addQuiz } from "../../modules/quizManager";
export const NewQuiz =({ userProfile })=>{
    const navigate = useNavigate();
const [quiz, setQuiz] = useState({
    name:"new",
    description:"description",
    image:"",

})

const handleSave =(event) =>{
    event.preventDefault()

    let myQuiz={
        name:quiz.name,
        description:quiz.description,
        image:quiz.image,
        userCreatedId:userProfile.id
    }

    if(quiz.name === 'new' || quiz.description === 'description'){
        const myDiv = document.getElementById("error-div")
        myDiv.innerHTML="You must have both a name and description"
    }
    else{
        addQuiz(myQuiz)
        .then(response=>response.json())
        .then((newQuiz)=>{
        navigate(`/${newQuiz.id}/add`)
        })
    

    }
}
    return <div>
        <h1>New Quiz</h1>
<form>
    <fieldset>
        <div>
            <input
            required
            type="text"
            className="newName"
            placeholder="Quiz Name"
            onChange={
                (evt) =>{
                    const copy ={...quiz}
                    copy.name = evt.target.value
                    setQuiz(copy)
                }
            } />
        </div>
    </fieldset>
    <fieldset>
        <div>
            <input
            required
            type="text"
            className="newName"
            placeholder="Quiz Description"
            onChange={
                (evt) =>{
                    const copy ={...quiz}
                    copy.description = evt.target.value
                    setQuiz(copy)
                }
            } />
        </div>
    </fieldset>
    <fieldset>
        <div>
            <input
            required
            type="text"
            className="newName"
            placeholder="Quiz Image"
            onChange={
                (evt) =>{
                    const copy ={...quiz}
                    copy.image = evt.target.value
                    setQuiz(copy)
                }
            } />
        </div>
    </fieldset>
    <button onClick={(clickEvent)=>handleSave(clickEvent)}>Submit</button>
</form>

<div id="error-div"></div>
    </div>
}