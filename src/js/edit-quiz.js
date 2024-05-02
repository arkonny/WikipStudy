import graphqlCall from "../graphql/graphqlCall.js";
import {
  createQuiz,
  deleteQuiz,
  generateQuiz,
  quizById,
  updateQuiz,
} from "../graphql/queries.js";
import { appendAlert } from "./utils.js";

const responseMessage = document.getElementById("response-message");
const quizNameInput = document.getElementById("quiz-name");
const questionsList = document.getElementById("questions-list");
const addQuestionButton = document.getElementById("add-question");
const removeQuestionButton = document.getElementById("remove-question");
const saveQuizButton = document.getElementById("save-quiz");
const generateQuizButton = document.getElementById("generate-quiz");
const deleteQuizButton = document.getElementById("delete-quiz");

const URLparams = new URLSearchParams(window.location.search);
if (URLparams.has("id")) {
  saveQuizButton.innerHTML = '<i class="bi bi-floppy"></i>' + " Update";
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
  quizNameInput.value = quiz.quiz_name;
  quiz.questions.forEach((question) => {
    questionsList.innerHTML += `
      <div class="row mb-3">
          <div class="col">
              <textarea class="form-control question">${question.question}</textarea>
          </div>
          <div class="col">
              <textarea class="form-control answer">${question.answers[0]}</textarea>
          </div>
      </div>`;
  });

  deleteQuizButton.classList.remove("disabled");
  deleteQuizButton.addEventListener("click", async () => {
    const response = await graphqlCall(deleteQuiz, { id: quiz.id });
    if (!response.ok) {
      appendAlert(responseMessage, "Connection failed", "danger");
      throw new Error(response.statusText);
    }
    const dataResponse = await response.json();
    if (dataResponse.errors) {
      appendAlert(responseMessage, dataResponse.errors[0].message, "danger");
      throw new Error(dataResponse.errors[0].message);
    }
    appendAlert(responseMessage, "Quiz deleted successfully", "success");
    window.location.href = "index.html";
  });
}

saveQuizButton.addEventListener("click", async () => {
  if (URLparams.has("id")) {
    const quizId = URLparams.get("id");
    updateQuizFunction(quizId);
  } else {
    saveQuiz();
  }
});

addQuestionButton.addEventListener("click", () => {
  questionsList.innerHTML += `
    <div class="row mb-3">
        <div class="col">
            <textarea class="form-control question"></textarea>
        </div>
        <div class="col">
            <textarea class="form-control answer"></textarea>
        </div>
    </div>`;
});

removeQuestionButton.addEventListener("click", () => {
  const lastQuestion = document.querySelector(
    "#questions-list > div:last-child"
  );
  if (lastQuestion) {
    lastQuestion.remove();
  }
});

const getPageQuizInfo = () => {
  const quiz_name = quizNameInput.value;
  const questions = Array.from(
    document.querySelectorAll("#questions-list > div")
  ).map((question) => {
    return {
      question: question.querySelector(".question").value,
      answers: question.querySelector(".answer").value,
    };
  });
  return { quiz_name, questions };
};

const saveQuiz = async () => {
  const variables = {
    input: getPageQuizInfo(),
  };
  const response = await graphqlCall(createQuiz, variables);
  if (!response.ok) {
    appendAlert(responseMessage, "Connection failed", "danger");
    throw new Error(response.statusText);
  }

  const dataResponse = await response.json();
  if (dataResponse.errors) {
    appendAlert(responseMessage, dataResponse.errors[0].message, "danger");
    throw new Error(dataResponse.errors[0].message);
  }
  appendAlert(responseMessage, "Quiz saved successfully", "success");
  URLparams.set("id", dataResponse.data.createQuiz.id);
  window.location.href = `edit-quiz.html?${URLparams.toString()}`;
};

const updateQuizFunction = async (quizId) => {
  const variables = {
    id: quizId,
    input: getPageQuizInfo(),
  };

  const response = await graphqlCall(updateQuiz, variables);
  if (!response.ok) {
    appendAlert(responseMessage, "Connection failed", "danger");
    throw new Error(response.statusText);
  }

  const dataResponse = await response.json();
  if (dataResponse.errors) {
    appendAlert(responseMessage, dataResponse.errors[0].message, "danger");
    throw new Error(dataResponse.errors[0].message);
  }
  if (dataResponse.data.updateQuiz.id) {
    appendAlert(responseMessage, "Quiz saved successfully", "success");
  }
};

generateQuizButton.addEventListener("click", async () => {
  const wikipediaPage = document.getElementById("wikipedia-page").value;

  const response = await graphqlCall(generateQuiz, { search: wikipediaPage });
  if (!response.ok) {
    appendAlert(responseMessage, "Connection failed", "danger");
    throw new Error(response.statusText);
  }

  const dataResponse = await response.json();
  if (dataResponse.errors) {
    appendAlert(responseMessage, dataResponse.errors[0].message, "danger");
    throw new Error(dataResponse.errors[0].message);
  }

  const quiz = dataResponse.data.generateQuiz;
  if (quizNameInput.value === "") {
    quizNameInput.value = quiz.quiz_name;
  }
  quiz.questions.forEach((question) => {
    questionsList.innerHTML += `
      <div class="row mb-3">
          <div class="col">
              <textarea class="form-control question">${question.question}</textarea>
          </div>
          <div class="col">
              <textarea class="form-control answer">${question.answers[0]}</textarea>
          </div>
      </div>`;
  });
});
