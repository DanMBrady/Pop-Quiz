import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllScores } from "../../modules/scoreManager"
import"./QuizResults.css"

export const QuizResults =()=>{
    const {id}=useParams()
   const {scoreId} = useParams()
    const [scores,setScores]= useState()

    useEffect(()=>{
        if(id){
            getAllScores(id).then(setScores);
        }
    },[])
   
    return <article>
        <h1> Quiz Results</h1>
        
        <h3>Top 10 Scores</h3>
        {
            scores?.map(s=>{
                {
                    
                    if(s.id === parseInt(scoreId)){
                        return <section className="myScore" key={s.id}>User: {s?.user?.displayName}  Score: {s.myScore}</section>
                    }
                }
                return <section key={s.id}>User: {s?.user?.displayName}  Score: {s.myScore}</section>
            })
        }
    </article>
}