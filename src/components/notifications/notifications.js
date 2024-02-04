import { useEffect, useState } from "react";
import emailIcon from "../../commons/images/email-icon.png";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import "./notifications.css";
import * as AdminAPI from "../../api/admin-api.js";

function Notifications() {
  const [officialValue, setOfficialValue] = useState();
  const minValue = 1;
  const [configValue, setConfigValue] = useState(minValue);
  const maxValue = 30;

  useEffect(() => {
    getConfigValue();
  });

  function getConfigValue() {
    return AdminAPI.getConfiguration((result, status, error) => {
      if (result !== null && status === 200) {
        setOfficialValue(result);
      }
    });
  }

  function handleSubmit() {
    let data = {
      value: configValue,
    };
    return AdminAPI.changeConfiguration(data, (result, status, error) => {
      if (result !== null && status === 200) {
        alert("The change was successful!");
        getConfigValue();
      } else {
        alert("Could not update the value!");
      }
    });
  }

  return (
    <div className="main-div">
      <Card>
        <CardHeader>
          <strong>Set email notifications' configuration:</strong>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className="col-div-style">
              <img
                src={emailIcon}
                width={"20%"}
                alt="user icon"
                className="image-style"
              />
            </Col>
          </Row>
          <Row>
            <FormGroup>
              <Label for="officialConfigField"> Official Value: </Label>
              <Input
                name="officialConfig"
                id="officialConfigField"
                defaultValue={officialValue}
                type="number"
                disabled
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Label for="configField"> Select new value: </Label>
              <Input
                name="config"
                id="configField"
                value={configValue}
                type="number"
                min={minValue}
                max={maxValue}
                onChange={(e) => {
                  if (e.target.value < minValue) {
                    setConfigValue(minValue);
                  } else if (e.target.value > maxValue) {
                    setConfigValue(maxValue);
                  } else {
                    setConfigValue(e.target.value);
                  }
                }}
              />
            </FormGroup>
          </Row>
          <Row>
            <Col className="col-div-style">
              <FormGroup>
                <Button
                  type={"submit"}
                  color={"primary"}
                  onClick={handleSubmit}
                >
                  {" "}
                  Change{" "}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          * Minimum value: 1 day, maximum value: 30 days *
        </CardFooter>
      </Card>
    </div>
  );
}
export default Notifications;
