import { useEffect, useState } from "react";
import { db } from "./config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import "./Header.css";
import "./Invoice.css";
import "animate.css";
// import step1 from "./assets/step-1.png";
// import step2 from "./assets/step-2.png";
// import step3 from "./assets/step-3.png";
// import step4 from "./assets/step-4.png";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Invoice() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [mpoList, setMpoList] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState("");
  // const [helpState, setHelpState] = useState("helpContainerHidden");
  // const [minHelpState, setMinHelpState] = useState("minimizedHelpHidden");

  const mposRef = collection(db, "MPOS");

  useEffect(() => {
    async function getMPOList() {
      // READ DATA FROM DATABASE
      // SET THE MPO LIST
      try {
        const data = await getDocs(mposRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // console.log(filteredDate);
        setMpoList(filteredData);
      } catch (err) {
        console.error(err);
      }
    }
    getMPOList();
  });

  // window.addEventListener("load", () => {
  //   console.log("Ran immediately");
  //   setTimeout(() => {
  //     setHelpState("helpContainer");
  //   }, 2000);
  //   false;
  // });
  // console.log(mpoList);

  // function minimizeHelp() {
  //   setHelpState("helpContainerHidden");
  //   setMinHelpState("minimizedHelp");
  // }

  // console.log(helpState);

  // function openHelp() {
  //   setHelpState("helpContainer");
  //   if (minHelpState === "minHelpDown") {
  //     setMinHelpState("minimizedHelp");
  //   }
  // }

  // function closeHelp() {
  //   setHelpState("helpContainerHidden");
  //   setMinHelpState("minHelpDown");
  // }

  const mpos = mpoList;

  function findInvNumber() {
    if (filteredMpoNums.length < 1) {
      return;
    }
    const index = uniqueMPONums.findIndex(
      (item) => item.mpoNumber === selectedValue
    );
    return index + 1;
  }

  const handleSelectedMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  // let filtered;

  const filteredAgencyMPOs = mpos.filter(
    (mpo) => mpo.agency === selectedAgency
  );

  let filteredMonthMpos;
  filteredMonthMpos =
    selectedMonth === ""
      ? []
      : filteredAgencyMPOs.filter((mpo) => mpo.month === selectedMonth);

  let filteredMpoNums;
  filteredMpoNums =
    filteredMonthMpos.length < 1
      ? []
      : filteredMonthMpos.filter((mpo) => mpo.mpoNumber === selectedValue);

  filteredMpoNums =
    filteredMpoNums.length < 1
      ? []
      : filteredMpoNums.sort((a, b) => a.sn - b.sn);
  // console.log(filteredMpoNums[2].sn);

  function calcRateTotal(a, b) {
    const calcRate = Math.round(a * b * 100) / 100;
    if (calcRate % 1 !== 0) {
      if (
        calcRate % 1 === 0.1 ||
        calcRate % 1 === 0.2 ||
        calcRate % 1 === 0.3 ||
        calcRate % 1 === 0.4 ||
        calcRate % 1 === 0.5 ||
        calcRate % 1 === 0.6 ||
        calcRate % 1 === 0.7 ||
        calcRate % 1 === 0.8 ||
        calcRate % 1 === 0.9
      ) {
        return `${calcRate.toLocaleString("en-US")}0`;
      } else {
        return calcRate.toLocaleString("en-US");
      }
    } else {
      return `${calcRate.toLocaleString("en-US")}.00`;
    }
  }

  function calcVD(a, b) {
    const calcVDAmnt = Math.round((a / 100) * b * 100) / 100;
    if (calcVDAmnt % 1 !== 0) {
      if (
        calcVDAmnt % 1 === 0.1 ||
        calcVDAmnt % 1 === 0.2 ||
        calcVDAmnt % 1 === 0.3 ||
        calcVDAmnt % 1 === 0.4 ||
        calcVDAmnt % 1 === 0.5 ||
        calcVDAmnt % 1 === 0.6 ||
        calcVDAmnt % 1 === 0.7 ||
        calcVDAmnt % 1 === 0.8 ||
        calcVDAmnt % 1 === 0.9
      ) {
        return `${calcVDAmnt.toLocaleString("en-US")}0`;
      } else {
        return calcVDAmnt.toLocaleString("en-US");
      }
    } else {
      return `${calcVDAmnt.toLocaleString("en-US")}.00`;
    }
  }

  function calcAC(a, b, c, d) {
    const rateTotal = a * b;
    const vdAmount = (c / 100) * rateTotal;
    const rem = rateTotal - vdAmount;
    const calcACAmnt = Math.round((d / 100) * rem * 100) / 100;
    if (calcACAmnt % 1 !== 0) {
      if (
        calcACAmnt % 1 === 0.1 ||
        calcACAmnt % 1 === 0.2 ||
        calcACAmnt % 1 === 0.3 ||
        calcACAmnt % 1 === 0.4 ||
        calcACAmnt % 1 === 0.5 ||
        calcACAmnt % 1 === 0.6 ||
        calcACAmnt % 1 === 0.7 ||
        calcACAmnt % 1 === 0.8 ||
        calcACAmnt % 1 === 0.9
      ) {
        return `${calcACAmnt.toLocaleString("en-US")}0`;
      } else {
        return calcACAmnt.toLocaleString("en-US");
      }
    } else {
      return `${calcACAmnt.toLocaleString("en-US")}.00`;
    }
  }

  const date = new Date();
  const monthText = new Date().toLocaleString("default", { month: "short" });

  function calcVatAmount(a, b, c, d, e) {
    const rateTotal = a * b;
    const vdAmount = (c / 100) * rateTotal;
    const rem = rateTotal - vdAmount;
    const acAmount = (d / 100) * rem;
    const rem2 = rem - acAmount;
    const vatAmount = (e / 100) * rem2;
    const calcVatAmnt = Math.round(vatAmount * 100) / 100;
    if (calcVatAmnt % 1 !== 0) {
      if (
        calcVatAmnt % 1 === 0.1 ||
        calcVatAmnt % 1 === 0.2 ||
        calcVatAmnt % 1 === 0.3 ||
        calcVatAmnt % 1 === 0.4 ||
        calcVatAmnt % 1 === 0.5 ||
        calcVatAmnt % 1 === 0.6 ||
        calcVatAmnt % 1 === 0.7 ||
        calcVatAmnt % 1 === 0.8 ||
        calcVatAmnt % 1 === 0.9
      ) {
        return `${calcVatAmnt.toLocaleString("en-US")}0`;
      } else {
        return calcVatAmnt.toLocaleString("en-US");
      }
    } else {
      return `${calcVatAmnt.toLocaleString("en-US")}.00`;
    }
  }

  function calcLineTotal(a, b, c, d, e) {
    const rateTotal = a * b;
    const vdAmount = (c / 100) * rateTotal;
    const rem = rateTotal - vdAmount;
    const acAmount = (d / 100) * rem;
    const rem2 = rem - acAmount;
    const vatAmount = (e / 100) * rem2;
    const calcLnTotalAmnt = Math.round((vatAmount + rem2) * 100) / 100;
    if (calcLnTotalAmnt % 1 !== 0) {
      if (
        calcLnTotalAmnt % 1 === 0.1 ||
        calcLnTotalAmnt % 1 === 0.2 ||
        calcLnTotalAmnt % 1 === 0.3 ||
        calcLnTotalAmnt % 1 === 0.4 ||
        calcLnTotalAmnt % 1 === 0.5 ||
        calcLnTotalAmnt % 1 === 0.6 ||
        calcLnTotalAmnt % 1 === 0.7 ||
        calcLnTotalAmnt % 1 === 0.8 ||
        calcLnTotalAmnt % 1 === 0.9
      ) {
        return `${calcLnTotalAmnt.toLocaleString("en-US")}0`;
      } else {
        return calcLnTotalAmnt.toLocaleString("en-US");
      }
    } else {
      return `${calcLnTotalAmnt.toLocaleString("en-US")}.00`;
    }
  }

  const calcTotalRate = () => {
    if (filteredMpoNums.length < 1) {
      return;
    } else {
      filteredMpoNums.forEach((mpo) => {
        const rateTotal = mpo.spots * mpo.rate;
        const vdAmount = (mpo.volumeDiscount / 100) * rateTotal;
        const rem1 = rateTotal - vdAmount;
        const acAmount = (mpo.agencyCommission / 100) * rem1;
        const rem2 = rem1 - acAmount;
        const vatAmount = (mpo.vat / 100) * rem2;
        mpo.total = Math.round((rem2 + vatAmount) * 100) / 100;
      });
    }
  };
  calcTotalRate();

  const returnTotalRate = () => {
    if (filteredMpoNums.length < 1) {
      return;
    } else {
      let totalValue = 0;
      filteredMpoNums.forEach((mpo) => {
        totalValue = totalValue + mpo.total;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainTotalValue = Math.round(totalValue * 100) / 100;
      if (mainTotalValue % 1 !== 0) {
        if (
          mainTotalValue % 1 === 0.1 ||
          mainTotalValue % 1 === 0.2 ||
          mainTotalValue % 1 === 0.3 ||
          mainTotalValue % 1 === 0.4 ||
          mainTotalValue % 1 === 0.5 ||
          mainTotalValue % 1 === 0.6 ||
          mainTotalValue % 1 === 0.7 ||
          mainTotalValue % 1 === 0.8 ||
          mainTotalValue % 1 === 0.9
        ) {
          return `${mainTotalValue.toLocaleString("en-US")}0`;
        } else {
          return mainTotalValue.toLocaleString("en-US");
        }
      } else {
        return `${mainTotalValue.toLocaleString("en-US")}.00`;
      }
    }
  };

  const returnTotalRateTW = () => {
    if (filteredMpoNums.length < 1) {
      return;
    } else {
      let totalValue = 0;
      filteredMpoNums.forEach((mpo) => {
        totalValue = totalValue + mpo.total;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainTotalValue = Math.round(totalValue * 100) / 100;

      return mainTotalValue;
    }
  };

  const getMonthText = () => {
    const monthToString = selectedMonth.toString();
    if (monthToString === "July" || monthToString === "May") {
      return `${monthToString[0]}${monthToString[2]}`;
    } else {
      return `${monthToString[0]}${monthToString[1]}`;
    }
  };

  function numberToWordsInNaira(number) {
    // Ensure input is a valid number and is not negative
    if (typeof number !== "number" || number < 0) return "Invalid input";

    // Arrays defining words for units, teens, tens, and larger place values
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const thousands = ["Thousand", "Million", "Billion"];

    // Function to convert a number (up to 999) into words
    function convertToWords(num) {
      if (num === 0) return "Zero"; // Base case for zero
      if (num < 10) return units[num]; // Numbers from 1 to 9
      if (num < 20 && num > 10) return teens[num - 11]; // Numbers from 11 to 19
      if (num < 100) {
        // Numbers from 20 to 99
        return (
          tens[Math.floor(num / 10)] +
          (num % 10 !== 0 ? " " + units[num % 10] : "")
        ); // Handle tens and units
      }
      if (num < 1000) {
        // Numbers from 100 to 999
        return (
          units[Math.floor(num / 100)] +
          " Hundred" +
          (num % 100 !== 0 ? " and " + convertToWords(num % 100) : "")
        ); // Handle hundreds
      }

      // For larger numbers, recursively process the number using 'thousands' array
      for (
        let i = 0, divisor = 1000;
        i < thousands.length;
        i++, divisor *= 1000
      ) {
        if (num < divisor * 1000) {
          return (
            convertToWords(Math.floor(num / divisor)) +
            " " +
            thousands[i] +
            (num % divisor !== 0 ? ", " + convertToWords(num % divisor) : "")
          );
        }
      }

      // If the number is too large, return a message
      return "Number too large";
    }

    // Separate the integer (Naira) and decimal (Kobo) parts of the input number
    const naira = Math.floor(number); // Get the whole number part
    const kobo = Math.round((number - naira) * 100); // Get the fractional part as Kobo

    // Convert Naira and Kobo parts to words
    let result =
      convertToWords(naira) +
      `${returnTotalRateTW() % 1 === 0 ? " Naira Only" : " Naira"}`; // Convert Naira
    if (kobo > 0) {
      result += ", " + convertToWords(kobo) + " Kobo Only"; // Add Kobo if it's non-zero
    }

    // Return the final result as a trimmed string
    return result.trim();
  }

  // function totalToNum() {
  //   const beforeMainTotal = `${returnTotalRate() ? returnTotalRate() : ""}`;
  //   // console.log(beforeMainTotal);
  //   let newNum = [];
  //   for (let i = 0; i < beforeMainTotal.length; i++) {
  //     if (beforeMainTotal[i] !== ",") {
  //       newNum.push(beforeMainTotal[i]);
  //     }
  //   }
  //   let anotherNum = "";

  //   for (let i = 0; i < newNum.length; i++) {
  //     anotherNum = Number((anotherNum += newNum[i]));
  //   }

  //   console.log(anotherNum);
  //   return anotherNum;
  //   // console.log(beforeMainTotal);
  // }

  const uniqueAgency = Array.from(
    new Map(mpos.map((item) => [item.agency, item])).values()
  );

  const uniqueMPONums = Array.from(
    selectedMonth === ""
      ? ""
      : new Map(
          filteredMonthMpos.map((item) => [item.mpoNumber, item])
        ).values()
  );

  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "s") {
      alert("Hi");
    }
  });

  const textInput = `${`INVOICE (${
    filteredMpoNums.length < 1 ? "" : filteredMpoNums[0].campaign
  } - ${selectedValue === "" ? "" : selectedValue}) - ${
    selectedMonth === ""
      ? "Select Month To Generate Invoice Number"
      : `AG${getMonthText()}24 ${
          filteredMpoNums.length < 1
            ? "00"
            : findInvNumber() < 10
            ? `0${findInvNumber()}`
            : findInvNumber()
        }`
  }`}`.toUpperCase();

  const [status, setStatus] = useState("Copy to Clipboard");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(textInput);
      setStatus("Copied!");
    } catch (error) {
      console.error("Failed to copy text:", error);
      setStatus("Unable to copy! Try again.");
    }

    setTimeout(() => setStatus("Copy to Clipboard"), 3000);
  }

  return (
    <>
      <div className="invoiceCon">
        <div className="fileName">
          <div>
            <span
              style={{
                padding: "10px",
                margin: "0",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
              }}
            >
              {textInput}
            </span>
            <button
              onClick={handleCopy}
              style={{
                backgroundColor: `${
                  status === "Copy to Clipboard"
                    ? `#0675c3`
                    : `${
                        status === "Copied!"
                          ? "rgb(214, 255, 216)"
                          : "rgb(255, 214, 214)"
                      }`
                }`,
                boxSizing: "border-box",

                color: `${status === "Copy to Clipboard" ? `#fff` : `#000000`}`,
              }}
            >
              {status}
            </button>
          </div>
        </div>
        {/* Container for minimized help */}
        {/* <div className={` ${minHelpState}`} onClick={openHelp}>
          <h1 className="animate-animated animate__flash">NEED HELP?</h1>
        </div> */}

        {/* Container for how to use invoice generator */}
        {/* <div className={helpState}>
          <div className="mainHelp animate__animated animate__slideInUp">
            <div
              style={{
                position: "absolute",
                top: "3%",
                right: "3%",
                display: "flex",
                alignContent: "center",
                gap: "8px",
              }}
            >
              <span
                className="min"
                onClick={minimizeHelp}
                style={{
                  width: "15px",
                  height: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  fontSize: "14px",
                  fontWeight: "bolder",
                  color: "white",
                  backgroundColor: "#0675c3",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  padding: "0px 0px 1px 0px",
                  transitionDuration: ".3s",
                }}
              >
                -
              </span>
              <span
                className="close"
                onClick={closeHelp}
                style={{
                  width: "15px",
                  height: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  fontSize: "8px",
                  fontWeight: "bolder",
                  color: "white",
                  backgroundColor: "red",
                  cursor: "pointer",
                  boxSizing: "border-box",
                  padding: "0px 0px 1px 0px",
                  transitionDuration: ".3s",
                }}
              >
                X
              </span>
            </div>
            <div className="helpContentDiv">
              <h1>How to use Invoice Generator</h1>
              <div
                style={{
                  borderBottom: "1px solid black",
                  width: "100%",
                  height: "5px",
                }}
              ></div>
              <ul className="stepsUl">
                <div>
                  <li>
                    <b>
                      Step 1:<br></br>
                    </b>
                    Select Agency{" "}
                    <span className="stepsSpan">(on top right)</span>
                    <br />
                    <img src={step1} alt="Step 1" />
                  </li>

                  <li>
                    <b>
                      Step 3:<br></br>
                    </b>
                    Select MPO No.{" "}
                    <span className="stepsSpan">(under agency)</span>
                    <br />
                    <img src={step3} alt="Step 3" />
                  </li>
                </div>
                <div>
                  <li>
                    <b>
                      Step 2:<br></br>
                    </b>
                    Select Month{" "}
                    <span className="stepsSpan">(after invoice No.)</span>
                    <br />
                    <img src={step2} alt="Step 2" />
                  </li>
                  <li>
                    <b>
                      Step 4:<br></br>
                    </b>
                    CTRL + P to print{" "}
                    <span className="stepsSpan">
                      (select &quot;Save as PDF&quot;)
                    </span>
                    <br />
                    <img src={step4} alt="Step 2" />
                  </li>
                </div>
              </ul>
              <div className="noteCont">
                <h1>NOTE</h1>
                <p>
                  Invoice information will automatically be generated after
                  selecting the agency, month, and MPO number,
                  <span>{`(including amount in words).`} </span>
                </p>

                <p>
                  Letterhead and signature will appear upon pressing CTRL + P.
                </p>

                <p>
                  After pressing CTRL + P, confirm that layout is PORTRAIT, and
                  paper size is LETTER.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <header>
          <div className="title">
            <h1>invoice</h1>
          </div>
          <div className="header">
            <div className="address-box">
              <li>The Media Buyer</li>
              <li>
                {selectedAgency === "" ? "(Select Agency)" : selectedAgency}
              </li>
              <li>Lagos</li>
            </div>
            <div className="invoice-details-box">
              <ul>
                <li className="noPrint">
                  <b>AGENCY: </b>
                  <select onChange={(e) => setSelectedAgency(e.target.value)}>
                    <option value="" defaultValue>
                      Select Agency
                    </option>
                    {uniqueAgency.map((mpo) => (
                      <option
                        key={uniqueAgency.indexOf(mpo)}
                        value={mpo.agency}
                      >
                        {mpo.agency}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  <b>MPO NO: </b>
                  <select onChange={(e) => setSelectedValue(e.target.value)}>
                    <option value="" defaultValue>
                      Select MPO No.
                    </option>
                    {uniqueMPONums.length < 1
                      ? ""
                      : uniqueMPONums.map((mpo) => (
                          <option
                            key={uniqueMPONums.indexOf(mpo)}
                            value={mpo.mpoNumber}
                          >
                            {mpo.mpoNumber}
                          </option>
                        ))}
                  </select>
                </li>
                <li>
                  <b>CLIENT: </b>
                  {filteredMpoNums.length < 1 ? "" : filteredMpoNums[0].client}
                </li>
                <li>
                  <b>BRAND: </b>
                  {filteredMpoNums.length < 1 ? "" : filteredMpoNums[0].brand}
                </li>
                <li>
                  <b>CAMPAIGN: </b>
                  {filteredMpoNums.length < 1
                    ? ""
                    : filteredMpoNums[0].campaign}
                </li>
                <li>
                  <b>INVOICE DATE: </b>
                  {`${date.getDate()}-${monthText}-${date.getFullYear()} `}
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main>
          <div className="invoiceHeader">
            <div className="invoiceNoCon">
              INVOICE NO:{" "}
              {selectedMonth === ""
                ? "Select Month To Generate Invoice Number"
                : `AG${getMonthText()}24/${
                    filteredMpoNums.length < 1
                      ? "00"
                      : findInvNumber() < 10
                      ? `0${findInvNumber()}`
                      : findInvNumber()
                  }`}
            </div>
            <div>
              MONTH:{" "}
              <select onChange={handleSelectedMonth}>
                <option value="" defaultValue>
                  Select Month
                </option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>TIN NO: 17363518-0001</div>
          </div>
          {/* Render Invoice Details */}
          <table>
            <thead>
              <tr className="invTr">
                <th className="left">S/N</th>
                <th className="left">Material</th>
                <th className="center">Duration</th>
                <th className="left">Specification</th>
                <th className="center">Spots</th>
                <th className="center">Rate</th>
                <th className="center">Rate Total</th>
                <th className="center">V.D</th>
                <th className="center">V.D Amount</th>
                <th className="center">A.C</th>
                <th className="center">A.C Amount</th>
                <th className="center">VAT</th>
                <th className="center">VAT Amount</th>
                <th className="center">Line Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredMpoNums.map((item) => (
                <tr key={filteredMpoNums.indexOf(item)}>
                  <td className="center">
                    {filteredMpoNums.indexOf(item) + 1}
                  </td>
                  <td className="left">{item.material}</td>
                  <td className="center">{item.duration}</td>
                  <td className="left">{item.specification}</td>
                  <td className="center">{item.spots}</td>
                  <td className="right">
                    {item.rate % 1 !== 0
                      ? item.rate.toLocaleString("en-US")
                      : `${item.rate.toLocaleString("en-US")}.00`}
                  </td>
                  <td className="right">
                    {calcRateTotal(item.spots, item.rate)}
                  </td>
                  <td className="center">{item.volumeDiscount}%</td>
                  <td className="right">
                    {calcVD(item.volumeDiscount, item.rate * item.spots)}
                  </td>
                  <td className="center">{item.agencyCommission}%</td>
                  <td className="right">
                    {calcAC(
                      item.spots,
                      item.rate,
                      item.volumeDiscount,
                      item.agencyCommission
                    )}
                  </td>
                  <td className="center">{item.vat}%</td>
                  <td className="right">
                    {calcVatAmount(
                      item.spots,
                      item.rate,
                      item.volumeDiscount,
                      item.agencyCommission,
                      item.vat
                    )}
                  </td>
                  <td className="right">
                    {calcLineTotal(
                      item.spots,
                      item.rate,
                      item.volumeDiscount,
                      item.agencyCommission,
                      item.vat
                    )}
                  </td>
                </tr>
              ))}
              <tr
                className="emptyDiv"
                style={{
                  height: `${filteredMpoNums.length > 3 ? "40px" : "80px"}`,
                }}
              >
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className="bd"></td>
              </tr>
              <tr className="totalDiv">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td
                  className="right"
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Total
                </td>
                <td
                  className="bd right"
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {filteredMpoNums.length < 1 ? "" : `${returnTotalRate()}`}
                </td>
              </tr>
            </tbody>
          </table>
          {/* Amount in words */}
          <div className="amountInWords">
            <p>Amount in words</p>
            <h3 style={{ fontWeight: 500 }}>
              {filteredMpoNums.length < 1
                ? ""
                : numberToWordsInNaira(returnTotalRateTW())}
            </h3>
          </div>
          <div className="salutation">
            <p>Thanks</p>
            <p>Best Regards</p>
            <div className="img"></div>
            <p>Ojibo Emmanuel</p>
          </div>
        </main>
      </div>
    </>
  );
}
