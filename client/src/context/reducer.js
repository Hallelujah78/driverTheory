import { initialState } from "./appContext.js";
import {
  TOGGLE_IS_FLAGGED,
  SET_TEST_COMPLETE,
  GET_TEST_BEGIN,
  GET_TEST_SUCCESS,
  GET_TEST_ERROR,
  SELECT_ANSWER,
  SUBMIT_ANSWER,
  EXIT_TEST,
  SET_MODAL_STATE,
  INCREMENT_QUESTION,
  DECREMENT_QUESTION,
  GET_TEST_QUESTIONS_BEGIN,
  GET_TEST_QUESTIONS_SUCCESS,
  GET_TEST_QUESTIONS_ERROR,
  SET_USER_NULL,
  SET_USER_LOADING,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  CHANGE_PAGE,
  CLEAR_FILTERS,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  EDIT_JOB_BEGIN,
  EDIT_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  SET_EDIT_JOB,
  CLEAR_VALUES,
  DISPLAY_ALERT,
  CLEAR_ALERT,
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
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_QUESTION_BEGIN,
  CREATE_QUESTION_ERROR,
  CREATE_QUESTION_SUCCESS,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_CURRENT_QUESTION,
  GET_QUESTIONS_READ_BEGIN,
  GET_QUESTIONS_READ_ERROR,
  GET_QUESTIONS_READ_SUCCESS,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: action.payload.alertType,
      alertText: action.payload.msg,
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
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
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
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
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,

      isLoading: false,
      showAlert: true,
      alertText: "Login Successful! Redirecting...",
      alertType: "success",
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
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
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "User profile updated!",
      alertType: "success",
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
  if (action.type === CREATE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New job created",
    };
  }
  if (action.type === GET_JOBS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      numOfPages: action.payload.numOfPages,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
    };
  }
  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { _id, position, company, location, type, status } = job;

    return {
      ...state,
      editJobId: _id,
      isEditing: true,
      position,
      company,
      jobLocation: location,
      jobType: type,
      status,
    };
  }
  if (action.type === DELETE_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === DELETE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertText: action.payload.msg,
      alertType: "danger",
      showAlert: true,
    };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertText: "Job updated!",
      alertType: "success",
      showAlert: true,
    };
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,

      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      userLoading: true,
      showAlert: false,
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
      showAlert: true,
      alertType: "success",
      alertText: "New question created",
    };
  }
  if (action.type === CREATE_QUESTION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_TEST_QUESTIONS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      creatingTest: true,
      testLoading: true,
      test: null,
      results: null,
      isComplete: false,
    };
  }
  if (action.type === GET_TEST_QUESTIONS_SUCCESS) {
    return {
      ...state,
      test: action.payload.test,
      isLoading: false,
      testLoading: false,
      creatingTest: false,
    };
  }
  if (action.type === GET_TEST_QUESTIONS_ERROR) {
    return {
      ...state,
      test: null,
      isLoading: false,
      alertText: action.payload.msg,
      alertType: "danger",
      showAlert: true,
      creatingTest: false,
      testLoading: false,
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
  if (action.type === SET_TEST_COMPLETE) {
    return {
      ...state,
      isComplete: true,
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
      //  creatingTest: true,
      //  testLoading: true,
      test: null,
      results: null,
      //  isComplete: false,
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
