import { HOST } from "../commons/hosts";
import RestApiClient from "../commons/rest-client";

const endpoint = {
  user: "/api/user",
  login: "/login",
  users: "/users",
};

function login(username, password, callback) {
  let request = new Request(HOST.backend_api + endpoint.user + endpoint.login, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function getUser(id, callback) {
  let request = new Request(HOST.backend_api + endpoint.user + "/" + id, {
    method: "GET",
  });

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

function getAllUsers(callback) {
  let request = new Request(HOST.backend_api + endpoint.user + endpoint.users, {
    method: "GET",
  });

  console.log(request.url);
  RestApiClient.performRequest(request, callback);
}

export { login, getUser, getAllUsers };
