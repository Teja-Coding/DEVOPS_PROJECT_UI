import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../Utils/Loders/Loader";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import { toast } from "react-toastify";
import { ArServices } from "../../services/ArServices";

interface IState {
  id: string | undefined;
  error: string;
  loading: boolean;
}

const DeleteCitizen: React.FC = () => {
  const { appId } = useParams();

  const navigate = useNavigate();

  const [state, setState] = React.useState<IState>({
    id: appId,
    error: "",
    loading: false,
  });

  const { id, error, loading } = state;

  useEffect(() => {
    setState({
      ...state,
      loading: true,
    });
    ArServices.deleteACitizen(Number(id))
      .then((response) => {
        if (response && response.data) {
          setState({
            ...state,
            loading: false,
          });
          toast.error(response.data);
          navigate("/viewCitizen");
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

export default DeleteCitizen;
