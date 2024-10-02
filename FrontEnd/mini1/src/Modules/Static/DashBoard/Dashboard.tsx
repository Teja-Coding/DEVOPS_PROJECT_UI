import React from "react";

import { Link } from "react-router-dom";
import NavBar from "../../Utils/NavBar/NavBar";

const DashBoard: React.FC = () => {
  return (
    <>
      <NavBar color="bg-dark" />
      <div className="container mb-5">
        <div className="row mt-5">
          <div className="col-sm-4">
            <div className="card bg-danger-subtle">
              <div className="card-header">
                <h1>Create Plan</h1>
              </div>
              <div className="card-body">
                <div className="row px-3">
                  <Link to="/create" className="btn btn-danger ">
                    Click
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card bg-danger-subtle">
              <div className="card-header">
                <h1>View Plan</h1>
              </div>
              <div className="card-body">
                <div className="row px-3">
                  <Link to="/view" className="btn btn-danger ">
                    Click
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-4">
            <div className="card bg-secondary-subtle">
              <div className="card-header">
                <h1>Reports</h1>
              </div>
              <div className="card-body">
                <div className="row px-3">
                  <Link to="/reports" className="btn btn-secondary ">
                    Click
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-4">
            <div className="card bg-warning-subtle">
              <div className="card-header">
                <h1>View Accounts</h1>
              </div>
              <div className="card-body">
                <div className="row px-3">
                  <Link to="/viewAccounts" className="btn btn-warning ">
                    Click
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-4">
            <div className="card bg-success-subtle">
              <div className="card-header">
                <h1>Create Citizens</h1>
              </div>
              <div className="card-body">
                <div className="row px-3">
                  <Link to="/createApplication" className="btn btn-success ">
                    Click
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card bg-success-subtle">
              <div className="card-header">
                <h1>View Citizens</h1>
              </div>
              <div className="card-body">
                <div className="row px-3">
                  <Link to="/viewCitizen" className="btn btn-success ">
                    Click
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row mt-5">
          <div className="col-sm-4">
            <div className="card bg-primary-subtle">
              <div className="card-header">
                <h1>Data Collection</h1>
              </div>
              <div className="card-body">
                <div className="row px-3">
                  <Link to="/createCase" className="btn btn-primary ">
                    Click
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
      </div>
    </>
  );
};

export default DashBoard;
