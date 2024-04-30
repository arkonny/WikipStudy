import { register } from "../graphql/queries.js";
import { appendAlert } from "./utils.js";
import graphqlCall from "../graphql/graphqlCall.js";

const contactForm = document.getElementById("form");
const responseMessage = document.getElementById("response-form");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const query = register;
  const variables = {
    user: {
      user_name: formData.get("user_name"),
      email: formData.get("email"),
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
    return;
  }

  appendAlert(responseMessage, "Registration successful", "success");
});
