import { useEffect, useState } from "react";
import * as UserAPI from "../../api/user-api.js";
import InfoTable from "../../commons/table/info-table.js";
import { Card, CardHeader, CardBody } from "reactstrap";
import "./users-page.css";
import { useNavigate } from "react-router-dom";

let dataField = {
  fullName: "",
  email: "",
  birthday: "",
  role: "",
};

function UsersPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  const columns = [
    { Header: "Full name", accessor: "fullName" },
    { Header: "Email", accessor: "email" },
    { Header: "Birthday", accessor: "birthday" },
    { Header: "Role", accessor: "role" },
  ];
  const [data, setData] = useState([dataField]);

  useEffect(() => {
    getAllUsers();
  }, []);

  function processDate(day, month) {
    let resultDay = day;
    if (resultDay < 10) {
      resultDay = "0" + resultDay;
    }

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let resultMonth = months[month - 1];

    return resultMonth + " " + resultDay;
  }

  function getAllUsers() {
    return UserAPI.getAllUsers((result, status, err) => {
      if (result !== null && status === 200) {
        let dataListTemp = [];
        result.forEach((element) => {
          let elementTemp = {
            fullName: element.fullName,
            email: element.email,
            birthday: processDate(element.dayOfBirth, element.monthOfBirth),
            role: element.userRole,
          };
          dataListTemp.push(elementTemp);
        });
        setData(() => dataListTemp);
        console.log(dataListTemp);
      }
    });
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <strong>ALL USERS LIST</strong>
        </CardHeader>
        <CardBody className="card-body-style">
          <InfoTable columns={columns} data={data} />
        </CardBody>
      </Card>
    </div>
  );
}
export default UsersPage;
