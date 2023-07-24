import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllQuizes } from "../../modules/quizManager";
import { Card } from "reactstrap";
import "./Quiz.css"

export const Quizes =() =>{
    const [quizes, setQuizes] = useState([])
    const navigate = useNavigate();
    const getQuizes = ()=>{
        getAllQuizes().then(quizes=> setQuizes(quizes))
    }

    useEffect(()=>{
        getQuizes();
    }, []);

    return <div>
        All Quizes

        <div className="quizList">
        {
            quizes.map(quiz=>{
                return <div> 
                    <Link to={`/quiz/${quiz.id}`} className="quizLink">
                    <Card className ="myQuiz">
                        <div className="quizDiv">
                        {
                            quiz.image === null ? 
                            <section><img className="quizImage" src ="https://c1.wallpaperflare.com/preview/544/373/135/sky-dark-blue-partly-cloudy-background.jpg"></img></section>
                            : <section><img className="quizImage" src={quiz.image}></img></section>
                        }
                    </div>
                    <section>{quiz.name}</section>
                    </Card>
                    </Link>
                    </div>
            })
        }
        </div>
    </div>
}