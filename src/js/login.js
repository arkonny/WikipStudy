import { login } from "../graphql/queries.js";
import {
  appendAlert,
  graphqlCallResponse,
  sessionCheck,
  setCookie,
} from "./utils.js";

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

  const response = await graphqlCallResponse(login, variables, responseMessage);
  if (!response.ok) {
    return;
  }
  appendAlert(responseMessage, "Login successful", "success");
  setCookie("token", response.data.login.token);
  setCookie("user_name", response.data.login.user.user_name);
  setCookie("id", response.data.login.user.id);
  window.location.href = "index.html";
});
