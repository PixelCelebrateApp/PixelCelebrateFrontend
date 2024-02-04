import { HOST } from "../commons/hosts";
import RestApiClient from "../commons/rest-client";

const endpoint = {
  admin: "/api/admin",
  roles: "/roles",
  notifications: "/configuration",
};

function addUser(data, callback) {
  let request = new Request(HOST.backend_api + endpoint.admin, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function getRoles(callback) {
  let request = new Request(
    HOST.backend_api + endpoint.admin + endpoint.roles,
    {
      method: "GET",
    }
  );

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function changeConfiguration(data, callback) {
  let request = new Request(
    HOST.backend_api + endpoint.admin + endpoint.notifications,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function getConfiguration(callback) {
  let request = new Request(
    HOST.backend_api + endpoint.admin + endpoint.notifications,
    {
      method: "GET",
    }
  );

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

export { addUser, getRoles, changeConfiguration, getConfiguration };
