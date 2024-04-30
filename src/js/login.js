import { login } from "../graphql/queries.js";
import { appendAlert } from "./utils.js";
import graphqlCall from "../graphql/graphqlCall.js";

const form = document.getElementById("form");
const responseMessage = document.getElementById("response-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const query = login;
  const variables = {
    credentials: {
      username: formData.get("username"),
      password: formData.get("password"),
    },
  };

  const response = await graphqlCall(query, variables);

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
  document.cookie = `token=${dataResponse.data.login.token}`;
  window.location.href = "index.html";
});
