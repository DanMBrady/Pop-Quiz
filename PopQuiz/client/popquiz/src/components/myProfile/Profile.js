import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { getAllUserQuizzes, getSavedQuizzes } from "../../modules/quizManager";
import { Card } from "reactstrap";
export const Profile =({ userProfile })=>{
    const [quizes, setQuizes] = useState([])
    const [saved,setSaved]=useState([])
    const navigate = useNavigate();
    
  

    useEffect(()=>{
        if(userProfile){
            getAllUserQuizzes(userProfile?.id).then(setQuizes);
        }
    },[userProfile]);

    useEffect(()=>{
        if(userProfile){
            getSavedQuizzes(userProfile?.id).then(setSaved);
        }
    },[userProfile]);


    

    return <div>
      
    <h3 className="upperQuiz">My Quizzes </h3>
       <div className="quizList">
        {
            quizes?.map(quiz=>{
                return <div key={quiz.id}> 
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
        <h3 className="upperQuiz">Saved Quizzes</h3>
        <div className="quizList">
        {
            saved?.map(quiz=>{
                return <div key={quiz.id}> 
                    <Link to={`/quiz/${quiz.quiz.id}`} className="quizLink">
                    <Card className ="myQuiz">
                        <div className="quizDiv">
                        {
                            quiz.quiz.image === (null || "") ? 
                            <section><img className="quizImage" src ="https://c1.wallpaperflare.com/preview/544/373/135/sky-dark-blue-partly-cloudy-background.jpg"></img></section>
                            : <section><img className="quizImage" src={quiz.quiz.image}></img></section>
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