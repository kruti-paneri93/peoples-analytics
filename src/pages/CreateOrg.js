import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import config from "../config/config";

// const API_URL = config.defaults.apibaseurl;

function CreateOrg() {
  const initialValues = {
    companyname: "",
    address: "",
    name: "",
    username: "",
    password: "",
    phone: "",
  };
  const [orgname, setOrgName] = useState({
    companyname: "",
  });
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [companyRepeat, setcompanyRepeat] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setOrgName({ ...orgname, [name]: value });
  };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);
  
  let headerConfig = {
    method: "POST",
    // baseURL: API_URL,
    headers: {
      "content-type": "application/json",
    },

    body: JSON.stringify(formValues),
    redirect: "follow",
  };
  const checkComapny = (e) => {
    // setFormErrors(validate(formValues));
    fetch("http://3.74.53.224:3002/check-company", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orgname),
      redirect: "follow",
    })
      .then((response) => {
        response.text()
        return response
      })
      .then((result) => {
        console.log(result);
        if(result.status !== 200){
          document.getElementById("myDiv").style.borderColor = "red";
          setcompanyRepeat(true);
          console.log(companyRepeat);
          // if(companyRepeat !== true){
          //   companyRepeat.companyname = "Company Already Exists"
          // }
        }
        })
      .catch((error) => console.log("error", error));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    fetch("http://3.74.53.224:3002/create-organization", headerConfig)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const numRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (!values.companyname) {
      errors.companyname = "Company Name is required";
    }

    if (!values.address) {
      errors.address = "Address is required";
    }

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.phone) {
      errors.phone = "Contact Number is required";
    } else if (!numRegex.test(values.phone)) {
      errors.phone = "Enter valid Number";
    }

    if (!values.username) {
      errors.username = "Email is required!";
    } else if (!regex.test(values.username)) {
      errors.username = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container vh-100">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="form-style">
          {Object.keys(formErrors).length === 0 && isSubmit ? (
            <div className="ui message success">Signed in successfully!!</div>
          ) : (
            <noscript>{JSON.stringify(formValues, undefined, 2)}</noscript>
          )}
          <h1 className="mb-3 form-heading">Register Your Organization</h1>
          <label className="mb-3">
            Already Registered?{" "}
            <a href="#" className="form-link">
              Login to your organization account
            </a>
          </label>
          <Form.Group className="mb-3">
            <Form.Control
            id="myDiv"
              type="text"
              name="companyname"
              placeholder="Company Name"
              value={formValues.companyname}
              onChange={handleChange}
              onBlur={checkComapny}
            />
            <p className="error-msg">{formErrors.companyname}{companyRepeat.companyname}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="textarea"
              name="address"
              placeholder="Address"
              value={formValues.address}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.address}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Name"
              value={formValues.name}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.name}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.username}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.password}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="phone"
              placeholder="Contact Number"
              value={formValues.phone}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.phone}</p>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateOrg;
