import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout.js";
import { Navbar, BigSidebar, SmallSidebar } from "../../components/index.js";
import { useAppContext } from "../../context/appContext.js";

const SharedLayout = () => {
  const { user } = useAppContext();
  return (
    <>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
};
export default SharedLayout;
