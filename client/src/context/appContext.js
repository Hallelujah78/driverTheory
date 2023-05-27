import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
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
  CLEAR_VALUES,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SET_EDIT_JOB,
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
  GET_JOBS_SUCCESS,
  GET_JOBS_BEGIN,
} from "./actions";

const initialState = {
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
  userLocation: "",
  jobLocation: "",
  showSidebar: false,
  // job related
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
  // get all jobs
  jobs: [],
  totalJobs: 0,
  page: 1,
  numOfPages: 1,
  // stats
  stats: {},
  monthlyApplications: [],
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
      const {
        user,
        user: { location },
      } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
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

  const createJob = async () => {
    dispatch({
      type: CREATE_JOB_BEGIN,
    });
    try {
      const { position, status, company, jobLocation, jobType } = state;
      await authFetch.post("/jobs", {
        position,
        status,
        company,
        jobLocation,
        jobType,
      });

      dispatch({
        type: CREATE_JOB_SUCCESS,
      });

      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: CREATE_JOB_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }

    clearAlert();
  };

  const getJobs = async () => {
    // search, searchType, searchStatus, sort
    const { search, searchType, searchStatus, sort, page } = state;
    let url = `/jobs?sort=${sort}&type=${searchType}&status=${searchStatus}&page=${page}`;

    if (search.length > 0) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (error) {
      console.log("GET_JOBS_ERROR");
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({
      type: SET_EDIT_JOB,
      payload: { id },
    });
  };

  const editJob = async () => {
    // very similar to add job or create job
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, status, jobType, editJobId } =
        state;

      await authFetch.patch(`/jobs/${editJobId}`, {
        position,
        company,
        location: jobLocation,
        status,
        type: jobType,
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

  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${id}`);
      getJobs();
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
      const { data } = await authFetch.get("/jobs/stats");
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
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
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
