import * as AdminAPI from "../api/admin-api.js";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Validators from "../commons/validators";
import { FormGroup, Input, Label, Button } from "reactstrap";

let formValuesInit = {
  firstName: {
    value: "",
    placeholder: "Enter user's first name...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      minLength: 3,
      nameValidator: true,
    },
  },
  lastName: {
    value: "",
    placeholder: "Enter user's last name...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      minLength: 3,
      nameValidator: true,
    },
  },
  email: {
    value: "",
    placeholder: "Enter user's email...Ex: nume@domeniu.com...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      emailValidator: true,
    },
  },
  username: {
    value: "",
    placeholder: "Enter user's username...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      usernameValidator: true,
      minLength: 5,
    },
  },
  password: {
    value: "",
    placeholder: "Enter user's password...",
    valid: false,
    touched: false,
    validationRules: {
      isRequired: true,
      minLength: 8,
      passwordValidator: true,
    },
  },
};

let roleInit = {
  id: "",
  roleTitle: "",
};

function AddUserForm() {
  const [formValues, setFormValues] = useState(formValuesInit);
  const [roles, setRoles] = useState([roleInit]);
  const [userRoleId, setUserRoleId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    resetFields();
    getRoles();
  }, []);

  function getRoles() {
    return AdminAPI.getRoles((result, status, err) => {
      if (result !== null && status === 200) {
        let rolesListTemp = [];
        result.forEach((role) => {
          let roleTemp = {
            id: role.id,
            roleTitle: role.roleTitle,
          };
          rolesListTemp.push(roleTemp);
        });
        setRoles(() => rolesListTemp);
      } else {
        alert("Could not retrieve roles data!");
      }
    });
  }

  function resetFields() {
    let elements = { ...formValues };
    elements["firstName"].value = "";
    elements["firstName"].valid = false;
    elements["firstName"].touched = false;
    elements["lastName"].value = "";
    elements["lastName"].valid = false;
    elements["lastName"].touched = false;
    elements["email"].value = "";
    elements["email"].valid = false;
    elements["email"].touched = false;
    elements["username"].value = "";
    elements["username"].valid = false;
    elements["username"].touched = false;
    elements["password"].value = "";
    elements["password"].valid = false;
    elements["password"].touched = false;
    setFormValues(() => elements);

    let formIsValid = false;
    setFormIsValid(() => formIsValid);

    setSelectedDate(new Date());
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

  function addUser(userData) {
    return AdminAPI.addUser(userData, (result, status, err) => {
      if (result !== null && status === 201) {
        alert("Success!");
      } else {
        alert("Could not create user account! Try again!");
      }
    });
  }

  function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentYear = new Date().getFullYear;
    if (year > currentYear) {
      year = currentYear;
    }
    let formattedDate = date.getFullYear() + "-";
    if (month < 10) {
      formattedDate = formattedDate + "0";
    }
    formattedDate = formattedDate + month + "-";
    if (day < 10) {
      formattedDate = formattedDate + "0";
    }
    formattedDate = formattedDate + day;
    return formattedDate;
  }

  function handleSubmit() {
    let userData = {
      firstName: formValues.firstName.value,
      lastName: formValues.lastName.value,
      email: formValues.email.value,
      username: formValues.username.value,
      password: formValues.password.value,
      birthdate: formatDate(selectedDate),
      userRole: userRoleId,
    };
    addUser(userData);
    resetFields();
  }

  return (
    <div>
      <FormGroup id="firstName">
        <Label for="firstNameField"> First name: </Label>
        <Input
          type={"text"}
          name="firstName"
          id="firstNameField"
          placeholder={formValues.firstName.placeholder}
          onChange={handleChange}
          value={formValues.firstName.value}
          touched={formValues.firstName.touched ? 1 : 0}
          valid={formValues.firstName.valid}
          required
        />
        {formValues.firstName.touched && !formValues.firstName.valid && (
          <div className={"error-message"}>
            {" "}
            * Only characters are allowed! At least 3 characters are required! *{" "}
          </div>
        )}
      </FormGroup>
      <FormGroup id="lastName">
        <Label for="lastNameField"> Last name: </Label>
        <Input
          type={"text"}
          name="lastName"
          id="lastNameField"
          placeholder={formValues.lastName.placeholder}
          onChange={handleChange}
          value={formValues.lastName.value}
          touched={formValues.lastName.touched ? 1 : 0}
          valid={formValues.lastName.valid}
          required
        />
        {formValues.lastName.touched && !formValues.lastName.valid && (
          <div className={"error-message"}>
            {" "}
            * Only characters are allowed! At least 3 characters are required! *{" "}
          </div>
        )}
      </FormGroup>
      <FormGroup id="email">
        <Label for="emailField"> Email: </Label>
        <Input
          type={"text"}
          name="email"
          id="emailField"
          placeholder={formValues.email.placeholder}
          onChange={handleChange}
          value={formValues.email.value}
          touched={formValues.email.touched ? 1 : 0}
          valid={formValues.email.valid}
          required
        />
        {formValues.email.touched && !formValues.email.valid && (
          <div className={"error-message"}>
            {" "}
            * Email must have a valid format! *{" "}
          </div>
        )}
      </FormGroup>
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
          <div className={"error-message"}>
            {" "}
            * Username must contain at least 5 characters, an uppercase
            character and a digit! *{" "}
          </div>
        )}
      </FormGroup>
      <FormGroup id="password">
        <Label for="passwordField"> Password: </Label>
        <Input
          type={"text"}
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
            * Password must contain at least 8 characters, a special character,
            an uppercase character and a digit! *{" "}
          </div>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="dateField"> Choose birthdate: </Label>{" "}
        <DatePicker
          id="dateField"
          selected={selectedDate}
          onChange={setSelectedDate}
          dateFormat={"yyyy-MM-dd"}
          valid={selectedDate !== null}
          maxDate={new Date(`${new Date().getFullYear()}-12-31`)}
        />
        {selectedDate === null && (
          <div className={"error-message"}> * Birthdate is required * </div>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="selectRoleField"> Choose role: </Label>{" "}
        <select
          name="selectRole"
          id="selectRoleField"
          value={userRoleId}
          onChange={(e) => {
            setUserRoleId(() => e.target.value);
          }}
        >
          <option key={"default"} value={"default"}>
            --Choose a role--
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.roleTitle}
            </option>
          ))}
        </select>
      </FormGroup>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type={"submit"}
          color={"primary"}
          disabled={
            !formIsValid ||
            selectedDate === null ||
            userRoleId === "" ||
            userRoleId === "default"
          }
          onClick={handleSubmit}
        >
          {" "}
          Add User{" "}
        </Button>
      </div>
    </div>
  );
}
export default AddUserForm;
