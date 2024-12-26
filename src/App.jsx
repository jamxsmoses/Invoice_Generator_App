// import { useState } from "react";
// import { useState } from "react";
import { useRef } from "react";
import "./App.css";
import Invoice from "./Invoice";
import Navbar from "./components/Navbar";
import AllMpos from "./components/AllMpos2";
import NewMpo from "./components/NewMpo";
// import { Signup } from "./components/SignUp/Signup";

function App() {
  let Component;

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
      <div className="main">
        <div className="innerCont">
          <input id="check" type="checkbox" />
          <label htmlFor="check" className="menu-icon" onClick={controlNav}>
            <span className="ln1"></span>
            <span className="ln2"></span>
            <span className="ln3"></span>
          </label>
          <div ref={navRef} className="navbarCon">
            <Navbar />
          </div>
          <label htmlFor="check" className="navControl"></label>
          <div className="displayComp">{<Component />}</div>
        </div>
      </div>
    </>
  );
}

export default App;
