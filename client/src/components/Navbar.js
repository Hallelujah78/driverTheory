import Wrapper from "../assets/wrappers/Navbar.js";
import { useState, useEffect, useRef } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useAppContext } from "../context/appContext.js";
import Logo from "./Logo.js";

const Navbar = () => {
  const { user, toggleSidebar, logoutUser } = useAppContext();
  const buttonContainerRef = useRef();

  const [toggleLogout, setToggleLogout] = useState(false);

  useEffect(() => {
    let handler = (e) => {
      if (!buttonContainerRef.current.contains(e.target)) {
        setToggleLogout(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => {
      document.removeEventListener("pointerdown", handler);
    };
  });

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={() => toggleSidebar()}>
          <FaAlignLeft />
        </button>

        <Logo />
        <h3 className="logo-text">dashboard</h3>
        <div className="btn-container" ref={buttonContainerRef}>
          <button
            className="toggle-logout-btn btn"
            onClick={() => {
              setToggleLogout(!toggleLogout);
            }}
          >
            <FaUserCircle />
            {user && user?.name}
            <FaCaretDown />
          </button>
          <div className={toggleLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn logout-user"
              onClick={logoutUser}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
