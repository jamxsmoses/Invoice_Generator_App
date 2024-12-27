import { useEffect, useState } from "react";
import { db } from "./config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import "./Header.css";
import "./Invoice.css";

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
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [mpoList, setMpoList] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState("");

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

  // console.log(mpoList);

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

  const filteredMpoNums = filteredAgencyMPOs.filter(
    (mpo) => mpo.mpoNumber === selectedValue
  );

  function calcRateTotal(a, b) {
    const calcRate = Math.round(a * b * 100) / 100;
    if (calcRate % 1 !== 0) {
      return calcRate.toLocaleString("en-US");
    } else {
      return `${calcRate.toLocaleString("en-US")}.00`;
    }
  }

  function calcVD(a, b) {
    const calcVDAmnt = Math.round((a / 100) * b * 100) / 100;
    if (calcVDAmnt % 1 !== 0) {
      return 'calcVDAmnt.toLocaleString("en-US")';
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
      return calcACAmnt.toLocaleString("en-US");
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
      return calcVatAmnt.toLocaleString("en-US");
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
      return calcLnTotalAmnt.toLocaleString("en-US");
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
    let result = convertToWords(naira) + " Naira"; // Convert Naira
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
    new Map(filteredAgencyMPOs.map((item) => [item.mpoNumber, item])).values()
  );

  return (
    <>
      <div className="invoiceCon">
        <header>
          <div className="title">
            <h1>invoice</h1>
          </div>
          <div className="header">
            <div className="address-box">
              <li>The Media Buyer</li>
              <li>
                {filteredMpoNums.length < 1 ? "" : filteredMpoNums[0].agency}
              </li>
              <li>Lagos</li>
            </div>
            <div className="invoice-details-box">
              <ul>
                <li className="noPrint">
                  <b>AGENCY: </b>
                  <select onChange={(e) => setSelectedAgency(e.target.value)}>
                    <option value="" selected>
                      Select Agency
                    </option>
                    {uniqueAgency.map((mpo) => (
                      <option key={mpo.agency} value={mpo.agency}>
                        {mpo.agency}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  <b>MPO NO: </b>
                  <select onChange={(e) => setSelectedValue(e.target.value)}>
                    <option value="" selected>
                      Select MPO No.
                    </option>
                    {uniqueMPONums.length < 1
                      ? ""
                      : uniqueMPONums.map((mpo) => (
                          <option key={mpo.index} value={mpo.mpoNumber}>
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
              {`AG${getMonthText()}24/${
                filteredAgencyMPOs.length < 1
                  ? ""
                  : findInvNumber() < 10
                  ? `0${findInvNumber()}`
                  : findInvNumber()
              }`}
            </div>
            <div>
              MONTH:{" "}
              <select onChange={handleSelectedMonth}>
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
                <tr key={item.index}>
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
              <tr className="emptyDiv">
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
                  {filteredMpoNums.length < 1
                    ? ""
                    : `${
                        returnTotalRate() % 1 !== 0
                          ? `${returnTotalRate().toLocaleString("en-US")}`
                          : `${returnTotalRate().toLocaleString("en-US")}.00`
                      }`}
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
                : numberToWordsInNaira(returnTotalRate())}
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
