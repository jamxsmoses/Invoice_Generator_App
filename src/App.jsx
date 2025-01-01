// import { useState } from "react";
// import { useState } from "react";
import { useState, useRef } from "react";
import "./App.css";
import Invoice from "./Invoice";
import AllMpos from "./components/AllMpos2";
import NewMpo from "./components/NewMpo";
// import { Signup } from "./components/SignUp/Signup";

function App() {
  let Component;

  const path = window.location.pathname;

  switch (window.location.pathname) {
    case "/":
      Component = AllMpos;

      break;
    case "/generate-invoice":
      Component = Invoice;

      break;
    case "/new-mpo":
      Component = NewMpo;

      break;
  }
  const navRef = useRef();

  function controlNav() {
    navRef.current.classList.toggle("navbarConOut");
  }

  return (
    <>
      <div className={path !== "/generate-invoice" ? "main" : "main-Inv"}>
        <div
          className={
            path !== "/generate-invoice" ? "innerCont" : "innerContInv"
          }
        >
          <input id="check" type="checkbox" />
          <label htmlFor="check" className="menu-icon" onClick={controlNav}>
            <span className="ln1"></span>
            <span className="ln2"></span>
            <span className="ln3"></span>
          </label>
          <div ref={navRef} className="navbarCon">
            <div className="navbar">
              <div className="innerNavv">
                <a href="/" className={path === "/" ? "active" : ""}>
                  Dashboard
                </a>
                <a
                  href="/generate-invoice"
                  className={path === "/generate-invoice" ? "active" : ""}
                >
                  Generate Invoice
                </a>
                <a
                  href="/new-mpo"
                  className={path === "/new-mpo" ? "active" : ""}
                >
                  New MPO
                </a>
                <a
                  href="/"
                  className={path === "#" ? "active" : ""}
                  style={{ borderBottom: "none" }}
                >
                  Generate COT
                </a>
              </div>
            </div>
          </div>
          <label htmlFor="check" className="navControl"></label>
          <div
            className={
              path !== "/generate-invoice" ? "displayComp" : "displayCompInv"
            }
          >
            {<Component />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
