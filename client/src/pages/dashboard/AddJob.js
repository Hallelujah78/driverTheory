import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, Alert, FormRowSelect } from "../../components/index.js";

const AddJob = () => {
  const {
    user,
    showAlert,
    displayAlert,
    updateUser,
    isLoading,
    isEditing,
    editJobId,
    position,
    company,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    jobLocation,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"} </h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* position */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobChange}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobChange}
          />
          {/* location */}
          <FormRow
            labelText="job location"
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobChange}
          />
          {/* this is my code here for the FormRowSelect - may not be correct */}
          {/* job type */}
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={jobTypeOptions}
            value={jobType}
            handleChange={handleJobChange}
          />
          {/* job status */}
          <FormRowSelect
            name="status"
            list={statusOptions}
            value={status}
            handleChange={handleJobChange}
          />
          <div className="btn-container">
            <button
              disabled={isLoading}
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              submit
            </button>
            <button
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
              className="btn btn-block clear-btn"
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
