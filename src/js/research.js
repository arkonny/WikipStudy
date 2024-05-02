import { quizResearch } from "../graphql/queries.js";
import { addQuizCard, appendAlert, graphqlCallResponse } from "./utils.js";

const responseMessage = document.getElementById("response-message");
const quizzesListElement = document.getElementById("quizzes-list");
const researchForm = document.getElementById("research-form");

researchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const response = await graphqlCallResponse(quizResearch, {
    search: researchForm.search.value,
    responseMessage,
  });
  const quizzesList = response.data.quizResearch;

  quizzesList.forEach((quiz) => {
    quizzesListElement.innerHTML =
      addQuizCard(quiz) + quizzesListElement.innerHTML;
  });
  if (quizzesList.length === 0) {
    appendAlert(responseMessage, "No quizzes found", "warning");
  }
});
