import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
// import config from "../config/config";

// const API_URL = config.defaults.apibaseurl;

function CreateNewOrg() {

  const [CompanyName, setCompanyName] = useState('');
  const [Address, setAddress] = useState('');
  const [Name, setName] = useState('');
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Phone, setPhone] = useState('');

 

  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

 

  let axiosConfig = {
    // baseURL: API_URL,
    headers: {
      "content-type": "application/json",
    },
  };

  const RegisterOrg = () => {
    console.log(Phone)
    axios
      .post(
        "http://3.74.53.224:3002/create-organization",{
            CompanyName: CompanyName,
            Address: Address,
            Name: Name,
            Username: Username,
            Password: Password,
            Phone: Phone,
        },
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        console.log(result.data);
        localStorage.setItem("token", result.data.token);
        // localStorage.getItem('token', result.data.token);
        // alert('success')
      })
      .catch((error) => {
        alert("service error");
        console.log(error);
      });
  };



    

  return (
    <div className="container vh-100">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="form-style">
          <h1 className="mb-3 form-heading">Register Your Organization</h1>
          <label className="mb-3">
            Already Registered?{" "}
            <a href="#" className="form-link">
              Login to your organization account
            </a>
          </label>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Company Name"
              value={CompanyName}
              onChange={handleCompanyName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="textarea"
              placeholder="Address"
              value={Address}
              onChange={handleAddress}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              value={Name}
              onChange={handleName}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              value={Username}
              onChange={handleUsername}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={Password}
              onChange={handlePassword}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Phone"
              value={Phone}
              onChange={handlePhone}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={RegisterOrg}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewOrg;
