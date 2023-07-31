import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { checkSavedQuiz, deleteSavedQuiz, getAllQuizQuestions, savedThisQuiz } from "../../modules/quizManager"
import "./PlayQuiz.css"
import { Card } from "reactstrap"
import { addScore } from "../../modules/scoreManager"


export const PlayQuiz = ({ userProfile }) =>{
    const [quiz,SetQuiz]=useState()
    const [checkQuiz,setCheck]=useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    const getCheck =()=>{
        if(userProfile){

            checkSavedQuiz(id,userProfile.id).then(quiz=>setCheck(quiz))
        }
    }
    useEffect(()=>{
        getCheck();
    },[userProfile]);
    
    useEffect(()=>{
        getAllQuizQuestions(id).then(SetQuiz)
    },[])
    
    if(!quiz){
        return null
    }
    
    
    let savedQuizId = 0

    for(const q of checkQuiz){
        savedQuizId = q.id
    }

    const saveButton =(event)=>{
        event.preventDefault()

        let save = {
            userId:userProfile.id,
            quizId:quiz.id
        }

        savedThisQuiz(save)
        .then(()=>{
            getCheck()
        })

    }

    const deleteButton = (evt)=>{
        evt.preventDefault()
        deleteSavedQuiz(savedQuizId)
        .then(()=>{
            getCheck()
        })

    }
    
    
    
    let questionNumber = 0
    let quizTotal=0;
    let quizScore=0;
    const send =(event)=>{
        event.preventDefault()

        let score={
            myScore:(Math.round((quizScore/quizTotal)*100)),
            quizId:parseInt(id),
            userId:userProfile.id
        }

        if(quizTotal === 0){
            const myDiv = document.getElementById("error-div")
            myDiv.innerHTML="This quiz does not have any questions yet"
        }
        else{
            addScore(score)
            .then(response=>response.json())
            .then((newScore)=>{
                navigate(`/${id}/quiz/${newScore.id}`)
            })
        }

    }
    const check = (question, answer, id,idTwo,idThree,idFour) => {
        if (question.correctAnswer === answer) {
          const button = document.getElementById(id);
          const buttonTwo=document.getElementById(idTwo)
          const buttonThree=document.getElementById(idThree)
          const buttonFour=document.getElementById(idFour)
            button.style.backgroundColor = "rgb(35, 151, 35)";
            button.disabled=true
            buttonTwo.disabled=true
            buttonThree.disabled=true
            buttonFour.disabled=true
            quizScore++
        } else {
        const button = document.getElementById(id);
        const buttonTwo=document.getElementById(idTwo)
        const buttonThree=document.getElementById(idThree)
        const buttonFour=document.getElementById(idFour)
        button.style.backgroundColor = "rgb(247, 27, 27)";
        button.disabled=true
        buttonTwo.disabled=true
        buttonThree.disabled=true
        buttonFour.disabled=true
        }
      };

    return <div>
        {
             quiz.image === (null || "") ? <Card className="imageBannerCard"><img className="imageBanner" 
             src="https://c1.wallpaperflare.com/preview/544/373/135/sky-dark-blue-partly-cloudy-background.jpg"></img></Card>
             : <Card className="imageBannerCard"><img className="imageBanner" src ={quiz?.image}></img></Card>
        }

        <section className="upperQuiz">
           <h3>{quiz?.name}</h3>
        <section>{quiz?.description}</section>
        <section>Difficulty: {quiz?.difficulty?.name}</section>
       {
        userProfile?.id === quiz?.userCreatedId ? 
        <Link to ={`/${quiz?.id}/add`}>Edit</Link>
        : 
        
        checkQuiz.length === 0 ? <button onClick={(evt)=>saveButton(evt)}>Add</button> :
        <button onClick={(evt)=>deleteButton(evt)}>Remove</button>
       }

        </section>
    
        {
            quiz?.questions?.map(question=>{
                const classOne = `${question.id}-${question.answerOne}`
                const classTwo = `${question.id}-${question.answerTwo}`
                const classThree = `${question.id}-${question.answerThree}`
                const classFour = `${question.id}-${question.answerFour}`
                quizTotal++;
                questionNumber ++
                return <div key={question.id}>
                    <section className="quizQuestion">Question {questionNumber}: {question.myQuestion}</section>
                    <div className="questionDiv">
                    <section><button id={classOne} className="quizButton" onClick={()=>check(question,question.answerOne,classOne,classTwo,classThree,classFour)}>{question.answerOne}</button></section>
                    <section><button id={classTwo} className="quizButton" onClick={()=>check(question,question.answerTwo,classTwo,classOne,classThree,classFour)}>{question.answerTwo}</button></section>
                    <section><button id={classThree} className="quizButton" onClick={()=>check(question,question.answerThree,classThree,classOne,classTwo,classFour)}>{question.answerThree}</button></section>
                    <section><button id={classFour} className="quizButton" onClick={()=>check(question,question.answerFour,classFour,classOne,classTwo,classThree)}>{question.answerFour}</button></section>
                    </div>
                    </div>
            })
        }

<section><button onClick={(clickEvent)=> send(clickEvent)} className="quizButtonTwo">Continue</button></section>

        <div id="error-div"></div>
    </div>
}