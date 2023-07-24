import Login from "../auth/Login";
import Register from "../auth/Register";
import { Home } from "../home/Home";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Quizes } from "../quiz/Quizes";

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
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </main>
    );
  }