import Notifications from "../../components/notifications/notifications";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import AddUserForm from "../../components/add-user-form";
import "./admin-page.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    let isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    if (!isLoggedIn) {
      navigate("/");
    }
    if (!isAdmin) {
      navigate("/");
    }
  }, []);

  return (
    <div className="parent-div">
      <Card className="parent-card-style">
        <CardHeader>
          <strong>ADMIN ACTIONS</strong>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <strong>Create a new user account:</strong>
                </CardHeader>
                <CardBody>
                  <AddUserForm />
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Notifications />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default AdminPage;
