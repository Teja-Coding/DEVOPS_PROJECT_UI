import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  position?: string;
  color?: string;
  btn?: string;
}

const NavBar: React.FC<IProps> = (props) => {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark ${props.color} ${props.position}`}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          Project-
          <span className="text-warning">Management</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="btn btn-outline-light" to={`/${props.btn}`}>
                {props.btn}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
