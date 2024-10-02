import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserManagementService } from "../../Services/UserManagmentServices";
import ErrorMessage from "../../../../Utils/404/ErrorMsg/ErrorMessage";
import Loader from "../../../../Utils/Loders/Loader";
import { toast } from "react-toastify";

interface IState {
  error: string;
  loader: boolean;
}

const DeleteAccount: React.FC = () => {
  const [state, setState] = useState<IState>({
    error: "",
    loader: false,
  });
  const { userId } = useParams();
  const cid = Number(userId);

  const { loader, error } = state;

  const navigate = useNavigate();
  useEffect(() => {
    setState({
      ...state,
      loader: true,
    });
    UserManagementService.deleteUser(cid)
      .then((response) => {
        if (response.data) {
          setState({
            ...state,
            loader: false,
          });
          toast.error("Your Account is Deleted");
          navigate("/viewAccounts");
        }
      })
      .catch((error) => {
        setState({
          ...state,
          error: error.message,
          loader: false,
        });
        toast.error(error.message);
      });
  }, []);

  return (
    <>
      {loader == true && <Loader />}
      {error.length > 0 ? (
        <ErrorMessage message={error} />
      ) : (
        <h1>Account Deleted</h1>
      )}
    </>
  );
};

export default DeleteAccount;
