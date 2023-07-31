import { useState } from "react";
import { FormRow, Alert } from "../../components/index.js";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext.js";

const Profile = () => {
  const { user, updateUser, isLoading, notifyWarning } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      notifyWarning("please provide all values");

      return;
    }
    updateUser({ name, email });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>

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
            labelText="email"
            type="text"
            name="email"
            value={email}
            handleChange={(e) => {
              setEmail(e.target.value);
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
