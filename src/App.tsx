import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { Loader } from "@components/loader/Loader";
/**
 * Composant principal de l'application qui configure le routage.
 * Utilisation de React Router pour gérer la navigation entre les pages.
 * Les composants sont chargés de manière asynchrone.
 */
function App() {
  const Home = lazy(() => import("./pages/home"));
  const Employees = lazy(() => import("./pages/employees"));
  const NotFound = lazy(() => import("./pages/not-found"));
  return (
    <>
      <Suspense fallback={<Loader/>}>
          <Routes>
            <Route index element={<Home/>}></Route>
            <Route path="/employees" element={<Employees/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
      </Suspense>
    </>
  );
}

export default App;
