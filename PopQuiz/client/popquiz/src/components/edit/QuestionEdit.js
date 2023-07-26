import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteQuestion, getQuestionById, updateQuestion } from "../../modules/questionManager"


export const QuestionEdit =({ userProfile })=>{
const [question, setQuestion] = useState()
const {id} = useParams()
const navigate = useNavigate()

useEffect(()=>{
getQuestionById(id).then(setQuestion)
},[])

if(!question){
    return null
}
   
const deleteButton = (evt)=>{
    evt.preventDefault()
    deleteQuestion(question.id)
    .then(()=>{
        navigate(`/${question.quizId}/add`)
    })
}

const buttonEvent = (event) =>{
    event.preventDefault()

    updateQuestion(question)
    .then(()=>{
        navigate(`/${question.quizId}/add`)
    })
}
   return <div>Edit Question

<div>
    <form>
            <fieldset>
                <div>
                <input
                required
                placeholder="Question"
                value={question.myQuestion}
                onChange={
                    (evt) =>{
                        const copy = {...question}
                        copy.myQuestion = evt.target.value
                        setQuestion(copy)
                    }
                } />
                </div>
            </fieldset>
            <fieldset>
                <div>
                <input
                required
                placeholder="Choice"
                value={question.answerOne}
                onChange={
                    (evt) =>{
                        const copy = {...question}
                        copy.answerOne = evt.target.value
                        setQuestion(copy)
                    }
                } />
                
                </div>
            </fieldset>
            <fieldset>
                <div>
                <input
                required
                placeholder="Choice"
                value={question.answerTwo}
                onChange={
                    (evt) =>{
                        const copy = {...question}
                        copy.answerTwo = evt.target.value
                        setQuestion(copy)
                    }
                } />
               
                </div>
            </fieldset>
            <fieldset>
                <div>
                <input
                required
                placeholder="Choice"
                value={question.answerThree}
                onChange={
                    (evt) =>{
                        const copy = {...question}
                        copy.answerThree = evt.target.value
                        setQuestion(copy)
                    }
                } />
                
                </div>
            </fieldset>
            <fieldset>
                <div>
                <input
                required
                placeholder="Choice"
                value={question.answerFour}
                onChange={
                    (evt) =>{
                        const copy = {...question}
                        copy.answerFour = evt.target.value
                        setQuestion(copy)
                    }
                } />
               
                </div>
            </fieldset>
        </form>
        <h2>Select Correct Answer</h2>
            <select 
            onChange ={
                (event) =>{
                    const copy ={...question}
                    copy.correctAnswer = event.target.value
                    setQuestion(copy)
                }
            }
            >
                <option value={question.answerOne}>Select Answer</option>
                <option value={question.answerOne}>{question.answerOne}</option>
                <option value={question.answerTwo}>{question.answerTwo}</option>
                <option value={question.answerThree}>{question.answerThree}</option>
                <option value={question.answerFour}>{question.answerFour}</option>
            </select>
            
            <button onClick={(clickEvent) => buttonEvent(clickEvent)}>Save</button>
            <button onClick={(clickEvent) => deleteButton(clickEvent)}>Delete</button>
            </div>

  
    </div>
}