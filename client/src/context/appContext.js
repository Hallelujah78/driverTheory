import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";

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
  EDIT_QUESTION_BEGIN,
  EDIT_QUESTION_ERROR,
  EDIT_QUESTION_SUCCESS,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  CLEAR_VALUES,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SET_EDIT_JOB,
  SET_EDIT_QUESTION,
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
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  CREATE_QUESTION_BEGIN,
  CREATE_QUESTION_ERROR,
  CREATE_QUESTION_SUCCESS,
  GET_JOBS_SUCCESS,
  GET_JOBS_BEGIN,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_BEGIN,
  GET_TEST_QUESTIONS_BEGIN,
  GET_TEST_QUESTIONS_SUCCESS,
  GET_TEST_QUESTIONS_ERROR,
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
  // alert
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,

  showSidebar: false,
  // question related
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
  // stats

  // search functionality
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
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
        // backend 401
        // if there is no user
        // setUserLoading to false (default true)
        // no need to logoutUser()
        setUserLoadingFalse();
        return Promise.reject(error);
      }

      if (status === 401 && state.user) {
        // if status 401 and userIsLoading (true)
        // logoutUser
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

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

  const displayAlert = (
    msg = "Please provide all values!",
    clearMsg = true,
    alertType = "danger"
  ) => {
    dispatch({ type: DISPLAY_ALERT, payload: { msg, clearMsg, alertType } });
    if (!clearMsg) return;
    clearAlert();
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/register", currentUser);

      dispatch({
        type: REGISTER_USER_SUCCESS,
      });
      displayAlert(
        "Success! Please check email to verify your account.",
        true,
        "success"
      );
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 5000);
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);

      const {
        user,
        user: { location },
      } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
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
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
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
        dispatch({
          type: CREATE_QUESTION_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }

    clearAlert();
  };
  // end of create question

  const getQuestions = async () => {
    // search, searchType, searchStatus, sort
    const { search, searchType, searchStatus, sort, page } = state;
    let url = `/questions?sort=${sort}&type=${searchType}&status=${searchStatus}&page=${page}`;

    if (search.length > 0) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { questions, totalQuestions, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { questions, totalQuestions, numOfPages },
      });
    } catch (error) {
      console.log("GET_JOBS_ERROR");
    }
    clearAlert();
  };

  const setEditQuestion = (id) => {
    dispatch({
      type: SET_EDIT_JOB,
      payload: { id },
    });
  };

  const editQuestion = async () => {
    // very similar to add question or create question
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const {
        position,
        company,
        questionLocation,
        status,
        questionType,
        editQuestionId,
      } = state;

      await authFetch.patch(`/questions/${editQuestionId}`, {
        position,
        company,
        location: questionLocation,
        status,
        type: questionType,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;

      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteQuestion = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/questions/${id}`);
      getQuestions();
    } catch (error) {
      console.log("DELETE_JOB_ERROR");
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch.get("/questions/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      console.log("SHOW_STATS_ERROR");
    }
    clearAlert();
  };

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

  const createNewTest = async (testCategory, numQuestions) => {
    dispatch({ type: GET_TEST_QUESTIONS_BEGIN });
    try {
      const { data } = await authFetch.post("/test", {
        testCategory,
        numQuestions,
      });

      const test = data.test.questions;

      dispatch({
        type: GET_TEST_QUESTIONS_SUCCESS,
        payload: { test },
      });
    } catch (error) {
      console.log("GET_TEST_QUESTIONS_ERROR");
      dispatch({
        type: GET_TEST_QUESTIONS_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const setTestComplete = () => {
    dispatch({
      type: SET_TEST_COMPLETE,
    });
  };

  const getTest = async () => {
    dispatch({ type: GET_TEST_BEGIN });
    try {
      const { data } = await authFetch.get("/test");
      dispatch({
        type: GET_TEST_SUCCESS,
        payload: {
          test: data.test.questions,
          isComplete: data.test.isComplete,
          results: data.results,
        },
      });
    } catch (error) {
      console.log("GET_TEST_ERROR");
      if (error.response.status !== 401) {
        console.log(error.response.data.msg);
        dispatch({
          type: GET_TEST_ERROR,
        });
      }
    }
    clearAlert();
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
    // update context by submitting answer locally - provides better feedback to user and better user experience
    const newTest = [...state.test];
    newTest[currentQuestion].userAnswer = index;

    if (newTest[currentQuestion].question.answers[index].isCorrect) {
      newTest[currentQuestion].isCorrect = true;
    }
    dispatch({
      type: SUBMIT_ANSWER,
      payload: { test: newTest },
    });
    // now we can update the database and update context again with our response
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

  const toggleIsFlagged = async (questionId) => {
    // we update the context
    state.test[state.currentQuestion].isFlagged =
      !state.test[state.currentQuestion].isFlagged;
    const flag = state.test[state.currentQuestion].isFlagged;

    // then we update the test and the UserQuestionData on the backend
    try {
      const { data } = await authFetch.patch("/test/flagged", {
        questionId,
      });
      dispatch({ type: TOGGLE_IS_FLAGGED });
    } catch (error) {
      console.log("TOGGLE_IS_FLAGGED_ERROR");
      console.log(error);
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
        setTestComplete,
        getTest,
        selectAnswer,
        submitAnswer,
        exitTest,
        setModalState,
        incrementQuestion,
        decrementQuestion,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createQuestion,
        getQuestions,
        setEditQuestion,
        deleteQuestion,
        editQuestion,
        showStats,
        clearFilters,
        changePage,
        createNewTest,
        toggleIsFlagged,
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
