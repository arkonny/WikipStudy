import {
  checkToken,
  deleteUser,
  quizzesByOwner,
  updateUser,
} from "../graphql/queries.js";
import {
  addQuizCardEdit,
  appendAlert,
  deleteCookie,
  getCookie,
  graphqlCallResponse,
} from "./utils.js";

const responseMessage = document.getElementById("response-message");
const quizzesListElement = document.getElementById("quizzes-list");
const editUserButton = document.getElementById("edit-profile-confirm");
const updateForm = document.getElementById("update-form");
const deleteUserButton = document.getElementById("delete-profile-confirm");

const titleName = document.getElementById("title-name");
const name = getCookie("user_name");
titleName.textContent += ", " + name;
const response = await graphqlCallResponse(
  quizzesByOwner,
  { owner: getCookie("id") },
  responseMessage
);
const quizzesList = response.data.quizzesByOwner;
quizzesList.forEach((quiz) => {
  quizzesListElement.innerHTML =
    addQuizCardEdit(quiz) + quizzesListElement.innerHTML;
});

const userResponse = await graphqlCallResponse(checkToken, {}, responseMessage);
updateForm.user_name.value = userResponse.data.checkToken.user.user_name;
updateForm.email.value = userResponse.data.checkToken.user.email;

editUserButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const formData = new FormData(updateForm);
  let user = {};
  const user_name = formData.get("user_name");
  if (user_name !== "") {
    user.user_name = user_name;
  }
  const email = formData.get("email");
  if (email !== "") {
    user.email = email;
  }
  const variables = {
    user,
  };

  await graphqlCallResponse(updateUser, variables, responseMessage);
  appendAlert(responseMessage, "Profile updated", "success");
});

deleteUserButton.addEventListener("click", async (event) => {
  event.preventDefault();
  await graphqlCallResponse(deleteUser, {}, responseMessage);
  appendAlert(responseMessage, "Profile deleted", "success");
  deleteCookie("token");
  deleteCookie("user_name");
  deleteCookie("id");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 2000);
});
