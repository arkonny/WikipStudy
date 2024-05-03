const login = `mutation Login($credentials: Credentials!) {
  login(credentials: $credentials) {
    token
    message
    user {
      id
      user_name
      email
    }
  }
}`;

const register = `mutation Register($user: UserInput!) {
  register(user: $user) {
    message
    user {
      id
      user_name
      email
    }
  }
}`;

const updateUser = `mutation UpdateUser($user: UserModify!) {
  updateUser(user: $user) {
    message
    user {
      id
      user_name
      email
    }
  }
}`;

const userById = `query UserById($userByIdId: ID!) {
  userById(id: $userByIdId) {
    id
    user_name
  }
}`;

const checkToken = `query CheckToken {
  checkToken {
    message
    user {
      id
      user_name
      email
    }
  }
}`;

const deleteUser = `mutation DeleteUser {
  deleteUser {
    message
    user {
      id
      user_name
      email
    }
  }
}`;

const quizzesByOwner = `query QuizzesByOwner($owner: ID!) {
  quizzesByOwner(owner: $owner) {
    id
    quiz_name
    filename
  }
}`;

const quizResearch = `query QuizResearch($search: String!) {
  quizResearch(search: $search) {
    id
    quiz_name
    filename
  }
}`;

const createQuiz = `mutation CreateQuiz($input: QuizInput!) {
  createQuiz(input: $input) {
    id
    quiz_name
    questions {
      id
      question
      options
      answers
      type
    }
    owner {
      id
      user_name
    }
    filename
  }
}`;

const generateQuiz = `mutation GenerateQuiz($search: String!) {
  generateQuiz(search: $search) {
    id
    quiz_name
    questions {
      id
      question
      type
      options
      answers
    }
    owner {
      id
      user_name
    }
    filename
  }
}`;

const updateQuiz = `mutation UpdateQuiz($id: ID!, $input: QuizInput!) {
  updateQuiz(id: $id, input: $input) {
    id
    quiz_name
    questions {
      id
      question
      type
      options
      answers
    }
    owner {
      id
      user_name
    }
    filename
  }
}`;

const deleteQuiz = `mutation DeleteQuiz($id: ID!) {
  deleteQuiz(id: $id) {
    id
    quiz_name
    questions {
      id
      question
      type
      options
      answers
    }
    owner {
      id
      user_name
    }
    filename
  }
}`;

const quizById = `query QuizById($id: ID!) {
  quizById(id: $id) {
    id
    quiz_name
    questions {
      id
      question
      type
      options
      answers
    }
    owner {
      id
      user_name
    }
    filename
  }
}`;

const answerQuiz = `mutation AnswerQuiz($input: AnswerInput!) {
  answerQuiz(input: $input) {
    quiz
    owner
    score
  }
}`;

const favoriteAdd = `mutation FavoritesAdd($quizId: ID!) {
  favoritesAdd(quizId: $quizId) {
    owner
    items {
      id
      quiz_name
      filename
    }
  }
}`;

const favoriteRemove = `mutation FavoritesRemove($quizId: ID!) {
  favoritesRemove(quizId: $quizId) {
    owner
    items {
      id
      quiz_name
      filename
    }
  }
}`;

const favoritesGet = `query FavoritesGet {
  favoritesGet {
    owner
    items {
      id
      quiz_name
      filename
    }
  }
}`;

const reportAdd = `mutation ReportAdd($target: ID!, $message: String) {
  reportAdd(target: $target, message: $message) {
    target
    source
    message
  }
}`;

export {
  login,
  register,
  updateUser,
  userById,
  deleteUser,
  checkToken,
  quizzesByOwner,
  quizResearch,
  createQuiz,
  generateQuiz,
  updateQuiz,
  deleteQuiz,
  quizById,
  answerQuiz,
  favoriteAdd,
  favoriteRemove,
  favoritesGet,
  reportAdd,
};
