import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import LoginForm from "../../components/login-form";
import "./login-page.css";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { isLoggedIn } = useContext(AppContext);
  const [isSelected, setIsSelected] = useState(true);

  const navigate = useNavigate();

  function toggleIsSelected() {
    setIsSelected(!isSelected);
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Modal
        isOpen={isSelected}
        toggle={toggleIsSelected}
        backdrop="static"
        centered
        contentClassName="modal-width"
        size="lg"
      >
        <ModalHeader> Log into your account: </ModalHeader>
        <ModalBody className="modal-height">
          <LoginForm toggleModal={toggleIsSelected} />
        </ModalBody>
      </Modal>
    </div>
  );
}
export default LoginPage;
