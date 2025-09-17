import { Route, Routes } from "react-router";
import "./styles/App.css";
import { lazy, Suspense } from "react";

function App() {
  const Home = lazy(() => import("./pages/home"));
  const EmployeeList = lazy(() => import("./pages/employees"));
  return (
    <>
      <Suspense fallback="loading">
          <Routes>
            <Route index element={<Home/>}></Route>
            <Route path="/employees" element={<EmployeeList/>}></Route>
          </Routes>
      </Suspense>
    </>
  );
}

export default App;
