import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = {
        name,
        displayName,
        email
      };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

  return <div className="formOuter">
    <div className="rFormInner">
      <div className="topForm">Register Form</div>
    <Form className="rMyForm" onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="Name">Name</Label>
          <Input
            id="firstName"
            className="qNewForm"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input
            id="displayName"
            className="qNewForm"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            className="qNewForm"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            className="qNewForm"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            className="qNewForm"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <button className="qNewButton">Register</button>
        </FormGroup>
      </fieldset>
    </Form>
    </div>
  </div>
}
