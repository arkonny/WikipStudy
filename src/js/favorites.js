import { favoritesGet, quizzesByOwner } from "../graphql/queries.js";
import {
  addQuizCard,
  addQuizCardEdit,
  appendAlert,
  getCookie,
  graphqlCallResponse,
} from "./utils.js";
import graphqlCall from "../graphql/graphqlCall.js";

const responseMessage = document.getElementById("response-message");
const quizzesListElement = document.getElementById("quizzes-list");

const response = await graphqlCallResponse(favoritesGet, {}, responseMessage);
const quizzesList = response.data.favoritesGet.items;

quizzesList.forEach((quiz) => {
  quizzesListElement.innerHTML =
    addQuizCard(quiz) + quizzesListElement.innerHTML;
});
