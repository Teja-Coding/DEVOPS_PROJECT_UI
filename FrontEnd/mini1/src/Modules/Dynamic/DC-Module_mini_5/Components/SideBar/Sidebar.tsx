// Sidebar.tsx
import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

interface IProps {
  button: string;
}

const Sidebar: React.FC<IProps> = (props) => {
  const [button, setButton] = useState<string>(props.button);

  const handleButtonClick = (buttonName: string) => {
    setButton(buttonName);
  };

  return (
    <div className="sidebar mb-1">
      <h3 className="">DATA COLLECTION</h3>
      <hr />
      <div className="sidebar-section">
        <h4>Create Case</h4>
        <div className="row px-3">
          <Link
            to={"/createCase"}
            onClick={() => handleButtonClick("CreateCase")}
            className={`btn btn-secondary btn-sm ${
              button === "CreateCase" ? "btn-danger" : "btn-secondary"
            }`}
          >
            Click
          </Link>
        </div>
      </div>
      <div className="sidebar-section">
        <h4>Plan Selection</h4>
        <div className="row px-3">
          <Link
            to={"/planSelection"}
            onClick={() => handleButtonClick("PlanSelection")}
            className={`btn btn-secondary btn-sm ${
              button === "PlanSelection" ? "btn-danger" : "btn-secondary"
            }`}
          >
            Click
          </Link>
        </div>
      </div>
      <div className="sidebar-section">
        <h4>Income Details</h4>
        <div className="row px-3">
          <Link
            to={"/incomeDetails"}
            onClick={() => handleButtonClick("IncomeDetails")}
            className={`btn btn-secondary btn-sm ${
              button === "IncomeDetails" ? "btn-danger" : "btn-secondary"
            }`}
          >
            Click
          </Link>
        </div>
      </div>
      <div className="sidebar-section">
        <h4>Educational Details</h4>
        <div className="row px-3">
          <Link
            to={"/educationalDetails"}
            onClick={() => handleButtonClick("EducationalDetails")}
            className={`btn btn-secondary btn-sm ${
              button === "EducationalDetails" ? "btn-danger" : "btn-secondary"
            }`}
          >
            Click
          </Link>
        </div>
      </div>
      <div className="sidebar-section">
        <h4>Kids Details</h4>
        <div className="row px-3">
          <Link
            to={"/kidsDetails"}
            onClick={() => handleButtonClick("KidsDetails")}
            className={`btn btn-secondary btn-sm ${
              button === "KidsDetails" ? "btn-danger" : "btn-secondary"
            }`}
          >
            Click
          </Link>
        </div>
      </div>
      <div className="sidebar-section">
        <h4>Summary Screen</h4>
        <div className="row px-3">
          <Link
            to={"/summaryScreen"}
            onClick={() => handleButtonClick("SummaryScreen")}
            className={`btn btn-secondary btn-sm ${
              button === "SummaryScreen" ? "btn-danger" : "btn-secondary"
            }`}
          >
            Click
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
