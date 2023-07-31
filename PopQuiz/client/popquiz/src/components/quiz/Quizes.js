import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllQuizes, getSearchedQuizzes } from "../../modules/quizManager";
import { Card } from "reactstrap";
import "./Quiz.css"

export const Quizes =() =>{
    const [quizes, setQuizes] = useState([])
    const [search, setSearch]=useState("")
    const navigate = useNavigate();
    const getQuizes = ()=>{
        getAllQuizes().then(quizes=> setQuizes(quizes))
    }

    const getQuizzesSearched = ()=>{
        getSearchedQuizzes(search).then(quizzes=>setQuizes(quizzes))
    };

    useEffect(()=>{
        getQuizes();
    }, []);

    return <div>
        <h3 className="upperQuiz">Quizzes</h3>
        <div className="upperQuiz">
        <input placeholder="Search Quizzes" type="text" id="search-id"
        value={search} onChange={(q)=> (setSearch(q.target.value))}></input>
        <button onClick={getQuizzesSearched}>Searched Quizzes</button>
        <button onClick={getQuizes}>All Quizzes</button>
        </div>
        <div className="quizList">
        {
            quizes.map(quiz=>{
                return <div key ={quiz.id}> 
                    <Link to={`/quiz/${quiz.id}`} className="quizLink">
                    <Card className ="myQuiz">
                        <div className="quizDiv">
                        {
                            quiz.image === (null || "") ? 
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