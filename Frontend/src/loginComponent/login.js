import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import './login.css';
import Button from "react-bootstrap/Button";
import clgPhoto from '../assests/RMKEC.jpg';
import logo from '../assests/logo.png';

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  function validateForm() {
    return name.length > 0 && password.length > 0;
  }
  function handleSubmit(event) { 
    if(name!=="admin" && password!=="selva"){
      alert("Please! Enter valid credentails");
    }
    event.preventDefault();
  }

  return (
    <div className="main">
      <div className="Logo">
        <img src={clgPhoto} alt="Logo" />;
      </div>
    <div className="Login">
          <div className="innerlogo">
            <img src={logo} alt="logo" />
          </div>
          <div className="box">
      <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        <div className='button'>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
      </div>  
        </Form>
      </div>
    </div>
</div>
  );

}