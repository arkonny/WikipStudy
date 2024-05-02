import graphqlCall from "../graphql/graphqlCall.js";
import { answerQuiz, quizById } from "../graphql/queries.js";
import { appendAlert } from "./utils.js";

const responseMessage = document.getElementById("response-message");
const quizNameInput = document.getElementById("quiz-name");
const questionsList = document.getElementById("questions-list");
const responseQuizButton = document.getElementById("response-quiz");
let numberOfQuestions = 0;

const addPlayableQuestion = (question) => {
  questionsList.innerHTML += `
    <div class="row mb-3">
        <div class="col">
            <h5 class="question">${question}</h5>
        </div>
        <div class="col">
            <input class="form-control answer">
        </div>
    </div>`;
};

const URLparams = new URLSearchParams(window.location.search);
if (!URLparams.has("id")) {
  window.location.href = "index.html";
}

const displayQuizInfo = async () => {
  const response = await graphqlCall(quizById, {
    id: URLparams.get("id"),
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

  const quiz = dataResponse.data.quizById;
  quizNameInput.textContent = quiz.quiz_name;
  quiz.questions.forEach((question) => {
    addPlayableQuestion(question.question);
  });
  numberOfQuestions = quiz.questions.length;
};

const getPageQuizAnswers = () => {
  const quizId = URLparams.get("id");
  const answers = Array.from(
    document.querySelectorAll("#questions-list > div")
  ).map((question) => {
    return question.querySelector(".answer").value;
  });
  return { quizId, answers };
};

responseQuizButton.addEventListener("click", async () => {
  const variables = {
    input: getPageQuizAnswers(),
  };
  const response = await graphqlCall(answerQuiz, variables);
  if (!response.ok) {
    appendAlert(responseMessage, "Connection failed", "danger");
    throw new Error(response.statusText);
  }
  const dataResponse = await response.json();
  if (dataResponse.errors) {
    appendAlert(responseMessage, dataResponse.errors[0].message, "danger");
    throw new Error(dataResponse.errors[0].message);
  }
  const score = dataResponse.data.answerQuiz.score;
  const resultText = document.getElementById("result-text");
  const resultBarDiv = document.getElementById("result-bar-div");
  const resultBar = document.getElementById("result-bar");
  resultBar.ariaValueNow = (score / numberOfQuestions) * 100;
  resultBar.style.width = `${(score / numberOfQuestions) * 100}%`;
  if (score === 0) {
    resultBarDiv.classList.add("bg-danger");
    resultText.textContent = "Failed!";
    resultText.classList.add("text-danger");
  } else {
    resultBar.textContent = `${score} / ${numberOfQuestions}`;
    if (score === numberOfQuestions) {
      resultBar.classList.add("bg-success");
      resultText.textContent = "Perfect!";
      resultText.classList.add("text-success");
    } else if (score < numberOfQuestions / 2) {
      resultBar.classList.add("bg-warning");
    }
  }
});

displayQuizInfo();
