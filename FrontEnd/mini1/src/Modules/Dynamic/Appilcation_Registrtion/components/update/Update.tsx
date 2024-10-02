import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../../../Utils/NavBar/NavBar";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import { toast } from "react-toastify";
import { IRequest } from "../../models/IRequest";
import { ArServices } from "../../services/ArServices";
import { IViewData } from "../../models/IViewData";

interface IState {
  error: string;
  loading: boolean;
}

const UpdateCitizen: React.FC = () => {
  const { appId } = useParams();
  const [state, setState] = React.useState<IState>({
    error: "",
    loading: false,
  });

  const [user, setUser] = useState<IRequest>({
    fullName: "",
    email: "",
    phoneNumber: 0,
    gender: "",
    dob: "",
    ssn: 0,
  });

  const navigate = useNavigate();
  useEffect(() => {
    setState({
      ...state,
      loading: true,
    });
    ArServices.getACitizen(Number(appId))
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loading: false,
          });
          setUser(response.data);
        }
      })
      .catch(() => {
        setState({
          ...state,
          loading: false,
          error: error,
        });
      });
  }, []);

  const { loading, error } = state;

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
    ArServices.updateACitizen(Number(appId), user)
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loading: false,
          });
          navigate("/viewCitizen");
          toast.success("Application Update successfully");
          console.log(response);
        }
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.message,
          loading: false,
        });
        console.log(error);
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
                    <div className="h1">Update Application</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <pre>{JSON.stringify(appId)}</pre> */}
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
                                value="male"
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
                                value="female"
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
                              value={"Update"}
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
                <Link to={`/viewCitizen`} className="btn btn-dark mt-4 ms-1">
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
export default UpdateCitizen;
