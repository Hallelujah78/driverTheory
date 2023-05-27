import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext.js";
import Wrapper from "../assets/wrappers/SearchContainer.js";
import { useState, useMemo } from "react";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const {
    isLoading,
    handleChange,
    searchType,
    searchStatus,
    sortOptions,
    sort,
    statusOptions,
    jobTypeOptions,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    clearFilters();
  };

  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId); // clears previous timeout
      timeoutId = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 750);
    };
  };

  const optimizedDebounce = useMemo(
    () => debounce(),
    // eslint-disable-next-line
    []
  );

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          {/* search by status */}
          <FormRowSelect
            labelText="job status"
            list={["all", ...statusOptions]}
            value={searchStatus}
            name="searchStatus"
            handleChange={handleSearch}
          />

          {/* search by type  */}
          <FormRowSelect
            labelText="job type"
            list={["all", ...jobTypeOptions]}
            value={searchType}
            name="searchType"
            handleChange={handleSearch}
          />

          {/* sort  */}
          <FormRowSelect
            list={sortOptions}
            value={sort}
            name="sort"
            handleChange={handleSearch}
          />

          <button
            type="button "
            onClick={handleSubmit}
            className="btn btn-block btn-danger"
            disabled={isLoading}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
