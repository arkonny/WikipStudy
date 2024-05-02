import { quizzesByOwner } from "../graphql/queries.js";
import { addQuizCardEdit, getCookie, graphqlCallResponse } from "./utils.js";

const responseMessage = document.getElementById("response-message");
const quizzesListElement = document.getElementById("quizzes-list");

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
