import React, { useEffect, useState } from "react";
import NavBar from "../../../../Utils/NavBar/NavBar";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import { IViewData } from "../../models/IViewData";
import { ArServices } from "../../services/ArServices";
import { Link } from "react-router-dom";

interface IState {
  citizen: IViewData[];
  error: string;
  loader: boolean;
}

const ViewCitizen: React.FC = () => {
  // ---------------------------------
  const [state, setState] = useState<IState>({
    citizen: [] as IViewData[],
    error: "",
    loader: false,
  });

  useEffect(() => {
    setState({
      ...state,
      loader: true,
    });
    ArServices.getAllCitizen()
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loader: false,
            citizen: response.data,
          });
          console.log(response);
        }
      })
      .catch((error) => {
        setState({
          ...state,
          loader: false,
          error: error.message,
        });
        console.log(error);
      });
  }, []);

  // =====================================
  const { citizen, error, loader } = state;

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
                {citizen.length > 0 ? (
                  <table className="table table-striped table-hover shadow-lg">
                    <thead className="table-success">
                      <tr>
                        <th>AppID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>SSN</th>
                        <th>Gender</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {citizen.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.appId}</td>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.ssn}</td>
                            <td>{item.gender}</td>

                            <td>
                              <Link
                                to={`/updateCitizen/${item.appId}`}
                                className="btn btn-primary"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/deleteCitizen/${item.appId}`}
                                className="btn btn-danger "
                              >
                                <i className="bi bi-trash3-fill"></i>
                              </Link>
                            </td>
                            {/* -------------------------------- */}
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
                            <h1>You don't Have any items</h1>
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
export default ViewCitizen;
