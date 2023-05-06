import React from "react";
import Logo2 from "../../images/logo.png";
import LogoDark2x from "../../images/logo-dark2x.png";
import {Link} from "react-router-dom";

const Logo = () => {
  return (
    <Link to={`${process.env.PUBLIC_URL}/`} className="logo-link">
      <img className="logo-light logo-img" src={Logo2} alt="logo" />
      <img className="logo-dark logo-img" src={LogoDark2x} alt="logo" />
    </Link>
  );
};

export default Logo;
