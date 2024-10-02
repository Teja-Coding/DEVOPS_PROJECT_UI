import React, { useState } from "react";
import NavBar from "../../../../Utils/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { UserManagementService } from "../../Services/UserManagmentServices";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";

interface IState {
  error: string;
  loader: boolean;
}

const ForgotPassword: React.FC = () => {
  const [state, setState] = useState<IState>({
    error: "",
    loader: false,
  });

  const { loader, error } = state;

  const [pass, setPass] = useState<string>("");

  const navigate = useNavigate();

  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPass(event.target.value);
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({
      ...state,
      loader: true,
    });
    UserManagementService.userForgotPassword(pass)
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
          <NavBar color="bg-dark" btn="register" />

          <div className="container">
            <div className="row mt-5">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <div className="card shadow-lg rounded-4">
                  <div className="card-header rounded-top-4 bg-dark">
                    <div className="h2 text-center text-white">
                      Forgot Password
                    </div>
                  </div>
                  <div className="card-body rounded-bottom-4 bg-dark-subtle p-4">
                    <form
                      onSubmit={(e) => {
                        handelSubmit(e);
                      }}
                    >
                      <div className="mb-3">
                        <label className="form-label">Registered Email</label>
                        <input
                          type="email"
                          required
                          className="form-control"
                          name="pass"
                          value={pass}
                          onChange={(e) => {
                            updateInput(e);
                          }}
                        />
                      </div>

                      {/* ------------------------- */}

                      <input
                        type="submit"
                        className="btn btn-dark form-control mt-1 "
                        value={"Recover Password"}
                      />
                      <div className="text-end mt-2 me-2 ">
                        <Link to="/login" className="fw-bold text-dark">
                          Sign in
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

export default ForgotPassword;
