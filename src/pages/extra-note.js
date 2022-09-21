


import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import config from "../config/config";

const API_URL = config.defaults.apibaseurl;

function CreateOrg() {
  const initialValues = {
    CompanyName: "",
    Address: "",
    Name: "",
    Username: "",
    Password: "",
    Phone: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    fetch("/create-user", {
      method: "POST",
      baseURL: API_URL,
      headers: {
        "content-type": "application/json",
      },
      data: formValues,
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        return res.json();
      })
      .then((formValues) => console.log(formValues))
      .catch((error) => console.log("ERROR"));
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const numRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (!values.CompanyName) {
      errors.CompanyName = "Company Name is required";
    }

    if (!values.Address) {
      errors.Address = "Address is required";
    }

    if (!values.Name) {
      errors.Name = "Name is required";
    }

    if (!values.Phone) {
      errors.Phone = "Contact Number is required";
    } else if (!numRegex.test(values.Phone)) {
      errors.Phone = "Enter valid Number";
    }

    if (!values.Username) {
      errors.Username = "Email is required!";
    } else if (!regex.test(values.Username)) {
      errors.Username = "This is not a valid email format!";
    }
    if (!values.Password) {
      errors.Password = "Password is required";
    } else if (values.Password.length < 4) {
      errors.Password = "Password must be more than 4 characters";
    } else if (values.Password.length > 10) {
      errors.Password = "Password cannot exceed more than 10 characters";
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
              type="text"
              name="CompanyName"
              placeholder="Company Name"
              value={formValues.CompanyName}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.CompanyName}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="textarea"
              name="Address"
              placeholder="Address"
              value={formValues.Address}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.Address}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="Name"
              placeholder="Name"
              value={formValues.Name}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.Name}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="Username"
              placeholder="Username"
              value={formValues.Username}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.Username}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="Password"
              placeholder="Password"
              value={formValues.Password}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.Password}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="Phone"
              placeholder="Contact Number"
              value={formValues.Phone}
              onChange={handleChange}
            />
            <p className="error-msg">{formErrors.Phone}</p>
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



// if(res.status >= 200 &&  res.status < 400){
//   //     return fetch ("http://3.74.53.224:3002/create-organization", {
//   //       method: "POST",
//   //       // baseURL: API_URL,
//   //       headers: {
//   //         "content-type": "application/json",
//   //       },
//   //       data: formValues,
//   //       body: JSON.stringify(formValues),
//   //     })
//   //     .then((res) => {
//   //       return res.json();
//   //     })
//   //     .then((formValues) => console.log(formValues))
//   //     .catch((error) => console.log("ERROR"));
//   // } else if (res.status >= 400){
//   //     console.log("SOMETHING WENT WRONG")
//   // }
// })




// if(res.status === 200) {
            
//   return fetch("http://3.74.53.224:3002/create-organization", {
//     headerConfig,
//   })
//   .then((res) => {
//          return res.json();
//   })
//   .then((formValues) => console.log(formValues))
//   .catch((error) => console.log("ERROR"));
// }