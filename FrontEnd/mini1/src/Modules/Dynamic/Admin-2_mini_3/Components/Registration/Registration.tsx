import React, { useState } from "react";
import NavBar from "../../../../Utils/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../Models/IUser";
import { UserManagementService } from "../../Services/UserManagmentServices";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";

interface IState {
  error: string;
  loader: boolean;
}

const Registration: React.FC = () => {
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

  const navigate = useNavigate();

  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({
      ...state,
      loader: true,
    });
    UserManagementService.userRegistration(user)
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loader: false,
          });
          navigate("/activeAccount");
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

  return (
    <>
      {loader == true && <Loader />}
      {error.length > 0 ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <NavBar btn="login" color="bg-dark" />
          <div className="container">
            <div className="row mt-5">
              <div className="col-2"></div>
              <div className="col-8">
                <div className="card rounded-4 shadow-lg">
                  <div className="card-header bg-dark text-white rounded-top-4 shadow-lg ">
                    <div className="h2 text-center">Registration</div>
                  </div>
                  <div className="card-body rounded-bottom-4 bg-dark-subtle shadow-lg px-5 pt-4 pb-4">
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
                          <label className="form-label">Gender</label>
                          <div className="mb-3">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="Male"
                                onChange={(e) => {
                                  updateInput(e);
                                }}
                                required
                              />
                              <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="Female"
                                onChange={(e) => {
                                  updateInput(e);
                                }}
                                required
                              />
                              <label className="form-check-label">Female</label>
                            </div>
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
                        <div className="col-sm-12 d-flex flex-row justify-content-between">
                          <div>
                            <input
                              type="submit"
                              value={"Register"}
                              className="btn btn-dark mt-2"
                            />
                            <Link to="/" className="btn btn-dark ms-2 mt-2">
                              <i className="bi bi-arrow-left"></i> Back
                            </Link>
                          </div>
                          <div className="mt-2">
                            <p>
                              If you already have a account ?{" "}
                              <Link
                                to="/login"
                                className="fw-bold text-black text-decoration-none "
                              >
                                Login
                              </Link>
                            </p>
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

export default Registration;
