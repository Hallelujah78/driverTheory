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
  Profile,
  SharedLayout,
  Stats,
  ProtectedRoute,
} from "./pages/dashboard/index.js";
import {
  Graphs,
  Overview,
  PreviousTests,
  AggResultsSharedLayout,
} from "./pages/aggregatedResults/index.js";
import Read from "./pages/Practice/Read.js";
import CategoryPractice from "./pages/Practice/CategoryPractice.js";
import { QuestionList, Categories } from "./pages/Results/index.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResultsSharedLayout from "./pages/Results/SharedLayout";
import PracticeSharedLayout from "./pages/Practice/SharedLayout.js";
import OtherPractice from "./pages/Practice/OtherPractice.js";

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
          <Route index element={<Practice />}></Route>
          <Route path="stats" element={<Stats />}></Route>
          <Route path="add-question" element={<AddQuestion />}></Route>

          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route
          path="practice-test"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="results"
          element={
            <ProtectedRoute>
              <ResultsSharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Categories />}></Route>
          <Route path="question-list" element={<QuestionList />}></Route>
        </Route>

        <Route
          path="stats/previous-results/:testId"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="stats"
          element={
            <ProtectedRoute>
              <AggResultsSharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="overview" element={<Overview />}></Route>
          <Route path="graphs" element={<Graphs />}></Route>
          <Route path="previous-results" element={<PreviousTests />}></Route>
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PracticeSharedLayout />
            </ProtectedRoute>
          }
        >
          <Route path="read" element={<Read />}></Route>
          <Route path="read/:category" element={<Test />}></Route>
          <Route path="official-test" element={<Test />}></Route>
          <Route
            path="category-practice"
            element={<CategoryPractice />}
          ></Route>
          <Route path="category-practice/test" element={<Test />}></Route>
          <Route path="least-seen" element={<OtherPractice />}></Route>
          <Route path="/flagged" element={<OtherPractice />}></Route>
          <Route path="/incorrect" element={<OtherPractice />}></Route>
          <Route path="/incorrect/test" element={<Test />}></Route>
          <Route path="/flagged/test" element={<Test />}></Route>
          <Route path="/least-seen/test" element={<Test />}></Route>
        </Route>

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
