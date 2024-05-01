import { login } from "../graphql/queries.js";
import { appendAlert, sessionCheck, setCookie } from "./utils.js";
import graphqlCall from "../graphql/graphqlCall.js";

sessionCheck().then((user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

const loginForm = document.getElementById("form");
const responseMessage = document.getElementById("response-form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const variables = {
    credentials: {
      username: formData.get("username"),
      password: formData.get("password"),
    },
  };

  const response = await graphqlCall(login, variables);
  if (!response.ok) {
    appendAlert(responseMessage, "Connection failed", "danger");
    throw new Error(response.statusText);
  }

  const dataResponse = await response.json();
  if (dataResponse.errors) {
    appendAlert(responseMessage, dataResponse.errors[0].message, "danger");
    throw new Error(dataResponse.errors[0].message);
  }

  appendAlert(responseMessage, "Login successful", "success");
  setCookie("token", dataResponse.data.login.token, 1);
  setCookie("user_name", dataResponse.data.login.user.user_name, 1);
  window.location.href = "index.html";
});
