import { Route, Routes } from "react-router";
import "./styles/App.css";
import { lazy, Suspense } from "react";
/**
 * Composant principal de l'application qui configure le routage.
 * Utilisation de React Router pour gérer la navigation entre les pages.
 * Les composants sont chargés de manière asynchrone.
 */
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
