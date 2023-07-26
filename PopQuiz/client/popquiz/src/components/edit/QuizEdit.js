import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteQuiz, getAllQuizQuestions, updateQuiz } from "../../modules/quizManager"

export const QuizEdit =()=>{
    const [quiz,setQuiz]=useState()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getAllQuizQuestions(id).then(setQuiz)
    },[])

    if(!quiz){
        return null
    }


    const deleteButton = (evt)=>{
        evt.preventDefault()
       deleteQuiz(quiz.id)
        .then(()=>{
            navigate(`/quizes`)
        })
    }

    const buttonEvent =(event) =>{
        event.preventDefault()

        const myQuiz ={
            id:quiz.id,
            userCreatedId:quiz.userCreatedId,
            name:quiz.name,
            image:quiz.image,
            description:quiz.description

        }

        updateQuiz(myQuiz)
        .then(()=>{
            navigate(`/${quiz.id}/add`)
        })
    }
    return<div>
        Edit Quiz

        <form>
    <fieldset>
        <div>
            <input
            required
            type="text"
            className="newName"
            value={quiz.name}
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
            value={quiz.description}
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
            value={quiz.image}
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
    
</form>
<button onClick={(clickEvent) => buttonEvent(clickEvent)}>Save</button>
<button onClick={(clickEvent) => deleteButton(clickEvent)}>Delete</button>
    </div>
}