import React from "react";
import SpinnerImg from "../../Assets/loading.gif";

let Spinner = () => {
  return (
    <React.Fragment>
      <img className="spinner" src={SpinnerImg} alt="" />
    </React.Fragment>
  );
};

export default Spinner;
