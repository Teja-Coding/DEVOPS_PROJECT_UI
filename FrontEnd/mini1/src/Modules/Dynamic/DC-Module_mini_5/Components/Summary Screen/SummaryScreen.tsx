import React from "react";
import NavBar from "../../../../Utils/NavBar/NavBar";
import Sidebar from "../SideBar/Sidebar";

const SummaryScreen: React.FC = () => {
  return (
    <>
      <div className="AppClass">
        <NavBar color="bg-dark" />
        <div className="container-fluid">
          <div className="row">
            <nav className="col-sm-3 d-none d-md-block bg-transparent border-0 sidebar">
              <Sidebar button={"SummaryScreen"} />
            </nav>
            <main className="col-sm-9 ms-sm-auto  px-md-4">
              {/* =============================== */}
              <div className="container mt-5">
                <div className="row">
                  <div className="col">
                    <div className="card bg-dark">
                      <div className="card-body">
                        <p className="h1 text-light">Summary Screen</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col">
                    <div className="card bg-dark">
                      <div className="card-body ">
                        <table className="table table-hover table-striped text-center">
                          <thead>
                            <tr className="table-dark">
                              <td>SNo</td>
                              <td>Case Number</td>
                              <td>Monthly Salary Income</td>
                              <td>Rest Income</td>
                              <td>Property Income</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-secondary">
                              <td>1</td>
                              <td>alex</td>
                              <td>1212</td>
                              <td>12121</td>
                              <td>21212</td>
                            </tr>
                          </tbody>
                        </table>
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
    </>
  );
};

export default SummaryScreen;
