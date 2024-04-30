import { login } from "../graphql/queries.js";
import { appendAlert } from "./utils.js";

const form = document.getElementById("form");
const responseMessage = document.getElementById("response-form");
const url = "http://localhost:3000/graphql";

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

  const headers = {
    "Content-Type": "application/json",
  };

  const data = {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  const response = await fetch(url, data);
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
