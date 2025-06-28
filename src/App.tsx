import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginPage from "./components/LoginPage";
import Verification from "./components/Verification";
import Fail from "./components/Fail";
import Success from "./components/Success";
import { PrivateRoute } from "./PrivateRoute";

import Dashboard from "./components/Dashboard";
import CardInfo from "./components/CardInfo";

const App: React.FC = () => {
  return (
    <>
      <div
        style={
          {
            "--color-mycolor": "#14b8a6",
            "--color-mycolor-hover": "#0d9488",
            "--color-mycolor-foreground": "#ffffff",
          } as React.CSSProperties
        }
      >
        <ToastContainer />

        <Routes>
          {/* <Route element={<AnimatedLayout />}> */}
          <Route path='/' element={<LoginPage />} />
          <Route path='/verify' element={<Verification />} />
          <Route
            path='/cardInfo/:id'
            element={
              <PrivateRoute>
                <CardInfo />
              </PrivateRoute>
            }
          />
          <Route
            path='/Dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* </Route> */}

          <Route path='/fail' element={<Fail />} />
          <Route
            path='/success'
            element={
              <PrivateRoute>
                <Success />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
