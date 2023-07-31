import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

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
  SET_USER_NULL,
  SET_USER_LOADING,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  CHANGE_PAGE,
  CLEAR_FILTERS,
  CLEAR_VALUES,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  HANDLE_CHANGE,
  CREATE_QUESTION_BEGIN,
  CREATE_QUESTION_ERROR,
  CREATE_QUESTION_SUCCESS,
  CREATE_TEST_BEGIN,
  CREATE_TEST_SUCCESS,
  CREATE_TEST_ERROR,
  SET_CURRENT_QUESTION,
  GET_QUESTIONS_READ_BEGIN,
  GET_QUESTIONS_READ_ERROR,
  GET_QUESTIONS_READ_SUCCESS,
} from "./actions";

const initialState = {
  results: null,
  creatingTest: false,
  isComplete: false,
  testLoading: true,
  modalAlert: false,
  currentQuestion: 0,
  currentSelection: null,
  test: null,
  isError: false,
  pathName: "",
  isRegistered: false,
  userLoading: true,
  isLoading: false,
  user: null,
  showSidebar: false,
  isEditing: false,
  //question related
  editQuestionId: "",
  questionCategoryOptions: [
    "control of vehicle",
    "legal matters/rules of the road",
    "managing risk",
    "safe and socially responsible driving",
    "technical matters",
  ],
  questionCategory: "control of vehicle",
  correctAnswer: "",
  answerTwo: "",
  answerThree: "",
  answerFour: "",
  questionText: "",
  imageURL: "",
  // get all questions
  questions: [],
  totalQuestions: 0,
  page: 1,
  numOfPages: 1,
  // search functionality
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  createdAt: null,
  testTitle: "",
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios custom instance
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // axios response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response.status;
      if (!error.response) {
        setUserNull();
        setUserLoadingFalse();
        return Promise.reject(error);
      }

      if (status === 401 && !state.user) {
        setUserLoadingFalse();
        return Promise.reject(error);
      }

      if (status === 401 && state.user) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const notifySuccess = (message) => toast.success(message);
  const notifyWarning = (message) => toast.warning(message);

  const setUserLoadingFalse = () => {
    dispatch({ type: SET_USER_LOADING });
  };

  const setUserNull = () => {
    dispatch({ type: SET_USER_NULL });
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/register", currentUser);

      dispatch({
        type: REGISTER_USER_SUCCESS,
      });
      notifySuccess("Success! Please check email to verify your account.");
    } catch (error) {
      notifyWarning(error.response.data.msg);
      dispatch({
        type: REGISTER_USER_ERROR,
      });
    }
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);

      const { user } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user },
      });
      notifySuccess("Login successful, redirecting ...");
    } catch (error) {
      notifyWarning(error.response.data.msg);
      dispatch({
        type: LOGIN_USER_ERROR,
      });
    }
  };

  const toggleSidebar = () => {
    dispatch({
      type: TOGGLE_SIDEBAR,
    });
  };

  const logoutUser = async () => {
    dispatch({
      type: LOGOUT_USER,
    });
    try {
      await authFetch.delete("/auth/logoutUser");
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateUser = async (currentUser) => {
    dispatch({
      type: UPDATE_USER_BEGIN,
    });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        notifyWarning(error.response.data.msg);
        dispatch({
          type: UPDATE_USER_ERROR,
        });
      }
    }
  };

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };

  // start of create question
  const createQuestion = async () => {
    dispatch({
      type: CREATE_QUESTION_BEGIN,
    });
    try {
      const {
        questionCategory,
        questionText,
        correctAnswer,
        answerTwo,
        answerThree,
        answerFour,
        imageURL,
      } = state;
      const answers = [
        { answer: correctAnswer, isCorrect: true },
        { answer: answerTwo, isCorrect: false },
        { answer: answerThree, isCorrect: false },
        { answer: answerFour, isCorrect: false },
      ];
      await authFetch.post("/questions", {
        questionText,
        answers,
        imageURL,
        questionCategory,
      });

      dispatch({
        type: CREATE_QUESTION_SUCCESS,
      });

      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status !== 401) {
        notifyWarning(error.response.data.msg);
        dispatch({
          type: CREATE_QUESTION_ERROR,
        });
      }
    }
  };
  // end of create question

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch("/auth/getCurrentUser");

      const {
        user,
        user: { location },
      } = data;
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user, location } });
    } catch (error) {
      console.log("GET_CURRENT_USER_ERROR");
      console.log(error.response);
      if (error.response.status === 401) return;
    }
  };

  const createNewTest = async (
    testCategory,
    questionCategory = null,
    numTestQuestions
  ) => {
    dispatch({ type: CREATE_TEST_BEGIN });

    try {
      const { data } = await authFetch.post("/test", {
        testCategory,
        questionCategory,
        numTestQuestions,
      });

      const test = data.test.questions;
      const createdAt = moment(data.test.createdAt).valueOf();
      const testTitle = data.test.category;

      dispatch({
        type: CREATE_TEST_SUCCESS,
        payload: { test, createdAt, testTitle },
      });
    } catch (error) {
      console.log("CREATE_TEST_ERROR");
      notifyWarning(error.response?.data.msg);
      dispatch({
        type: CREATE_TEST_ERROR,
      });
    }
  };

  const setTestComplete = async () => {
    const isComplete = true;
    dispatch({
      type: SET_TEST_COMPLETE_BEGIN,
    });
    try {
      const { data } = await authFetch.patch("/test", { isComplete });

      dispatch({
        type: SET_TEST_COMPLETE_SUCCESS,
        payload: {
          test: data.test.questions,
          isComplete: data.test.isComplete,
          results: data?.results,
          createdAt: data.test.createdAt,
        },
      });
    } catch (error) {
      console.log("SET_TEST_COMPLETE_ERROR");
      console.log(error.response.data.msg);
    }
  };

  const getTest = async (testId = null) => {
    let URL = "/test";
    if (testId) {
      URL = `/test/previous-results/${testId}`;
    }
    dispatch({ type: GET_TEST_BEGIN });
    try {
      const { data } = await authFetch.get(URL);
      dispatch({
        type: GET_TEST_SUCCESS,
        payload: {
          test: data.test.questions,
          isComplete: data.test.isComplete,
          results: data?.results,
          createdAt: data.test.createdAt,
          testTitle: data.test.category,
        },
      });
    } catch (error) {
      console.log("GET_TEST_ERROR");
      if (error.response.status !== 401) {
        notifyWarning(error.response?.data.msg);
        console.log(error.response.data.msg);
        dispatch({
          type: GET_TEST_ERROR,
        });
      }
    }
  };

  const incrementQuestion = () => {
    if (state.currentQuestion === state.test.length - 1) {
      return;
    }
    dispatch({
      type: INCREMENT_QUESTION,
    });
  };
  const decrementQuestion = () => {
    dispatch({
      type: DECREMENT_QUESTION,
    });
  };
  const setModalState = () => {
    dispatch({
      type: SET_MODAL_STATE,
    });
  };
  const exitTest = async () => {
    // get and delete all incomplete tests associated with user
    try {
      await authFetch.delete("/test");
    } catch (error) {
      console.log(error);
      console.log("EXIT_TEST_ERROR");
    }

    dispatch({
      type: EXIT_TEST,
    });
  };

  const submitAnswer = async (index, currentQuestion) => {
    const questionId = state.test[state.currentQuestion]._id;

    const newTest = [...state.test];
    newTest[currentQuestion].userAnswer = index;

    if (newTest[currentQuestion].question.answers[index].isCorrect) {
      newTest[currentQuestion].isCorrect = true;
    }
    dispatch({
      type: SUBMIT_ANSWER,
      payload: { test: newTest },
    });

    try {
      const { data } = await authFetch.patch("/test", {
        questionId,
        index,
        currentQuestion,
      });

      dispatch({
        type: SUBMIT_ANSWER,
        payload: {
          test: data.test.questions,
          isComplete: data.test.isComplete,
          results: data.results ? data.results : null,
        },
      });
    } catch (error) {
      console.log(error);
      console.log("SUBMIT_ANSWER_ERROR");
    }
  };

  const selectAnswer = (index) => {
    const newTest = [...state.test];
    newTest[state.currentQuestion].selected = index;
    dispatch({
      type: SELECT_ANSWER,
      payload: { newTest },
    });
  };

  const toggleIsFlagged = async (questionId, testId = null) => {
    // we update the context
    state.test[state.currentQuestion].isFlagged =
      !state.test[state.currentQuestion].isFlagged;
    dispatch({ type: TOGGLE_IS_FLAGGED });
    // then we update the test and the UserQuestionData on the backend
    try {
      const { data } = await authFetch.patch("/test/flagged", {
        questionId,
        testId,
      });
      dispatch({ type: TOGGLE_IS_FLAGGED });
    } catch (error) {
      console.log("TOGGLE_IS_FLAGGED_ERROR");
      console.log(error.response.data.msg);
    }
  };

  const setCurrentQuestion = (index) => {
    dispatch({
      type: SET_CURRENT_QUESTION,
      payload: { index },
    });
  };

  const getQuestionsRead = async (category) => {
    dispatch({
      type: GET_QUESTIONS_READ_BEGIN,
    });
    const url = `/questions/read/${category}`;
    try {
      const { data } = await authFetch.get(url);
      const { questions } = data;
      dispatch({
        type: GET_QUESTIONS_READ_SUCCESS,
        payload: { questions },
      });
    } catch (error) {
      notifyWarning(error.response?.data.msg);

      dispatch({
        type: GET_QUESTIONS_READ_ERROR,
      });
      console.log("GET_QUESTION_READ_ERROR");
      console.log(error.response.data.msg);
    }
  };

  useEffect(
    () => {
      getCurrentUser();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <AppContext.Provider
      value={{
        ...state,
        setCurrentQuestion,
        setTestComplete,
        getTest,
        selectAnswer,
        submitAnswer,
        exitTest,
        setModalState,
        incrementQuestion,
        decrementQuestion,

        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createQuestion,

        clearFilters,
        changePage,
        createNewTest,
        toggleIsFlagged,
        authFetch,
        getQuestionsRead,
        notifySuccess,
        notifyWarning,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
