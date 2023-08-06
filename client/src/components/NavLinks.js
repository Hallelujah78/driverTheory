import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useAppContext } from "../context/appContext";

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useAppContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { role } = user;
        if (role !== "admin" && link.adminOnly) {
          return null;
        }
        return (
          <NavLink
            onClick={toggleSidebar}
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{link.icon}</span>
            {link.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
