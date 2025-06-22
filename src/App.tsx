import { Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";

import LoginPage from "./components/LoginPage";
import Verification from "./components/Verification";
import Fail from "./components/Fail";
import { PrivateRoute } from "./PrivateRoute";
import Success from "./components/Success";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/verify' element={<Verification />} />
        <Route path='/fail' element={<Fail />}></Route>
        <Route
          path='/success'
          element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
