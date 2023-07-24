import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllQuizQuestions } from "../../modules/quizManager"
import "./PlayQuiz.css"
import { Card } from "reactstrap"


export const PlayQuiz = () =>{
    const [quiz,SetQuiz]=useState()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getAllQuizQuestions(id).then(SetQuiz)
    },[])

    if(!quiz){
        return null
    }

    let questionNumber = 0

    let quizTotal=0;
    let quizScore=0;
    const check = (question, answer, id,idTwo,idThree,idFour) => {
        if (question.correctAnswer === answer) {
          const button = document.getElementById(id);
          const buttonTwo=document.getElementById(idTwo)
          const buttonThree=document.getElementById(idThree)
          const buttonFour=document.getElementById(idFour)
            button.style.backgroundColor = "green";
            buttonTwo.disabled=true
            buttonThree.disabled=true
            buttonFour.disabled=true
            quizScore++
        } else {
        const button = document.getElementById(id);
        const buttonTwo=document.getElementById(idTwo)
        const buttonThree=document.getElementById(idThree)
        const buttonFour=document.getElementById(idFour)
        button.style.backgroundColor = "red";
        buttonTwo.disabled=true
        buttonThree.disabled=true
        buttonFour.disabled=true
        }
      };

    return <div>
        
            <Card className="imageBannerCard"><img className="imageBanner" src ={quiz?.image}></img></Card>
        
        Play {quiz?.name}
    
        {
            quiz?.questions?.map(question=>{
                const classOne = `${question.id}-${question.answerOne}`
                const classTwo = `${question.id}-${question.answerTwo}`
                const classThree = `${question.id}-${question.answerThree}`
                const classFour = `${question.id}-${question.answerFour}`
                quizTotal++;
                questionNumber ++
                return <div key={question.id}>
                    <section>Question {questionNumber}: {question.myQuestion}</section>
                    <div className="questionDiv">
                    <section><button id={classOne} className="quizButton" onClick={()=>check(question,question.answerOne,classOne,classTwo,classThree,classFour)}>{question.answerOne}</button></section>
                    <section><button id={classTwo} className="quizButton" onClick={()=>check(question,question.answerTwo,classTwo,classOne,classThree,classFour)}>{question.answerTwo}</button></section>
                    <section><button id={classThree} className="quizButton" onClick={()=>check(question,question.answerThree,classThree,classOne,classTwo,classFour)}>{question.answerThree}</button></section>
                    <section><button id={classFour} className="quizButton" onClick={()=>check(question,question.answerFour,classFour,classOne,classTwo,classThree)}>{question.answerFour}</button></section>
                    </div>
                    </div>
            })
        }
    </div>
}