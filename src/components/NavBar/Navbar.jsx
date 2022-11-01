import React from "react";

let NavBar = () => {
  return (
    <React.Fragment>
      <header id="headerSection">
        <div className="container header-p">
          <nav>
            <a href="/">
              <p className="logo">
                <i className="fa-regular fa-user"></i> Contact{" "}
                <span>Manager</span>Script
              </p>
            </a>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};

export default NavBar;
