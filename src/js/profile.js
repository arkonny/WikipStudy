import { quizzesByOwner, userById } from "../graphql/queries.js";
import { addQuizCard, graphqlCallResponse } from "./utils.js";

const responseMessage = document.getElementById("response-message");
const quizzesListElement = document.getElementById("quizzes-list");

const URLparams = new URLSearchParams(window.location.search);
if (!URLparams.has("id")) {
  window.location.href = "index.html";
}
const titleName = document.getElementById("title-name");
const userId = URLparams.get("id");
const userInfos = await graphqlCallResponse(
  userById,
  { userByIdId: userId },
  responseMessage
);
titleName.textContent = userInfos.data.userById.user_name + "'s Profile";
const response = await graphqlCallResponse(
  quizzesByOwner,
  { owner: userId },
  responseMessage
);
const quizzesList = response.data.quizzesByOwner;
quizzesList.forEach((quiz) => {
  quizzesListElement.innerHTML =
    addQuizCard(quiz) + quizzesListElement.innerHTML;
});
