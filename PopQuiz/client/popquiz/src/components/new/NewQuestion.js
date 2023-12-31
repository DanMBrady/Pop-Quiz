import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllQuizQuestions } from "../../modules/quizManager"
import { addQuestion } from "../../modules/questionManager"
import "./New.css"
export const NewQuestion =({ userProfile })=>{
    const [quiz,SetQuiz]=useState()
    const {id} = useParams()
    const navigate = useNavigate()
    const [question,setQuestion]=useState({
        id: 1,
    question: "Question",
    answerOne: "Choice One",
    answerTwo: "Choice Two",
    answerThree: "Choice Three",
    answerFour: "Choice Four",
    correctAnswer: "Correct Answer",
    quizId: 1
    })

  const buttonEvent = (event) =>{
    event.preventDefault()

    const toSend ={
        myQuestion: question.question,
        answerOne: question.answerOne,
        answerTwo: question.answerTwo,
        answerThree: question.answerThree,
        answerFour: question.answerFour,
        correctAnswer: question.correctAnswer,
        quizId: id
    }
    addQuestion(toSend)
    
    .then(()=>{
        navigate(`/${id}/add`)
    })
  }
    

    useEffect(()=>{
        getAllQuizQuestions(id).then(SetQuiz)
    },[])

    if(!quiz){
        return null
    }
return <div className="formOuter">
    
    
    {
        userProfile?.id === quiz?.userCreatedId ? 
        <div className="qFormInner">
            <div className="topForm">Create New Question</div>
     <div>
    <form className="qMyForm">
            <fieldset>
                <div>
                <textarea
                required
                className="questionInput"
                placeholder="Question"
                onChange={
                    (evt) =>{
                        const copy = {...question}
                        copy.question = evt.target.value
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
                onChange={
                    (evt) =>{
                        const copy = {...question}
                        copy.answerFour = evt.target.value
                        setQuestion(copy)
                    }
                } />
               
                </div>
            </fieldset>
        <section className="qSelect">Select Correct Answer
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
        </form>

            </div>
            </div>

                    : <div><h3>You did not create this quiz</h3></div>
                        }
    </div>

   

}