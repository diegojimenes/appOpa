const INITIAL_STATE = {
  aulas: [],
  aula: [],
  erro: "",
  NewQuestionId: 0,
  startQuiz: 0,
  endQuiz: 0
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_AULAS":
      return { ...state, aulas: action.payload };
    case "GET_AULA":
      return { ...state, aula: action.payload };
    case "NEW_AULA":
      return { ...state, NewQuestionId: action.payload };
    case "NAO_AUTORIZADO":
      return { ...state, erro: action.payload };
    case "START_QUIZ":
      return { ...state, startQuiz: action.payload };
    case "END_QUIZ":
      return { ...state, endQuiz: action.payload };
    default:
      return state;
  }
};
