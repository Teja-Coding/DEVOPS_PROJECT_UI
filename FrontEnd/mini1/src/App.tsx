import React from "react";
//Bootstrap Properties
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import CreatePlan from "./Modules/Dynamic/Admin-1_mini_1/Components/Create_Plan/CreatePlan";
import ViewPlan from "./Modules/Dynamic/Admin-1_mini_1/Components/View_Plan/ViewPlan";
import UpdatePlan from "./Modules/Dynamic/Admin-1_mini_1/Components/Update_Plan/UpadtePlan";
import DeletePlan from "./Modules/Dynamic/Admin-1_mini_1/Components/Delete-Plan/DeletePlan";

import CreateCitizen from "./Modules/Dynamic/Appilcation_Registrtion/components/create/CreateCitizen";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reports from "./Modules/Dynamic/Reports-mini_2/Components/Reports/Reports";
import Home from "./Modules/Static/Home/Home";
import DashBoard from "./Modules/Static/DashBoard/Dashboard";
import ViewAccounts from "./Modules/Dynamic/Admin-2_mini_3/Components/ViewAccounts/ViewAccounts";
import NotFound404 from "./Modules/Utils/404/404Pages/NotFound404";
import Registration from "./Modules/Dynamic/Admin-2_mini_3/Components/Registration/Registration";
import Login from "./Modules/Dynamic/Admin-2_mini_3/Components/Login/Login";
import ActiveAccount from "./Modules/Dynamic/Admin-2_mini_3/Components/ActiveAccount/ActiveAccount";
import ForgotPassword from "./Modules/Dynamic/Admin-2_mini_3/Components/ForgotPassword/ForgotPassword";
import UpdateAccount from "./Modules/Dynamic/Admin-2_mini_3/Components/UpdateAccount/UpdateAccount";
import Active from "./Modules/Dynamic/Admin-1_mini_1/Components/Active_Plan/Active";
import DeleteAccount from "./Modules/Dynamic/Admin-2_mini_3/Components/Delete/Delete";
import ActiveSwitch from "./Modules/Dynamic/Admin-2_mini_3/Components/ActiveSwitch/ActiveSwitch";
import { ToastContainer } from "react-toastify";
import CreateCase from "./Modules/Dynamic/DC-Module_mini_5/Components/Create Case/CreateCase";
import EducationalDetails from "./Modules/Dynamic/DC-Module_mini_5/Components/Educational Details/EducationalDetails";
import IncomeDetails from "./Modules/Dynamic/DC-Module_mini_5/Components/Income Details/IncomeDetails";
import KidsDetails from "./Modules/Dynamic/DC-Module_mini_5/Components/Kids Details/KidsDetails";
import PlanSelection from "./Modules/Dynamic/DC-Module_mini_5/Components/Plan Selection/PlanSelection";
import SummaryScreen from "./Modules/Dynamic/DC-Module_mini_5/Components/Summary Screen/SummaryScreen";
import ViewCitizen from "./Modules/Dynamic/Appilcation_Registrtion/components/View/View";
import UpdateCitizen from "./Modules/Dynamic/Appilcation_Registrtion/components/update/Update";
import DeleteCitizen from "./Modules/Dynamic/Appilcation_Registrtion/components/delete/Delete";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      {/* ----------------------------------------------------------------- */}
      <BrowserRouter>
        <Routes>
          {/* ------------------- mini-1 ------------------------ */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/create" element={<CreatePlan />}></Route>
          <Route path="/view" element={<ViewPlan />}></Route>
          <Route path="/update/:planId" element={<UpdatePlan />}></Route>
          <Route path="/delete/:planId" element={<DeletePlan />}></Route>
          <Route path="/active/:planId/:value" element={<Active />}></Route>

          {/* --------------- Reports (mini-2) ---------------------- */}
          <Route path="/reports" element={<Reports />}></Route>

          {/* ---------------- Mini-3 ------------------------ */}
          <Route path="/viewAccounts" element={<ViewAccounts />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/activeAccount" element={<ActiveAccount />}></Route>
          <Route
            path="/activeSwitch/:userId/:currentStatus"
            element={<ActiveSwitch />}
          ></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
          <Route
            path="/updateAccount/:userId"
            element={<UpdateAccount />}
          ></Route>
          <Route
            path="/deleteAccount/:userId"
            element={<DeleteAccount />}
          ></Route>
          {/* ------------------- mini-4--------------- */}
          <Route path="/createApplication" element={<CreateCitizen />} />
          <Route path="/updateCitizen/:appId" element={<UpdateCitizen />} />
          <Route path="/deleteCitizen/:appId" element={<DeleteCitizen />} />
          <Route path="/viewCitizen" element={<ViewCitizen />} />

          {/* ------------------- mini-5--------------- */}
          <Route path="/createCase" element={<CreateCase />} />
          <Route path="/educationalDetails" element={<EducationalDetails />} />
          <Route path="/incomeDetails" element={<IncomeDetails />} />
          <Route path="/kidsDetails" element={<KidsDetails />} />
          <Route path="/planSelection" element={<PlanSelection />} />
          {/* <Route path="/sidebar" element={<Sidebar />} /> */}
          <Route path="/summaryScreen" element={<SummaryScreen />} />

          {/* ----------- extra ----------------------- */}
          <Route path="*" element={<NotFound404 />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
