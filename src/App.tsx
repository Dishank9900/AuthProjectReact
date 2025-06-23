import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginPage from "./components/LoginPage";
import Verification from "./components/Verification";
import Fail from "./components/Fail";
import Success from "./components/Success";
import { PrivateRoute } from "./PrivateRoute";
import AnimatedLayout from "./components/AnimatedLayout";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route element={<AnimatedLayout />}>
          <Route path='/' element={<LoginPage />} />
          <Route path='/verify' element={<Verification />} />
        </Route>

        <Route path='/fail' element={<Fail />} />
        {/* <Route
          path='/success'
          element={
            <PrivateRoute>
              <Success />
            </PrivateRoute>
          }
        /> */}
        <Route path='/success' element={<Success />}></Route>
      </Routes>
    </>
  );
};

export default App;
