import React, { useEffect, useState } from "react";
import "./CreatePlan.css";
import { Link, useNavigate } from "react-router-dom";
import { IPlan } from "../../Models/IPlan";
import { PlanService } from "../../Services/Services";
import { ICategory } from "../../Models/ICategory";
import NavBar from "../../../../Utils/NavBar/NavBar";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import { toast } from "react-toastify";

interface IState {
  categoryData: ICategory[];
  error: string;
  loading: boolean;
}

const CreatePlan: React.FC = () => {
  const [state, setState] = React.useState<IState>({
    categoryData: [] as ICategory[],
    error: "",
    loading: false,
  });
  //---------------- Category API --------------------
  useEffect(() => {
    setState({
      ...state,
      loading: true,
    });
    PlanService.getAllCategorys()
      .then((response) => {
        if (response.data) {
          setState({
            ...state,
            categoryData: response.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        setState({ ...state, error: error.message, loading: false });
      });
  }, []);
  //----------------- Destructure  State ---------------
  const { categoryData, loading, error } = state;

  //=================== useNavigate ==========================
  const navigate = useNavigate();

  //----------------------- Category API ENDING -------------------

  //----------------------- post API ----------------------------
  const [plan, setPlan] = useState<IPlan>({
    planName: "",
    categoryId: 0,
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
    PlanService.createAPlan(plan)
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loading: false,
          });
          toast.success("Your Plan Create Successfully!");
          navigate("/view");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setState({ ...state, error: error.message, loading: false });
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
                <div className="card bg-danger text-white">
                  <div className="card-body ">
                    <div className="h1">Create Plan</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <pre>{JSON.stringify(plan)}</pre> */}
            <div className="row mt-4">
              <div className="col-sm-12 ">
                <div className="card shadow-lg p-3">
                  <div className="card-body">
                    <form
                      onSubmit={(e) => {
                        handelSubmit(e);
                      }}
                    >
                      <div className="row">
                        <div className="col-sm-6">
                          <div>
                            <label htmlFor="" className="form-lable">
                              Plan Name
                            </label>
                            <input
                              name="planName"
                              value={plan.planName}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              type="text"
                              className="form-control mt-1"
                              placeholder="Plan-Name"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div>
                            <label htmlFor="" className="form-lable">
                              Plan Start Date
                            </label>
                            <input
                              name="planStartDate"
                              value={plan.planStartDate}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              type="date"
                              className="form-control mt-1"
                              placeholder="Plan-Name"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-sm-6">
                          <div>
                            <label htmlFor="" className="form-lable">
                              Plan End Date
                            </label>
                            <input
                              name="planEndDate"
                              value={plan.planEndDate}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              type="date"
                              className="form-control mt-1"
                              placeholder="Plan-Name"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div>
                            <label htmlFor="" className="form-lable">
                              Plan Category
                            </label>
                            <select
                              className="form-select form-select mt-1"
                              name="categoryId"
                              value={plan.categoryId}
                              onChange={(e) => {
                                updateInput(e);
                              }}
                              required
                            >
                              <option selected>-Plan Category-</option>
                              {categoryData.map((item, index) => {
                                return (
                                  <option key={index} value={item.categoryId}>
                                    {item.categoryName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>

                      <input
                        type="submit"
                        value={"Save"}
                        className="btn btn-danger mt-4 ms-1"
                      />
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
export default CreatePlan;
