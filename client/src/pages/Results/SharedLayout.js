import { Outlet } from "react-router-dom";
// import Wrapper from "../../assets/wrappers/SharedLayout.js";
import TestNav from "../../components/Test/TestNav.js";
import TestFooter from "../../components/Test/TestFooter.js";
import { useAppContext } from "../../context/appContext.js";

const ResultsSharedLayout = () => {
  const { user } = useAppContext();
  return (
    <div className="full-page">
      <TestNav />
      <Outlet />
      <TestFooter />
    </div>
  );
};
export default ResultsSharedLayout;
