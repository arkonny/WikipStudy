import { register } from "../graphql/queries.js";
import { appendAlert, graphqlCallResponse, sessionCheck } from "./utils.js";

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

  await graphqlCallResponse(register, variables, responseMessage);
  appendAlert(responseMessage, "Registration successful", "success");
  window.location.href = "login.html";
});
