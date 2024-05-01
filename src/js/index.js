import { quizzesByOwner } from "../graphql/queries.js";
import { addQuizCard, appendAlert, getCookie } from "./utils.js";
import graphqlCall from "../graphql/graphqlCall.js";

const responseMessage = document.getElementById("response-message");
const quizzesListElement = document.getElementById("quizzes-list");

const response = await graphqlCall(quizzesByOwner, { owner: getCookie("id") });
if (!response.ok) {
  appendAlert(responseMessage, "Connection failed", "danger");
  throw new Error(response.statusText);
}

const dataResponse = await response.json();
if (dataResponse.errors) {
  appendAlert(responseMessage, dataResponse.errors[0].message, "danger");
  throw new Error(dataResponse.errors[0].message);
}

const quizzesList = dataResponse.data.quizzesByOwner;

quizzesList.forEach((quiz) => {
  quizzesListElement.innerHTML =
    addQuizCard(quiz) + quizzesListElement.innerHTML;
});
