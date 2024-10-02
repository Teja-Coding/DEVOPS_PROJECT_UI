import React, { useState } from "react";
import NavBar from "../../../../Utils/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { ILogin } from "../../Models/ILogin";
import { UserManagementService } from "../../Services/UserManagmentServices";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";

interface IState {
  error: string;
  loader: boolean;
}

const Login: React.FC = () => {
  const [state, setState] = useState<IState>({
    error: "",
    loader: false,
  });

  const { loader, error } = state;

  const [login, setLogin] = useState<ILogin>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({
      ...state,
      loader: true,
    });
    UserManagementService.userLogin(login)
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loader: false,
          });
          navigate("/dashboard");
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
          <NavBar color="bg-dark" btn="register" />

          <div className="container">
            <div className="row mt-5">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <div className="card shadow-lg rounded-4">
                  <div className="card-header rounded-top-4 bg-dark">
                    <div className="h2 text-center text-white">Login</div>
                  </div>
                  <div className="card-body rounded-bottom-4 bg-dark-subtle p-4">
                    <form
                      onSubmit={(e) => {
                        handelSubmit(e);
                      }}
                    >
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          required
                          className="form-control"
                          name="email"
                          value={login.email}
                          onChange={(e) => {
                            updateInput(e);
                          }}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          required
                          className="form-control"
                          name="password"
                          value={login.password}
                          onChange={(e) => {
                            updateInput(e);
                          }}
                        />
                      </div>
                      {/* ------------------------- */}

                      <input
                        type="submit"
                        className="btn btn-dark form-control mt-3 "
                        value={"Log In"}
                      />

                      <div className="p text-end mt-2">
                        <Link
                          className=" fw-bold text-dark"
                          to="/forgotPassword"
                        >
                          Forgot Password ?
                        </Link>
                      </div>
                      <div className="p text-end mt-1">
                        Don't have a Account ?{" "}
                        <Link className=" fw-bold text-dark" to="/register">
                          Register
                        </Link>
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

export default Login;
