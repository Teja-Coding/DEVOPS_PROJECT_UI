import React, { useEffect, useState } from "react";
import { ReportService } from "../../Services/ReportServices";
import { IRResponse } from "../../Models/IRResponse";
import { IRRequest } from "../../Models/IRRequest";
import NavBar from "../../../../Utils/NavBar/NavBar";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import { toast } from "react-toastify";

interface IState {
  planName: string[];
  planStatus: string[];
  error: string;
  responseData: IRResponse[];
  loading: boolean;
}

const Reports: React.FC = () => {
  const [state, setState] = useState<IState>({
    planName: [],
    planStatus: [],
    error: "",
    responseData: [] as IRResponse[],
    loading: false,
  });
  useEffect(() => {
    setState({
      ...state,
      loading: true,
    });
    Promise.all([ReportService.getAllPlans(), ReportService.getAllStatus()])
      .then(([plansResponse, statusResponse]) => {
        setState({
          ...state,
          planName: plansResponse.data,
          planStatus: statusResponse.data,
          loading: false,
        });
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.message,
          loading: false,
        });
      });
  }, []);
  // ------------------- destructure ---------------------

  const { planName, planStatus, responseData } = state;

  //--------------------Search Function-------------------
  const [plan, setPlan] = useState<IRRequest>({
    planName: "",
    status: "",
    planStartDate: "",
    planEndDate: "",
  });

  const updateInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPlan({
      ...plan,
      [event.target.name]: event.target.value,
    });
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(plan);
    setState({
      ...state,
      loading: true,
    });
    ReportService.search(plan)
      .then((response) => {
        setState({
          ...state,
          responseData: response.data,
          loading: false,
        });
        response.data.length > 0
          ? toast.success(`there are  ${response.data.length} records`)
          : toast.warning("there are no records");
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.message,
          loading: false,
        });
      });
  };

  const { loading, error } = state;

  const handleDownloadExcel = () => {
    setState({
      ...state,
      loading: true,
    });
    fetch("http://localhost:8082/dashboard/admin2/excel")
      .then((response) => {
        setState({
          ...state,
          loading: false,
        });
        toast.success("EXCEL downloaded successfully!", {
          position: "bottom-right",
        });
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report.xls";
        document.body.append(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.message,
          loading: false,
        });
      });
  };

  const handleDownloadPdf = () => {
    setState({
      ...state,
      loading: true,
    });
    fetch("http://localhost:8082/dashboard/admin2/pdf")
      .then((response) => {
        setState({
          ...state,
          loading: false,
        });
        toast.success("PDF downloaded successfully!", {
          position: "bottom-right",
        });
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        toast.error(error.message);
        setState({
          ...state,
          error: error.message,
          loading: false,
        });
      });
  };

  return (
    <>
      {loading == true && <Loader />}
      {error.length > 0 ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <NavBar color="bg-dark" btn="dashboard" />
          {/* <pre>{JSON.stringify(state.planName)}</pre>
      <pre>{JSON.stringify(state.planStatus)}</pre> */}
          {/* <pre>{JSON.stringify(plan)}</pre> */}
          <div className="container">
            <div className="row mt-4">
              <div className="col-sm-12">
                <div className="card bg-secondary shadow">
                  <div className="card-body">
                    <div className="h1">Reports</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-sm-12">
                <div className="card shadow-lg bg-dark-subtle">
                  <div className="card-body">
                    <form
                      onSubmit={(e) => {
                        handelSubmit(e);
                      }}
                    >
                      <div className="row">
                        <div className="col-sm-2">
                          <div>
                            <label htmlFor="" className="form-label">
                              Plan Name
                            </label>
                            <select
                              className="form-select"
                              name="planName"
                              value={plan.planName}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                            >
                              <option selected value={""}>
                                Select
                              </option>
                              ;
                              {planName.map((item, index) => {
                                // console.log(item);
                                return (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div>
                            <label htmlFor="" className="form-label">
                              Plan Status
                            </label>
                            <select
                              className="form-select"
                              name="status"
                              value={plan.status}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                            >
                              <option selected value={""}>
                                Select
                              </option>
                              ;
                              {planStatus.map((item, index) => {
                                // console.log(item);
                                return (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div>
                            <label htmlFor="" className="form-label">
                              Plan Start Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id=""
                              name="planStartDate"
                              value={plan.planStartDate}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div>
                            <label htmlFor="" className="form-label">
                              Plan End Date
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id=""
                              name="planEndDate"
                              value={plan.planEndDate}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <input
                            type="submit"
                            className="btn btn-secondary mt-4"
                            value={"Search"}
                          />
                        </div>
                      </div>
                    </form>
                    {responseData.length > 0 && (
                      <table className="table table-striped table-hover mt-4">
                        <thead className="table-secondary">
                          <tr>
                            <th>S.NO</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Gender</th>
                            <th>SSN</th>
                          </tr>
                        </thead>
                        <tbody>
                          {responseData &&
                            responseData.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.eligibleId}</td>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  <td>{item.mobileNumber}</td>
                                  <td>{item.gender}</td>
                                  <td>{item.ssn}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <button
                  onClick={() => {
                    handleDownloadExcel();
                  }}
                  className="btn btn-dark"
                >
                  Download Excel
                </button>
                <button
                  onClick={() => {
                    handleDownloadPdf();
                  }}
                  className="btn btn-dark ms-2"
                >
                  Download Pdf
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Reports;
