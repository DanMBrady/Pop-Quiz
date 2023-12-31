import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getAllScores, getScoreById } from "../../modules/scoreManager"
import"./QuizResults.css"
import { Card } from "reactstrap"

export const QuizResults =()=>{
    const {id}=useParams()
   const {scoreId} = useParams()
    const [scores,setScores]= useState()
    const [s,setS]=useState()

    useEffect(()=>{
        if(id){
            getAllScores(id).then(setScores);
        }
    },[])
   
    useEffect(()=>{
        if(scoreId){

            getScoreById(scoreId).then(setS)
        }
    },[])
    if(!s){
        return null
    }
    return <div className="resultsDiv">
       
        <div className="myScoreDiv">
      <section key={s.id} className="myScoreOuter">You Scored {s?.myScore} Points</section>
                    
                
               
             
        </div>
      <div className="leaderboardDiv">
        <section className="myScore">Leaderboard</section>
        {
            scores?.map(s=>{
                {
                    
                    if(s.id === parseInt(scoreId)){
                        return <section className="myScore" key={s.id}><section className="leader">User:</section><section className="leader">{s?.user?.displayName}</section><section className="leader">Score:</section><section className="leader">{s.myScore} Points</section></section>
                    }
                }
                return <section className="resultSection"key={s.id}><section className="leader">User:</section><section className="leader">{s?.user?.displayName}</section><section className="leader">Score:</section><section className="leader">{s.myScore} Points</section></section>
            })
        }
        </div>
    </div>
}