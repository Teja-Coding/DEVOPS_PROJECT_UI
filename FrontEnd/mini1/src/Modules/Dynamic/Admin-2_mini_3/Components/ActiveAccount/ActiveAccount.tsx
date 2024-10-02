import React, { useState } from "react";
import NavBar from "../../../../Utils/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { IActiveAccount } from "../../Models/IActiveAccount";
import { UserManagementService } from "../../Services/UserManagmentServices";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import Loader from "../../../../Utils/Loders/Loader";
interface IState {
  error: string;
  loader: boolean;
}
const ActiveAccount: React.FC = () => {
  const [state, setState] = useState<IState>({
    error: "",
    loader: false,
  });

  const [activateAccount, setActivate] = useState<IActiveAccount>({
    email: "",
    tempPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setActivate({
      ...activateAccount,
      [event.target.name]: event.target.value,
    });
  };

  const { loader, error } = state;

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({
      ...state,
      loader: true,
    });
    UserManagementService.userActivate(activateAccount)
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,

            loader: false,
          });
          navigate("/login");
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
          {" "}
          <NavBar color="bg-dark" btn="login" />
          {/* <pre>{JSON.stringify(activateAccount)}</pre> */}
          <div className="container">
            <div className="row mt-5">
              <div className="col-2"></div>
              <div className="col-8">
                <div className="card rounded-4 shadow-lg">
                  <div className="card-header bg-dark text-white rounded-top-4 shadow-lg ">
                    <div className="h2 text-center">Activate Account</div>
                  </div>
                  <div className="card-body rounded-bottom-4 bg-dark-subtle shadow-lg px-5 py-4">
                    <form
                      onSubmit={(e) => {
                        handelSubmit(e);
                      }}
                    >
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Registered Mail
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              value={activateAccount.email}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              name="newPassword"
                              value={activateAccount.newPassword}
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
                            <label className="form-label">
                              Temporary Password
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="tempPassword"
                              value={activateAccount.tempPassword}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              name="confirmPassword"
                              value={activateAccount.confirmPassword}
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
                              value={"Unlock"}
                              className="btn btn-dark mt-2"
                            />
                            <Link
                              to="/register"
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

export default ActiveAccount;
