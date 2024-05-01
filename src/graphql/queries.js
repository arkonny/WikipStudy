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

const quizzesByOwner = `query QuizzesByOwner($owner: ID!) {
  quizzesByOwner(owner: $owner) {
    id
    quiz_name
    filename
  }
}`;

export { login, register, checkToken, quizzesByOwner };
