import {
  Test,
  Landing,
  Register,
  Error,
  Verify,
  ResetPassword,
  ForgotPassword,
} from "./pages";
import {
  Practice,
  AddQuestion,
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  ProtectedRoute,
} from "./pages/dashboard/index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route element={<Stats />}></Route>
          <Route path="all-jobs" element={<AllJobs />}></Route>
          <Route index path="add-question" element={<AddQuestion />}></Route>
          <Route index path="practice" element={<Practice />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route
          path="randomized-practice"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/user/verify-email" element={<Verify />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
