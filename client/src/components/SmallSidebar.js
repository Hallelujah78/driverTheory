import Wrapper from "../assets/wrappers/SmallSidebar.js";

import Logo from "./Logo.js";
import { FaTimes } from "react-icons/fa";
import NavLinks from "./NavLinks.js";
import { useAppContext } from "../context/appContext.js";

const SmallSidebar = () => {
  const { toggleSidebar, showSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button onClick={toggleSidebar} className="close-btn">
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
