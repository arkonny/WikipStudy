import { quizResearch, quizzesByOwner } from "../graphql/queries.js";
import { addQuizCard, appendAlert, getCookie } from "./utils.js";
import graphqlCall from "../graphql/graphqlCall.js";

const responseMessage = document.getElementById("response-message");
const quizzesListElement = document.getElementById("quizzes-list");
const researchForm = document.getElementById("research-form");

researchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const response = await graphqlCall(quizResearch, {
    search: researchForm.search.value,
  });
  if (!response.ok) {
    appendAlert(responseMessage, "Connection failed", "danger");
    throw new Error(response.statusText);
  }

  const dataResponse = await response.json();
  if (dataResponse.errors) {
    appendAlert(responseMessage, dataResponse.errors[0].message, "danger");
    throw new Error(dataResponse.errors[0].message);
  }

  const quizzesList = dataResponse.data.quizResearch;

  quizzesList.forEach((quiz) => {
    quizzesListElement.innerHTML =
      addQuizCard(quiz) + quizzesListElement.innerHTML;
  });
  if (quizzesList.length === 0) {
    appendAlert(responseMessage, "No quizzes found", "warning");
  }
});
