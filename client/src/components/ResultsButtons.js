import { NavLink, Link } from "react-router-dom";
import { TbList, TbBrowser, TbCategory } from "react-icons/tb";

const ResultsButtons = () => {
  return (
    <>
      <div>
        <Link to="/practice-test" className="link">
          <TbBrowser className="nav-btn" />
          <p>questions</p>
        </Link>
      </div>
      <div>
        <NavLink
          end
          to="/results/question-list"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <TbList className="nav-btn" />
          <p>question list</p>
        </NavLink>
      </div>

      <div>
        <NavLink
          end
          to="/results"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <TbCategory className="nav-btn" />
          <p>categories</p>
        </NavLink>
      </div>
    </>
  );
};
export default ResultsButtons;
