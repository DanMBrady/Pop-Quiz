import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addQuiz, getAllDifficulties } from "../../modules/quizManager";
import "./New.css"
export const NewQuiz =({ userProfile })=>{
    const navigate = useNavigate();
const [difficulty,setDiff]=useState([])
const [quiz, setQuiz] = useState({
    name:"new",
    description:"description",
    image:"",
    difficultyId: 1,

})

useEffect(()=>{
    getAllDifficulties().then(dif=>setDiff(dif))
},[])

const handleSave =(event) =>{
    event.preventDefault()

    let myQuiz={
        name:quiz.name,
        description:quiz.description,
        image:quiz.image,
        userCreatedId:userProfile.id,
        difficultyId :quiz.difficultyId
    }

    if(quiz.name === 'new' || quiz.description === 'description'){
        const myDiv = document.getElementById("error-div")
        myDiv.innerHTML="You must have both a name and description"
    }
    else{
        addQuiz(myQuiz)
        .then(response=>response.json())
        .then((newQuiz)=>{
        navigate(`/${newQuiz.id}/add`)
        })
    

    }
}
    return <div className="formOuter">
        <div className="formInner">
            <div className="topForm">
           Create New Quiz
            </div>
            <div className="myForm">
<form>
    <fieldset>
        <div>
            <input
            required
            type="text"
            className="newForm"
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
        <div>
            <select onChange={
                (event)=>{
                    const copy ={...quiz}
                    copy.difficultyId = parseInt(event.target.value)
                    setQuiz(copy)
                }
            }>
                {
                    difficulty.map(diff=>{
                        return <option className="diffOption" key={diff.id} value={diff.id}>{diff.name}</option>
                    })
                }
            </select>
        </div>
    </fieldset>
    <button className="newButton" onClick={(clickEvent)=>handleSave(clickEvent)}>Submit</button>
</form>

<div id="error-div"></div>
</div>
    </div>
    </div>
}