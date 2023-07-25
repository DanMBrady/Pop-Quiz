import { useParams } from "react-router-dom"

export const QuizResults =()=>{
    const {total}=useParams()
    const {score}=useParams()
    const myScore = Math.round((score/total)*100)
    return <article>
        <h1> Quiz Results</h1>
        <section>You Got a {myScore}%</section>
    </article>
}