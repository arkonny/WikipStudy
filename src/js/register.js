const contactForm = document.getElementById("form");
const responseMessage = document.getElementById("response-form");
const url = "http://localhost:3000/graphql";

const register = `mutation Register($user: UserInput!) {
  register(user: $user) {
    message
    user {
      id
      user_name
      email
    }
  }
}`;

const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  responseMessage.append(wrapper);
};

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
    appendAlert("Connection failed", "danger");
    throw new Error(response.statusText);
  }

  const dataResponse = await response.json();
  if (dataResponse.errors) {
    appendAlert(dataResponse.errors[0].message, "danger");
    return;
  }

  appendAlert("Registration successful", "success");
});
