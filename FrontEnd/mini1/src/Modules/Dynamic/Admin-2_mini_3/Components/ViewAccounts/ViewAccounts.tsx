import React, { useEffect, useState } from "react";
import NavBar from "../../../../Utils/NavBar/NavBar";
import { Link } from "react-router-dom";
import { IUSerMaster } from "../../Models/IUserMaster";
import { UserManagementService } from "../../Services/UserManagmentServices";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import Loader from "../../../../Utils/Loders/Loader";

interface IState {
  accountData: IUSerMaster[];
  error: string;
  loading: boolean;
}

const ViewAccounts: React.FC = () => {
  const [state, setState] = useState<IState>({
    accountData: [] as IUSerMaster[],
    error: "",
    loading: false,
  });
  const { loading, error } = state;
  useEffect(() => {
    setState({
      ...state,
      loading: true,
    });
    UserManagementService.getAllUsers()
      .then((response) => {
        setState({
          ...state,
          accountData: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setState({
          ...state,
          error: `Error fetching data: ${error}`,
          loading: false,
        });
      });
  }, []);

  const { accountData } = state;
  return (
    <>
      {loading == true && <Loader />}
      {error.length > 0 ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <NavBar color="bg-dark" btn="dashboard" />
          <div className="container">
            <div className="row mt-5 ">
              <div className="col-sm-12">
                <div className="card bg-dark shadow-lg">
                  <div className="card-body">
                    <div className="h1 text-white">View Accounts</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12">
                <table className="table table-striped table-hover shadow-lg">
                  <thead className="table-dark">
                    <tr>
                      <th>S.NO</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Gender</th>
                      <th>SSN</th>
                      <th>Edit</th>
                      <th>Delete</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountData.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.userId}</td>
                          <td>{data.fullName}</td>
                          <td>{data.email}</td>
                          <td>{data.mobielNumber}</td>
                          <td>{data.gender}</td>
                          <td>{data.ssn}</td>
                          <td>
                            <Link
                              to={`/updateAccount/${data.userId}`}
                              className="btn btn-primary"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={`/deleteAccount/${data.userId}`}
                              className="btn btn-danger "
                            >
                              <i className="bi bi-trash3-fill"></i>
                            </Link>
                          </td>
                          <td>
                            {data.activeStatus == "Active" && (
                              <Link
                                to={`/activeSwitch/${data.userId}/${data.activeStatus}`}
                                className={`btn btn-danger`}
                              >
                                <i className={`bi bi-x-lg`}></i>
                              </Link>
                            )}
                            {data.activeStatus == "In-Active" && (
                              <Link
                                to={`/activeSwitch/${data.userId}/${data.activeStatus}`}
                                className={`btn btn-success`}
                              >
                                <i className={`bi-check2`}></i>
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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

export default ViewAccounts;
