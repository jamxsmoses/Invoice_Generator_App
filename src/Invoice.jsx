import { useState } from "react";
import "./Header.css";
import "./Invoice.css";
import signature from "./assets/Signature.png";

const mpos = [
  {
    mpoNumber: `250300256`,
    Agency: "Media Perspectives",
    client: "Mondelez Cadbury",
    brand: `Bournvita`,
    campaign: "Bournvita ",
    duration: "60 secs",
    material: "MTN Counsumer Marketing Precoms",
    specification: "Midnews on NTA Port Harcourt",
    spots: 5,
    rate: 900000,
    volumeDiscount: 27,
    agencyCommission: 15,
    vat: 7.5,
  },
  {
    mpoNumber: `250314634`,
    Agency: "Media Perspectives",
    client: "Mondelez Cadbury",
    brand: `Bournvita`,
    campaign: "Bournvita ",
    duration: "30 secs",
    material: "Bournvita Tastes Good",
    specification: "NTA Network News",
    spots: 5,
    rate: 500000,
    volumeDiscount: 27,
    agencyCommission: 15,
    vat: 7.5,
  },
  {
    mpoNumber: `253948372`,
    Agency: "PHD Media",
    client: "Mondelez Cadbury",
    brand: `Bournvita`,
    campaign: "Bournvita ",
    duration: "15 secs",
    material: "Bournvita Tastes Good",
    specification: "NTA Network News",
    spots: 5,
    rate: 400000,
    volumeDiscount: 27,
    agencyCommission: 15,
    vat: 7.5,
  },
];

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

// console.log(mpos[0].total);

let num = 1;

export default function Invoice() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [invoiceNum, setInvoiceNum] = useState(num);

  const addInvNum = () => {
    setInvoiceNum(num++);
  };

  const invNumInput = (e) => {
    setInvoiceNum(e.target.value);
  };

  const subInvNum = () => {
    if (num === 0) {
      return;
    } else {
      setInvoiceNum(num--);
    }
  };

  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSelectedMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filtered = mpos.filter((el) => el.mpoNumber === selectedValue);

  function calcRateTotal(a, b) {
    return (a * b).toLocaleString("en-US");
  }

  function calcVD(a, b) {
    return ((a / 100) * b).toLocaleString("en-US");
  }

  function calcAC(a, b, c, d) {
    const rateTotal = a * b;
    const vdAmount = (c / 100) * rateTotal;
    const rem = rateTotal - vdAmount;
    return ((d / 100) * rem).toLocaleString("en-US");
  }

  function calcVatAmount(a, b, c, d, e) {
    const rateTotal = a * b;
    const vdAmount = (c / 100) * rateTotal;
    const rem = rateTotal - vdAmount;
    const acAmount = (d / 100) * rem;
    const rem2 = rem - acAmount;
    const vatAmount = (e / 100) * rem2;
    return vatAmount.toLocaleString("en-US");
  }

  function calcLineTotal(a, b, c, d, e) {
    const rateTotal = a * b;
    const vdAmount = (c / 100) * rateTotal;
    const rem = rateTotal - vdAmount;
    const acAmount = (d / 100) * rem;
    const rem2 = rem - acAmount;
    const vatAmount = (e / 100) * rem2;
    return (vatAmount + rem2).toLocaleString("en-US");
  }

  const calcTotalRate = () => {
    if (filtered.length < 1) {
      return;
    } else {
      filtered.forEach((mpo) => {
        const rateTotal = mpo.spots * mpo.rate;
        const vdAmount = (mpo.volumeDiscount / 100) * rateTotal;
        const rem1 = rateTotal - vdAmount;
        const acAmount = (mpo.agencyCommission / 100) * rem1;
        const rem2 = rem1 - acAmount;
        const vatAmount = (mpo.vat / 100) * rem2;
        mpo.total = rem2 + vatAmount;
      });
    }
  };
  calcTotalRate();

  const returnTotalRate = () => {
    if (filtered.length < 1) {
      return;
    } else {
      let totalValue = 0;
      filtered.forEach((mpo) => {
        totalValue = totalValue + mpo.total;
      });
      console.log(totalValue);

      return totalValue.toLocaleString("en-US");
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

  return (
    <>
      <header>
        <div className="title">
          <h1>invoice</h1>
        </div>
        <div className="header">
          <div className="address-box">
            <li>The Media Buyer</li>
            <li>{filtered.length < 1 ? "" : filtered[0].Agency}</li>
            <li>Lagos</li>
          </div>
          <div className="invoice-details-box">
            <ul>
              <li>
                <b>MPO NO: </b>
                <select onChange={handleSelect}>
                  <option value="" selected>
                    Select MPO No.
                  </option>
                  {mpos.map((mpo) => (
                    <option key={mpo.index} value={mpo.mpoNumber}>
                      {mpo.mpoNumber}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <b>CLIENT: </b>
                {filtered.length < 1 ? "" : filtered[0].client}
              </li>
              <li>
                <b>BRAND: </b>
                {filtered.length < 1 ? "" : filtered[0].brand}
              </li>
              <li>
                <b>CAMPAIGN: </b>
                {filtered.length < 1 ? "" : filtered[0].campaign}
              </li>
              <li>
                <b>INVOICE DATE:</b>
                {}
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
              invoiceNum < 10 ? `0${invoiceNum}` : invoiceNum
            }`}
            <div className="noPrint">
              <span onClick={addInvNum}>+</span>
              <span onClick={subInvNum}>-</span>
              <input
                type="text"
                onChange={invNumInput}
                placeholder="your number here"
              />
            </div>
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
            <tr>
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
            {filtered.map((item) => (
              <tr key={item.index}>
                <td className="center">{filtered.indexOf(item) + 1}</td>
                <td className="left">{item.material}</td>
                <td className="center">{item.duration}</td>
                <td className="left">{item.specification}</td>
                <td className="center">{item.spots}</td>
                <td className="right">{item.rate.toLocaleString("en-US")}</td>
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
                {returnTotalRate()}
              </td>
            </tr>
          </tbody>
        </table>
        {/* Amount in words */}
        <div className="amountInWords">
          <p>Amount in words</p>
          <input type="text" />
        </div>
        <div className="salutation">
          <p>Thanks</p>
          <p>Best Regards</p>
          <img src={signature} alt={signature} />
          <p>Ojibo Emmanuel</p>
        </div>
      </main>
    </>
  );
}
