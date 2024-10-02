import React, { useEffect, useState } from "react";
import "./ViewPlan.css";
import { PlanService } from "../../Services/Services";
import { IPlan } from "../../Models/IPlan";
import { Link } from "react-router-dom";
import { ICategory } from "../../Models/ICategory";
import NavBar from "../../../../Utils/NavBar/NavBar";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";

interface IState {
  planData: IPlan[];
  catData: ICategory[];
  error: string;
  loader: boolean;
}

const ViewPlan: React.FC = () => {
  // ---------------------------------
  const [state, setState] = useState<IState>({
    planData: [] as IPlan[],
    catData: [] as ICategory[],
    error: "",
    loader: false,
  });

  useEffect(() => {
    setState({
      ...state,
      loader: true,
    });
    Promise.all([PlanService.getAllPlans(), PlanService.getAllCategorys()])
      .then(([plansResponse, catResponse]) => {
        setState({
          ...state,
          planData: plansResponse.data,
          catData: catResponse.data,
          loader: false,
        });
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.message,
          loader: false,
        });
      });
  }, []);

  // =====================================
  const { planData, catData, error, loader } = state;

  return (
    <>
      {loader == true && <Loader />}
      {error.length > 0 ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          {" "}
          <NavBar color="bg-dark" btn="dashboard" />
          <div className="container">
            <div className="row mt-5 ">
              <div className="col-sm-12">
                <div className="card bg-success shadow-lg">
                  <div className="card-body">
                    <div className="h1 text-white">View Plans</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12">
                {planData.length > 0 ? (
                  <table className="table table-striped table-hover shadow-lg">
                    <thead className="table-success">
                      <tr>
                        <th>S.NO</th>
                        <th>Plan Name</th>
                        <th>Plan Start Date</th>
                        <th>Plan End Date</th>
                        <th>Plan Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planData.map((plan, index) => {
                        return (
                          <tr key={index}>
                            <td>{plan.planId}</td>
                            <td>{plan.planName}</td>
                            <td>{plan.planStartDate}</td>
                            <td>{plan.planEndDate}</td>
                            {/* ---------------------- */}

                            <td>
                              {catData.map((value) => {
                                if (value.categoryId == plan.categoryId) {
                                  return value.categoryName;
                                }
                              })}
                            </td>
                            {/* ---------------------- */}
                            <td>
                              <Link
                                to={`/update/${plan.planId}`}
                                className="btn btn-primary"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/delete/${plan.planId}`}
                                className="btn btn-danger "
                              >
                                <i className="bi bi-trash3-fill"></i>
                              </Link>
                            </td>
                            {/* -------------------------------- */}
                            <td>
                              {plan.activeSwitch == null && (
                                <Link
                                  to={`/active/${plan.planId}/${plan.activeSwitch}`}
                                  className={`btn btn-secondary`}
                                >
                                  <i className={`bi-circle`}></i>
                                </Link>
                              )}
                              {plan.activeSwitch == "Y" && (
                                <Link
                                  to={`/active/${plan.planId}/${plan.activeSwitch}`}
                                  className={`btn btn-danger`}
                                >
                                  <i className={`bi bi-x-lg`}></i>
                                </Link>
                              )}
                              {plan.activeSwitch == "N" && (
                                <Link
                                  to={`/active/${plan.planId}/${plan.activeSwitch}`}
                                  className={`btn btn-success`}
                                >
                                  <i className={`bi-check2`}></i>
                                </Link>
                              )}
                            </td>
                            {/* --------------------------------------- */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <>
                    <div className="container">
                      <div className="row">
                        <div className="card bg-success-subtle">
                          <div className="card-body">
                            <h1>You don't Have any Plans</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <Link to={`/dashboard`} className="btn btn-dark mt-4 ms-1">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ViewPlan;
