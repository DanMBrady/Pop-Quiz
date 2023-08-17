import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteQuestion, getQuestionById, updateQuestion } from "../../modules/questionManager"
import { deleteQuiz, getAllQuizQuestions, updateQuiz } from "../../modules/quizManager"

export const QuestionEdit =({ userProfile })=>{
const [quiz,setQuiz]=useState()
const [question, setQuestion] = useState()
const {id} = useParams()
const navigate = useNavigate()

useEffect(()=>{
getQuestionById(id).then(setQuestion)
},[])

useEffect(()=>{
    getAllQuizQuestions(id).then(setQuiz)
},[])

if(!question){
    return null
}
   
if(!quiz){
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
   return <div className="formOuter">
     { userProfile?.id === quiz.userCreatedId? 

    <div className="qFormInner">
        <div className="topForm">Edit Question</div>
<div>
    <form className="qMyForm">
            <fieldset>
                <div>
                <textarea
                required
                className="questionInput"
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
                className="qNewForm"
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
                className="qNewForm"
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
                className="qNewForm"
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
                className="qNewForm"
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
            <section className="qSelect">
        Select Correct Answer
            <select 
            className="qMySelect"
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
            </section>
            <button className="qNewButton" onClick={(clickEvent) => buttonEvent(clickEvent)}>Save</button>
            <button className="qNewButton" onClick={(clickEvent) => deleteButton(clickEvent)}>Delete</button>
        </form>
            </div>

  </div>
  : <h3>You did not create this quiz</h3>}
    </div>
}