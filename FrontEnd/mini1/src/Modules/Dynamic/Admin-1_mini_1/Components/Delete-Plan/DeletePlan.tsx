import React, { useEffect } from "react";
import { PlanService } from "../../Services/Services";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import { toast } from "react-toastify";

interface IState {
  id: string | undefined;
  error: string;
  loading: boolean;
}

const DeletePlan: React.FC = () => {
  const { planId } = useParams();

  const navigate = useNavigate();

  const [state, setState] = React.useState<IState>({
    id: planId,
    error: "",
    loading: false,
  });

  const { id, error, loading } = state;
  const cid = Number(id);

  useEffect(() => {
    setState({
      ...state,
      loading: true,
    });
    PlanService.deletePlan(cid)
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loading: false,
          });
          toast.error(response.data);
          navigate("/view");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setState({ ...state, error: error.message, loading: false });
      });
  }, []);

  return (
    <>
      {loading == true && <Loader />}
      {error.length > 0 ? <ErrorMessage message={error} /> : <></>}
    </>
  );
};

export default DeletePlan;
