import { register } from "../graphql/queries.js";
import { appendAlert, sessionCheck } from "./utils.js";
import graphqlCall from "../graphql/graphqlCall.js";

sessionCheck().then((user) => {
  if (user) {
    window.location.href = "index.html";
  }
});

const registerForm = document.getElementById("form");
const responseMessage = document.getElementById("response-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);
  const variables = {
    user: {
      user_name: formData.get("user_name"),
      email: formData.get("email"),
      password: formData.get("password"),
    },
  };

  const response = await graphqlCall(register, variables);
  if (!response.ok) {
    appendAlert(responseMessage, "Connection failed", "danger");
    throw new Error(response.statusText);
  }

  const dataResponse = await response.json();
  if (dataResponse.errors) {
    appendAlert(responseMessage, dataResponse.errors[0].message, "danger");
    throw new Error(dataResponse.errors[0].message);
  }

  appendAlert(responseMessage, "Registration successful", "success");
});
