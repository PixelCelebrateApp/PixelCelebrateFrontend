import React, { useState, useContext, useEffect } from "react";
import { FormGroup, Input, Label, Button } from "reactstrap";

import Validators from "../commons/validators";
import * as UserAPI from "../api/user-api.js";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const formInit = {
  username: {
    value: "",
    placeholder: "Enter your username...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
    },
  },
  password: {
    value: "",
    placeholder: "Enter your password...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      minLength: 8,
    },
  },
};

function LoginForm({ toggleModal }) {
  const { setIsLoggedIn, setIsAdmin } = useContext(AppContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formValues, setFormValues] = useState(formInit);
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();

  useEffect(() => {
    resetFields();
  }, []);

  function resetFields() {
    let elements = { ...formValues };
    elements["username"].value = "";
    elements["username"].valid = false;
    elements["username"].touched = false;
    elements["password"].value = "";
    elements["password"].valid = false;
    elements["password"].touched = false;
    setFormValues(() => elements);

    let formIsValid = false;
    setFormIsValid(() => formIsValid);
  }

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    let updatedValues = { ...formValues };

    let updatedFormElement = updatedValues[name];

    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = Validators(
      value,
      updatedFormElement.validationRules
    );
    updatedValues[name] = updatedFormElement;

    let formIsValid = true;
    for (let updatedFormElementName in updatedValues) {
      formIsValid = updatedValues[updatedFormElementName].valid && formIsValid;
    }

    setFormValues(() => updatedValues);
    setFormIsValid(() => formIsValid);
  }

  function loginUser(username, password) {
    return UserAPI.login(username, password, (result, status, err) => {
      if (result !== null && status === 200) {
        let userData = {
          id: result.id,
        };
        localStorage.setItem("loggedUser", JSON.stringify(userData));
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        setIsLoggedIn(true);
        if (result.userRole === "ADMIN") {
          localStorage.setItem("isAdmin", JSON.stringify(true));
          setIsAdmin(true);
        }
        toggleModal();
        navigate("/profile");
      } else {
        alert("Invalid credentials!");
      }
    });
  }

  function handleSubmit() {
    let username = formValues.username.value;
    let password = formValues.password.value;
    loginUser(username, password);
    resetFields();
  }

  function togglePassword() {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  return (
    <div>
      <FormGroup id="username">
        <Label for="usernameField"> Username: </Label>
        <Input
          type={"text"}
          name="username"
          id="usernameField"
          placeholder={formValues.username.placeholder}
          onChange={handleChange}
          value={formValues.username.value}
          touched={formValues.username.touched ? 1 : 0}
          valid={formValues.username.valid}
          required
        />
        {formValues.username.touched && !formValues.username.valid && (
          <div className={"error-message"}> * Username is required! * </div>
        )}
      </FormGroup>

      <FormGroup id="password">
        <Label for="passwordField"> Password: &nbsp; </Label>
        <Input type={"checkbox"} onClick={togglePassword} />
        <Input
          type={passwordType}
          name="password"
          id="passwordField"
          placeholder={formValues.password.placeholder}
          onChange={handleChange}
          value={formValues.password.value}
          touched={formValues.password.touched ? 1 : 0}
          valid={formValues.password.valid}
          required
        />
        {formValues.password.touched && !formValues.password.valid && (
          <div className={"error-message"}>
            {" "}
            * Password is required and must have at least 8 characters! *{" "}
          </div>
        )}
      </FormGroup>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type={"submit"}
          color={"primary"}
          disabled={!formIsValid}
          onClick={handleSubmit}
        >
          {" "}
          Log in{" "}
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
