import {
  answerQuiz,
  favoriteAdd,
  favoriteRemove,
  quizById,
  reportAdd,
} from "../graphql/queries.js";
import { appendAlert, getImageUrl, graphqlCallResponse } from "./utils.js";

const responseMessage = document.getElementById("response-message");
const quizNameInput = document.getElementById("quiz-name");
const quizOwnerInput = document.getElementById("quiz-owner");
const questionsList = document.getElementById("questions-list");
const responseQuizButton = document.getElementById("response-quiz");
const favoriteButton = document.getElementById("favorite-quiz");
const favoriteIcon = favoriteButton.querySelector("i");
const reportButton = document.getElementById("report-confirm-button");
const quizImage = document.getElementById("quiz-image");
let numberOfQuestions = 0;
let favorite = false;

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
  const response = await graphqlCallResponse(
    quizById,
    {
      id: URLparams.get("id"),
    },
    responseMessage
  );
  const quiz = response.data.quizById;
  console.log(quiz);
  quizNameInput.textContent = quiz.quiz_name;
  quizOwnerInput.textContent = "A quiz by : " + quiz.owner.user_name;
  quizImage.src = getImageUrl(quiz.filename);

  quiz.questions.forEach((question) => {
    addPlayableQuestion(question.question);
  });
  numberOfQuestions = quiz.questions.length;
  if (quiz.favorite) {
    favorite = true;
    favoriteIcon.classList.remove("bi-star");
    favoriteIcon.classList.add("bi-star-fill");
  }
};

displayQuizInfo();

favoriteButton.addEventListener("click", async () => {
  if (favorite) {
    try {
      await graphqlCallResponse(
        favoriteRemove,
        {
          quizId: URLparams.get("id"),
        },
        responseMessage
      );
    } catch (error) {
      throw error;
    }
    appendAlert(responseMessage, "Quiz removed from favorites", "success");
    favoriteIcon.classList.remove("bi-star-fill");
    favoriteIcon.classList.add("bi-star");
    favorite = false;
  } else {
    try {
      await graphqlCallResponse(
        favoriteAdd,
        {
          quizId: URLparams.get("id"),
        },
        responseMessage
      );
    } catch (error) {
      throw error;
    }
    appendAlert(responseMessage, "Quiz added to favorites", "success");
    favoriteIcon.classList.remove("bi-star");
    favoriteIcon.classList.add("bi-star-fill");
    favorite = true;
  }
});

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
  const response = await graphqlCallResponse(
    answerQuiz,
    variables,
    responseMessage
  );

  const score = response.data.answerQuiz.score;
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

reportButton.addEventListener("click", async () => {
  const reportText = document.getElementById("message-report");
  const variables = {
    target: URLparams.get("id"),
    message: reportText.value,
  };
  await graphqlCallResponse(reportAdd, variables, responseMessage);
  appendAlert(responseMessage, "Report sent", "success");
  reportText.value = "";
});
