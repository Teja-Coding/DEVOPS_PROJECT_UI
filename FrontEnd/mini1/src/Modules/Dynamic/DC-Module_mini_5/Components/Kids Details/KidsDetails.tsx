import React, { useState } from "react";
import NavBar from "../../../../Utils/NavBar/NavBar";
import Sidebar from "../SideBar/Sidebar";


const KidsDetails: React.FC = () => {
  const [kids, setKids] = useState([1]);

  const addKids = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const newKids = [...kids, 1];
    setKids(newKids);
  };

  const RemoveKids = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const newKids = kids.slice(0, -1);
    setKids(newKids.length > 0 ? newKids : [1]);
  };

  return (
    <div className="AppClass">
      <NavBar color="bg-dark" />
      <div className="container-fluid">
        <div className="row">
          <nav className="col-sm-3 d-none d-md-block bg-transparent border-0 sidebar">
            <Sidebar button={"KidsDetails"} />
          </nav>
          <main className="col-sm-9 ms-sm-auto  px-md-4">
            {/* =============================== */}
            <div className="container mt-5">
              <div className="row">
                <div className="col">
                  <div className="card bg-dark">
                    <div className="card-body">
                      <p className="h1 text-light">Kids Details</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col">
                  <div className="card bg-dark shadow-lg">
                    <div className="card-body">
                      <form className="p-3">
                        <div className="mb-4">
                          <label
                            className="form-label text-light mb-3"
                            htmlFor="AppInput"
                          >
                            Case Number
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Case Number"
                            required
                          />
                        </div>
                        {/* ==================== */}
                        <button
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>
                          ) => {
                            addKids(event);
                          }}
                          className="btn btn-danger"
                        >
                          Add Kid
                        </button>
                        {kids.length > 1 && (
                          <>
                            <button
                              onClick={(
                                event: React.MouseEvent<HTMLButtonElement>
                              ) => {
                                RemoveKids(event);
                              }}
                              className="btn btn-danger ms-2"
                            >
                              Remove Kid
                            </button>
                            <button className=" text-light ms-3 btn btn-danger">
                              {kids.length}
                            </button>
                          </>
                        )}
                        {/* ======================================== */}

                        {kids.length > 0 &&
                          kids.map((index) => {
                            return (
                              <div className="row mt-3" key={index}>
                                <div className="col-sm-4">
                                  <div>
                                    <label className="form-label text-light">
                                      Kid Name {}
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter Kid Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-4">
                                  <div>
                                    <label className="form-label text-light">
                                      Kid Age
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter Kid Age"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-4">
                                  <div>
                                    <label className="form-label text-light">
                                      Kid SSN
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="Enter Kid SSN"
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        <input className="btn btn-danger mt-4" type="submit" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =============================== */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default KidsDetails;
