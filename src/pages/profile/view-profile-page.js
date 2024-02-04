import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Col,
  Row,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import userIcon from "../../commons/images/user-icon.png";
import "./view-profile-page.css";
import { useContext, useEffect, useState } from "react";
import * as UserAPI from "../../api/user-api.js";
import { AppContext } from "../../App.js";
import { useNavigate } from "react-router-dom";

const userDataInit = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  birthdate: "",
};

function ViewProfile() {
  const { isLoggedIn } = useContext(AppContext);
  const [userData, setUserData] = useState(userDataInit);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (loggedUser !== null) {
        let id = loggedUser.id;
        getUserData(id);
      }
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);

  function getUserData(id) {
    return UserAPI.getUser(id, (result, status, err) => {
      if (result !== null && status === 200) {
        let userDataTemp = { ...userData };
        userDataTemp.firstName = result.firstName;
        userDataTemp.lastName = result.lastName;
        userDataTemp.email = result.email;
        userDataTemp.username = result.username;
        userDataTemp.birthdate = result.birthdate;
        setUserData(() => userDataTemp);
      }
    });
  }

  return (
    <div className="profile-div-style">
      <Card className="profile-card-style">
        <CardHeader>
          <strong>YOUR PROFILE</strong>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className="image-col-div-style">
              <img
                src={userIcon}
                width={"20%"}
                alt="user icon"
                className="image-style"
              />
            </Col>
          </Row>
          <Row>
            <CardTitle>
              <strong>Your personal information:</strong>
            </CardTitle>
            <FormGroup>
              <Label for="firstNameField"> First name: </Label>
              <Input
                name="firstName"
                id="firstNameField"
                value={userData.firstName}
                type="text"
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastNameField"> Last name: </Label>
              <Input
                name="lastName"
                id="lastNameField"
                value={userData.lastName}
                type="text"
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="emailField"> Email: </Label>
              <Input
                name="email"
                id="emailField"
                value={userData.email}
                type="text"
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="usernameField"> Username: </Label>
              <Input
                name="username"
                id="usernameField"
                value={userData.username}
                type="text"
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthdateField"> Birthdate: </Label>
              <Input
                name="birthdate"
                id="birthdateField"
                value={userData.birthdate}
                type="text"
                disabled
              />
            </FormGroup>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}
export default ViewProfile;
