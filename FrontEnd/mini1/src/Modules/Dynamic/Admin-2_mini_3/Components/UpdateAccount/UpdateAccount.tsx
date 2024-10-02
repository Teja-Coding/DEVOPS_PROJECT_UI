import React, { useEffect, useState } from "react";
import NavBar from "../../../../Utils/NavBar/NavBar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../Models/IUser";
import { UserManagementService } from "../../Services/UserManagmentServices";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import { toast } from "react-toastify";

interface IState {
  error: string;
  loader: boolean;
}

const UpdateAccount: React.FC = () => {
  const { userId } = useParams();
  const id = Number(userId);
  const [state, setState] = useState<IState>({
    error: "",
    loader: false,
  });
  const { loader, error } = state;

  const [user, setUser] = useState<IUser>({
    fullName: "",
    email: "",
    mobielNumber: 0,
    gender: "",
    dob: "",
    ssn: 0,
  });

  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const navigate = useNavigate();

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(plan);
    setState({
      ...state,
      loader: true,
    });
    UserManagementService.updateAUser(user, id)
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loader: false,
          });
          toast.info("Account Updated Successfully");
          navigate("/viewAccounts");
        }
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.message,
          loader: false,
        });
      });
  };

  useEffect(() => {
    setState({
      ...state,
      loader: true,
    });
    UserManagementService.getAUser(id)
      .then((response) => {
        setState({
          ...state,
          loader: false,
        });
        setUser(response.data);
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.message,
          loader: false,
        });
      });
  }, []);

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
            <div className="row mt-3 ">
              <div className="col-sm-12">
                <div className="card bg-primary text-white shadow-lg">
                  <div className="card-body ">
                    <div className="h1">Update Account</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12">
                <div className="card shadow-lg bg-primary-subtle">
                  <div className="card-body p-4">
                    <form
                      onSubmit={(e) => {
                        handelSubmit(e);
                      }}
                    >
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="fullName"
                              value={user.fullName}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={user.email}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">Mobile Number</label>
                            <input
                              type="number"
                              className="form-control"
                              name="mobielNumber"
                              value={user.mobielNumber}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">SSN</label>
                            <input
                              type="number"
                              className="form-control"
                              name="ssn"
                              value={user.ssn}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input
                              type="date"
                              className="form-control"
                              name="dob"
                              value={user.dob}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label className="form-label">Gender</label>
                          <div className="mb-3">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value={"Male"}
                                onChange={(e) => {
                                  updateInput(e);
                                }}
                              />
                              <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value={"Female"}
                                onChange={(e) => {
                                  updateInput(e);
                                }}
                              />
                              <label className="form-check-label">Female</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 d-flex flex-row justify-content-between">
                          <div>
                            <input
                              type="submit"
                              value={"Update Account"}
                              className="btn btn-primary mt-2"
                            />
                            <Link
                              to="/viewAccounts"
                              className="btn btn-dark ms-2 mt-2"
                            >
                              <i className="bi bi-arrow-left"></i> Back
                            </Link>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateAccount;
