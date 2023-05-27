import { useAppContext } from "../context/appContext.js";
import PageBtnContainer from "./PageBtnContainer.js";
import { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job.js";
import Wrapper from "../assets/wrappers/JobsContainer.js";
import Alert from "./Alert.js";
const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchType,
    searchStatus,
    numOfPages,
    sort,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [search, searchType, searchStatus, search, sort, page]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"}
      </h5>
      {showAlert && <Alert />}
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
