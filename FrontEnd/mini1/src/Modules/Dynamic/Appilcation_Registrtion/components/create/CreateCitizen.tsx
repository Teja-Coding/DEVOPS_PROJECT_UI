import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../../../Utils/NavBar/NavBar";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import { toast } from "react-toastify";
import { IRequest } from "../../models/IRequest";
import { ArServices } from "../../services/ArServices";

interface IState {
  error: string;
  loading: boolean;
}

const CreateCitizen: React.FC = () => {
  const [state, setState] = React.useState<IState>({
    error: "",
    loading: false,
  });

  const { loading, error } = state;

  const [user, setUser] = useState<IRequest>({
    fullName: "",
    email: "",
    phoneNumber: 0,
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
      loading: true,
    });
    ArServices.createACitizen(user)
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loading: false,
          });
          navigate("/dashboard");
          toast.success("Application created successfully");
        }
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.message,
          loading: false,
        });
      });
  };
  //-------------------------- Post API ending ---------------------
  return (
    <>
      {loading == true && <Loader />}
      {error.length > 0 ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <NavBar color="bg-dark" btn="dashboard" />
          <div className="container">
            <div className="row mt-4 ">
              <div className="col-sm-12">
                <div className="card bg-success text-white">
                  <div className="card-body ">
                    <div className="h1">Application Register</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <pre>{JSON.stringify(user)}</pre> */}
            <div className="row mt-4">
              <div className="col-sm-12 ">
                <div className="card shadow-lg p-3 bg-success-subtle">
                  <div className="card-body">
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
                              name="phoneNumber"
                              value={user.phoneNumber}
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
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <Link to={`/dashboard`} className="btn btn-dark mt-4 ms-1">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default CreateCitizen;
