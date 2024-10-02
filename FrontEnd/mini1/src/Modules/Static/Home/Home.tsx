import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import NavBar from "../../Utils/NavBar/NavBar";
const Home: React.FC = () => {
  return (
    <>
      <div id="container">
        <div id="landing-page">
          <NavBar position="fixed-top" btn="login" />
          <h1 className="text-light">Welcome to Final Project</h1>
          <p className="text-light">If you don't have a account</p>
          <Link to={"/register"} className="btn btn-outline-light mx-auto">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};
export default Home;
