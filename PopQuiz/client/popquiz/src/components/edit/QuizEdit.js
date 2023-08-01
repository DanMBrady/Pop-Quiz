import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteQuiz, getAllQuizQuestions, updateQuiz } from "../../modules/quizManager"
import { getAllDifficulties } from "../../modules/quizManager"
export const QuizEdit =()=>{
    const [quiz,setQuiz]=useState()
    const [difficulty,setDiff]=useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
    getAllDifficulties().then(dif=>setDiff(dif))
},[])

    useEffect(()=>{
        getAllQuizQuestions(id).then(setQuiz)
    },[])

    if(!quiz){
        return null
    }


    const deleteButton = (evt)=>{
        evt.preventDefault()
       deleteQuiz(quiz.id)
        .then(()=>{
            navigate(`/quizes`)
        })
    }

    const buttonEvent =(event) =>{
        event.preventDefault()

        const myQuiz ={
            id:quiz.id,
            userCreatedId:quiz.userCreatedId,
            name:quiz.name,
            image:quiz.image,
            description:quiz.description,
            difficultyId:quiz.difficultyId

        }

        updateQuiz(myQuiz)
        .then(()=>{
            navigate(`/${quiz.id}/add`)
        })
    }
    return<div className="formOuter">
        <div className="formInner">

             <div className="topForm">Edit Quiz</div>
        
            <div className="myForm">
        <form className="myForm">
    <fieldset>
        <div>
            <input
            required
            type="text"
            className="newForm"
            value={quiz.name}
            placeholder="Quiz Name"
            onChange={
                (evt) =>{
                    const copy ={...quiz}
                    copy.name = evt.target.value
                    setQuiz(copy)
                }
            } />
        </div>
    </fieldset>
    <fieldset>
        <div>
            <input
            required
            type="text"
            className="newForm"
            value={quiz.description}
            placeholder="Quiz Description"
            onChange={
                (evt) =>{
                    const copy ={...quiz}
                    copy.description = evt.target.value
                    setQuiz(copy)
                }
            } />
        </div>
    </fieldset>
    <fieldset>
        <div>
            <input
            required
            type="text"
            className="newForm"
            value={quiz.image}
            placeholder="Quiz Image"
            onChange={
                (evt) =>{
                    const copy ={...quiz}
                    copy.image = evt.target.value
                    setQuiz(copy)
                }
            } />
        </div>
    </fieldset>
    <fieldset>
        <section>Select Difficulty</section>
        <div className="diffDiv">
            <select 
            value={quiz.difficultyId}
            onChange={
                (event)=>{
                    const copy ={...quiz}
                    copy.difficultyId = parseInt(event.target.value)
                    setQuiz(copy)
                }
            }>
                {
                    difficulty.map(diff=>{
                        return <option key={diff.id} value={diff.id}>{diff.name}</option>
                    })
                }
            </select>
        </div>
    </fieldset>
<button className="newButton" onClick={(clickEvent) => buttonEvent(clickEvent)}>Save</button>
<button className="newButton" onClick={(clickEvent) => deleteButton(clickEvent)}>Delete</button>
</form>
</div>
</div>
    </div>
}