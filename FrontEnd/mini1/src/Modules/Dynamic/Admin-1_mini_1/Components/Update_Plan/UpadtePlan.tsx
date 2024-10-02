import React, { useEffect, useState } from "react";
import "./UpdatePlan.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PlanService } from "../../Services/Services";
import { ICategory } from "../../Models/ICategory";
import { IPlan } from "../../Models/IPlan";
import NavBar from "../../../../Utils/NavBar/NavBar";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import { toast } from "react-toastify";

interface IState {
  categoryData: ICategory[];

  errorMsg: string;
  loading: boolean;
}

const UpdatePlan: React.FC = () => {
  const { planId } = useParams();
  const id = Number(planId);

  const [state, setState] = useState<IState>({
    categoryData: [] as ICategory[],

    errorMsg: "",
    loading: false,
  });
  //------------------------------------------
  const { categoryData } = state;
  const navigate = useNavigate();

  //-------------------------------------------
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
  const { loading, errorMsg } = state;

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(plan);
    setState({
      ...state,
      loading: true,
    });
    PlanService.updateAPlan(plan, id)
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loading: false,
          });
          toast.info(response.data);
          navigate("/view");
        }
      })
      .catch((error) => {
        setState({ ...state, errorMsg: error.message, loading: false });
      });
  };
  //------------------------------------------
  useEffect(() => {
    setState({
      ...state,
      loading: true,
    });
    Promise.all([PlanService.getAllCategorys(), PlanService.getAPlan(id)])
      .then(([catResponse, planResponse]) => {
        setState({
          ...state,
          categoryData: catResponse.data,

          loading: false,
        });
        setPlan(planResponse.data);
      })
      .catch((error) => {
        setState({
          ...state,
          errorMsg: error.message,
          loading: false,
        });
      });
  }, []);

  return (
    <>
      {loading == true && <Loader />}
      {errorMsg.length > 0 ? (
        <ErrorMessage message={errorMsg} />
      ) : (
        <>
          <NavBar color="bg-dark" btn="dashboard" />
          {/* <pre>{JSON.stringify(id)}</pre>
      <pre>{JSON.stringify(state.categoryData)}</pre> */}

          <div className="container">
            <div className="row mt-5 ">
              <div className="col-sm-12">
                <div className="card bg-primary text-white shadow-lg">
                  <div className="card-body ">
                    <div className="h1">Update Plan</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-12">
                <div className="card shadow-lg">
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
                        value={"Update"}
                        className="btn btn-primary mt-4 ms-1"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <Link to={`/view`} className="btn btn-dark mt-4 ms-1">
                  View
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UpdatePlan;
