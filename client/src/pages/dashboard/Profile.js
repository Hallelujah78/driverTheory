import { useState } from "react";
import { FormRow, Alert } from "../../components/index.js";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext.js";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !lastName || !location) {
      displayAlert();

      return;
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        {/* name */}
        <div className="form-center">
          <FormRow
            labelText="name"
            type="text"
            name="name"
            value={name}
            handleChange={(e) => {
              setName(e.target.value);
            }}
          />
          <FormRow
            labelText="last name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <FormRow
            labelText="email"
            type="text"
            name="email"
            value={email}
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormRow
            labelText="location"
            type="text"
            name="location"
            value={location}
            handleChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <button disabled={isLoading} type="submit" className="btn btn-block">
            {isLoading ? "Please wait..." : "Save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
