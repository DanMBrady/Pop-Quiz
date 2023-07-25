import Login from "../auth/Login";
import Register from "../auth/Register";
import { Home } from "../home/Home";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Quizes } from "../quiz/Quizes";
import { PlayQuiz } from "../quiz/PlayQuiz";
import { QuizResults } from "../quiz/QuizResults";
import { NewQuiz } from "../new/NewQuiz";
import { QuizAdd } from "../new/QuizAdd";
import { NewQuestion } from "../new/NewQuestion";

export default function ApplicationViews({ isLoggedIn, userProfile }) {
    return (
      <main>
        <Routes>
          <Route path="/">
            <Route
              index
              element={isLoggedIn ? <Home userProfile={userProfile}/> : <Navigate to="/login" />}
            />
            <Route path="login" element={<Login />} />
            <Route path="quizes" element={<Quizes />} />
            <Route path="quiz/:id" element={<PlayQuiz />} />
            <Route path=":id/newQuestion" element={<NewQuestion userProfile={userProfile}/>} />
            <Route path=":id/add" element={<QuizAdd userProfile={userProfile}/>} />
            <Route path=":id/quiz/:total/:score" element={ <QuizResults/>} />
            <Route path="newQuiz" element={<NewQuiz userProfile={userProfile}/>} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </main>
    );
  }