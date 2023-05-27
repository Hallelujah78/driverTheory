import Wrapper from "../assets/wrappers/Navbar.js";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext.js";
import Logo from "./Logo.js";

const Navbar = () => {
  const { user, toggleSidebar, logoutUser } = useAppContext();
  const [toggleLogout, setToggleLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={() => toggleSidebar()}>
          <FaAlignLeft />
        </button>

        <Logo />
        <h3 className="logo-text">dashboard</h3>
        <div className="btn-container">
          <button
            className="btn"
            onClick={() => setToggleLogout(!toggleLogout)}
          >
            <FaUserCircle />
            {user && user?.name}
            <FaCaretDown />
          </button>
          <div className={toggleLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
