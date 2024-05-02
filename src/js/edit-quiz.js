import {
  createQuiz,
  deleteQuiz,
  generateQuiz,
  quizById,
  updateQuiz,
} from "../graphql/queries.js";
import { appendAlert, graphqlCallResponse } from "./utils.js";

const responseMessage = document.getElementById("response-message");
const quizNameInput = document.getElementById("quiz-name");
const questionsList = document.getElementById("questions-list");
const addQuestionButton = document.getElementById("add-question");
const removeQuestionButton = document.getElementById("remove-question");
const saveQuizButton = document.getElementById("save-quiz");
const generateQuizButton = document.getElementById("generate-quiz");
const deleteQuizButton = document.getElementById("delete-quiz");
const confirmDeleteButton = document.getElementById("confirm-delete");

const addEditableQuestion = (question, answer) => {
  questionsList.innerHTML += `
      <div class="row mb-3">
          <div class="col">
              <textarea class="form-control question">${question}</textarea>
          </div>
          <div class="col">
              <input type="text" class="form-control answer" value="${answer}">
          </div>
      </div>`;
};

const URLparams = new URLSearchParams(window.location.search);
if (URLparams.has("id")) {
  saveQuizButton.innerHTML = '<i class="bi bi-floppy"></i>' + " Update";
  const response = await graphqlCallResponse(quizById, {
    id: URLparams.get("id"),
    responseMessage,
  });
  const quiz = response.data.quizById;
  quizNameInput.value = quiz.quiz_name;
  quiz.questions.forEach((question) => {
    addEditableQuestion(question.question, question.answers[0]);
  });

  deleteQuizButton.classList.remove("disabled");
  confirmDeleteButton.addEventListener("click", async () => {
    await graphqlCallResponse(deleteQuiz, { id: quiz.id }, responseMessage);
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
  addEditableQuestion("", "");
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
  const response = await graphqlCallResponse(
    createQuiz,
    variables,
    responseMessage
  );
  appendAlert(responseMessage, "Quiz saved successfully", "success");
  URLparams.set("id", response.data.createQuiz.id);
  window.location.href = `edit-quiz.html?${URLparams.toString()}`;
};

const updateQuizFunction = async (quizId) => {
  const variables = {
    id: quizId,
    input: getPageQuizInfo(),
  };

  const response = await graphqlCallResponse(
    updateQuiz,
    variables,
    responseMessage
  );
  if (response.data.updateQuiz.id) {
    appendAlert(responseMessage, "Quiz saved successfully", "success");
  }
};

generateQuizButton.addEventListener("click", async () => {
  const wikipediaPage = document.getElementById("wikipedia-page").value;

  const response = await graphqlCallResponse(
    generateQuiz,
    { search: wikipediaPage },
    responseMessage
  );
  const quiz = response.data.generateQuiz;
  if (quizNameInput.value === "") {
    quizNameInput.value = quiz.quiz_name;
  }
  quiz.questions.forEach((question) => {
    addEditableQuestion(question.question, question.answers[0]);
  });
});
