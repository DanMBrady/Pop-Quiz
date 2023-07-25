import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllQuizQuestions } from "../../modules/quizManager"
import { Card } from "reactstrap"
export const QuizAdd =({ userProfile })=>{
    const [quiz,SetQuiz]=useState()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getAllQuizQuestions(id).then(SetQuiz)
    },[])

    if(!quiz){
        return null
    }
    return <div>
         {
             quiz.image === (null || "") ? <Card className="imageBannerCard"><img className="imageBanner" 
             src="https://c1.wallpaperflare.com/preview/544/373/135/sky-dark-blue-partly-cloudy-background.jpg"></img></Card>
             : <Card className="imageBannerCard"><img className="imageBanner" src ={quiz?.image}></img></Card>
        }
        
             {
                quiz?.questions.map(question =>{
                    return <div>
                        <Card><Link to={`/questionEdit/${question.id}`} className="quizLink">{question.myQuestion}-{question.answerOne}-{question.answerTwo}-{question.answerThree}-{question.answerFour}</Link></Card>
                        </div>
                })
               }
               {
                quiz.userCreatedId === userProfile?.id ? <button onClick={()=>navigate(`/${quiz.id}/newQuestion`)}>Add Question</button> : ""
               }
               
        
        
    </div>
}