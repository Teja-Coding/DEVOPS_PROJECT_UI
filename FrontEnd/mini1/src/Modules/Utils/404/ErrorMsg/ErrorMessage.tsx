import React from "react";

interface IProps {
  message: string;
}
const ErrorMessage: React.FC<IProps> = (props) => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h1 className="display-4 text-danger">{props.message}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;
