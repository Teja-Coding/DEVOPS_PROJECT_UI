import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlanService } from "../../Services/Services";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import { toast } from "react-toastify";

interface IState {
  id: string | undefined;
  error: string;
  loading: boolean;
}

const Active: React.FC = () => {
  const { planId } = useParams();
  let { value } = useParams();

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
    if (value == null) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      value = "Y";
    } else if (value == "Y") {
      value = "N";
    } else {
      value = "Y";
    }
    value &&
      PlanService.updateStatus(value, cid)
        .then((response) => {
          if (response && response.data) {
            setState({
              ...state,
              loading: false,
            });
            value == "Y"
              ? toast.success("Your Plan is Activated")
              : toast.error("Your Plan is De-Activated");

            navigate("/view");
          }
        })
        .catch((error) => {
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

export default Active;
