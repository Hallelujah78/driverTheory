import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout.js";
import { Navbar, BigSidebar, SmallSidebar } from "../../components/index.js";

const SharedLayout = () => {
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
