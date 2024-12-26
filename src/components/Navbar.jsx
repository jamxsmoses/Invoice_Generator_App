import React from "react";
import "./Navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [activeBtn1, setActiveBtn1] = useState("active");
  const [activeBtn2, setActiveBtn2] = useState("");
  const [activeBtn3, setActiveBtn3] = useState("");
  const [activeBtn4, setActiveBtn4] = useState("");

  function navBtn1() {
    setActiveBtn1("active");
    setActiveBtn2("");
    setActiveBtn3("");
    setActiveBtn4("");
  }

  function navBtn2() {
    setActiveBtn1("");
    setActiveBtn2("active");
    setActiveBtn3("");
    setActiveBtn4("");
  }

  function navBtn3() {
    setActiveBtn1("");
    setActiveBtn2("");
    setActiveBtn3("active");
    setActiveBtn4("");
  }

  function navBtn4() {
    setActiveBtn1("");
    setActiveBtn2("");
    setActiveBtn3("");
    setActiveBtn4("active");
  }

  return (
    <>
      <div className="navbar">
        <div className="innerNavv">
          <a href="/" className={`${activeBtn1} bd`} onClick={navBtn1}>
            Dashboard
          </a>
          <a
            href="/generate-invoice"
            className={`${activeBtn2} bd`}
            onClick={navBtn2}
          >
            Generate Invoice
          </a>
          <a href="/new-mpo" className={`${activeBtn3} bd`} onClick={navBtn3}>
            New MPO
          </a>
          <a href="/generate-cot" className={`${activeBtn4}`} onClick={navBtn4}>
            Generate COT
          </a>
        </div>
      </div>
    </>
  );
}
