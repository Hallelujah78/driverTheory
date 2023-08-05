import { initialState } from "./appContext.js";
import {
  TOGGLE_IS_FLAGGED,
  SET_TEST_COMPLETE_SUCCESS,
  SET_TEST_COMPLETE_BEGIN,
  GET_TEST_BEGIN,
  GET_TEST_SUCCESS,
  GET_TEST_ERROR,
  SELECT_ANSWER,
  SUBMIT_ANSWER,
  EXIT_TEST,
  SET_MODAL_STATE,
  INCREMENT_QUESTION,
  DECREMENT_QUESTION,
  CREATE_TEST_BEGIN,
  CREATE_TEST_SUCCESS,
  CREATE_TEST_ERROR,
  SET_USER_NULL,
  SET_USER_LOADING,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  CLEAR_VALUES,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  HANDLE_CHANGE,
  CREATE_QUESTION_BEGIN,
  CREATE_QUESTION_ERROR,
  CREATE_QUESTION_SUCCESS,
  SET_CURRENT_QUESTION,
  GET_QUESTIONS_READ_BEGIN,
  GET_QUESTIONS_READ_ERROR,
  GET_QUESTIONS_READ_SUCCESS,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isRegistered: true,
      isLoading: false,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,

      user: action.payload.user,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,

      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    return {
      ...state,
      isEditing: false,
      imageURL: "",
      editQuestionId: "",
      questionText: "",
      correctAnswer: "",
      answerTwo: "",
      answerThree: "",
      answerFour: "",
      questionCategory: "control of vehicle",
    };
  }

  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      userLoading: true,
    };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      userLoading: false,
    };
  }

  if (action.type === SET_USER_LOADING) {
    return {
      ...state,
      userLoading: false,
    };
  }

  if (action.type === SET_USER_NULL) {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === CREATE_QUESTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_QUESTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CREATE_QUESTION_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CREATE_TEST_BEGIN) {
    return {
      ...state,
      isLoading: true,
      creatingTest: true,
      testLoading: true,
      test: null,
      results: null,
      isComplete: false,
      createdAt: null,
      testTitle: "",
    };
  }
  if (action.type === CREATE_TEST_SUCCESS) {
    return {
      ...state,
      test: action.payload.test,
      isLoading: false,
      testLoading: false,
      creatingTest: false,
      createdAt: action.payload.createdAt,
      testTitle: action.payload.testTitle,
    };
  }
  if (action.type === CREATE_TEST_ERROR) {
    return {
      ...state,
      test: null,
      isLoading: false,
      creatingTest: false,
      testLoading: false,
      createdAt: null,
      testTitle: "",
    };
  }
  if (action.type === INCREMENT_QUESTION) {
    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
    };
  }
  if (action.type === DECREMENT_QUESTION) {
    return {
      ...state,
      currentQuestion: state.currentQuestion - 1,
    };
  }
  if (action.type === SET_MODAL_STATE) {
    return {
      ...state,
      modalAlert: !state.modalAlert,
    };
  }
  if (action.type === EXIT_TEST) {
    return {
      ...state,
      currentQuestion: 0,
      test: null,
      testLoading: true,
      creatingTest: false,
      isLoading: false,
      createdAt: null,
      testTitle: "",
    };
  }
  if (action.type === GET_TEST_BEGIN) {
    return {
      ...state,
      currentQuestion: 0,
      isLoading: true,
      testLoading: true,
    };
  }
  if (action.type === GET_TEST_SUCCESS) {
    return {
      ...state,
      currentQuestion: 0,
      test: action.payload.test,
      testLoading: false,
      isLoading: false,
      isComplete: action.payload.isComplete,
      results: action.payload.results,
      createdAt: action.payload.createdAt,
      testTitle: action.payload.testTitle,
    };
  }
  if (action.type === GET_TEST_ERROR) {
    return {
      ...state,
      currentQuestion: 0,
      test: null,
      testLoading: false,
      isLoading: false,
      isComplete: false,
      results: null,
      createdAt: null,
      testTitle: "",
    };
  }
  if (action.type === SUBMIT_ANSWER) {
    return {
      ...state,
      test: action.payload.test,
      isComplete: action.payload.isComplete,
      results: action.payload.results,
    };
  }
  if (action.type === SELECT_ANSWER) {
    return {
      ...state,
      test: [...action.payload.newTest],
    };
  }
  if (action.type === SET_TEST_COMPLETE_BEGIN) {
    return {
      ...state,
      isComplete: true,
    };
  }
  if (action.type === SET_TEST_COMPLETE_SUCCESS) {
    return {
      ...state,
      test: action.payload.test,
      isComplete: action.payload.isComplete,
      results: action.payload.results,
      testTitle: action.payload.testTitle,
    };
  }

  if (action.type === TOGGLE_IS_FLAGGED) {
    return {
      ...state,
    };
  }

  if (action.type === SET_CURRENT_QUESTION) {
    return {
      ...state,
      currentQuestion: action.payload.index,
    };
  }

  if (action.type === GET_QUESTIONS_READ_BEGIN) {
    return {
      ...state,
      isLoading: true,

      test: null,
      results: null,
    };
  }
  if (action.type === GET_QUESTIONS_READ_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      creatingTest: false,
      testLoading: false,
      test: action.payload.questions,
      results: null,
      testTitle: "Reading Questions",
    };
  }
  if (action.type === GET_QUESTIONS_READ_ERROR) {
    return {
      ...state,
      isLoading: false,
      creatingTest: false,
      testLoading: false,
      test: null,
      results: null,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
