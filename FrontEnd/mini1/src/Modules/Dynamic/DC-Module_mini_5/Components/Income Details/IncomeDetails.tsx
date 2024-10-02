import React from "react";
import NavBar from "../../../../Utils/NavBar/NavBar";
import Sidebar from "../SideBar/Sidebar";

const IncomeDetails: React.FC = () => {
  return (
    <div className="AppClass">
      <NavBar color="bg-dark" />
      <div className="container-fluid">
        <div className="row">
          <nav className="col-sm-3 d-none d-md-block bg-transparent border-0 sidebar">
            <Sidebar button={"IncomeDetails"} />
          </nav>
          <main className="col-sm-9 ms-sm-auto  px-md-4">
            {/* =============================== */}
            <div className="container mt-5">
              <div className="row">
                <div className="col">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <p className="h1 text-light">Income Details</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col">
                  <div className="card bg-dark shadow-lg">
                    <div className="card-body">
                      <form className="p-3">
                        <div className="mb-4">
                          <label
                            className="form-label text-light mb-3"
                            htmlFor="AppInput"
                          >
                            Case Number
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Case Number"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <div className="row">
                            <div className="col-sm-6">
                              <label
                                className="form-label text-light mb-3"
                                htmlFor="AppInput"
                              >
                                Monthly Salary Income
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Salary Income"
                                required
                              />
                            </div>
                            <div className="col-sm-6">
                              <label
                                className="form-label text-light mb-3"
                                htmlFor="AppInput"
                              >
                                Rent Income
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter Rent Income"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label
                            className="form-label text-light mb-3"
                            htmlFor="AppInput"
                          >
                            Property Income
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Property Income"
                            required
                          />
                        </div>
                        <input className="btn btn-danger mt-4" type="submit" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =============================== */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default IncomeDetails;
