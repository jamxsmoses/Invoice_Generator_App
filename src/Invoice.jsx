import { useState } from "react";
import "./Header.css";
import "./Invoice.css";

const mpos = [
  {
    mpoNumber: `250300256`,
    client: "Mondelez Cadbury",
    brand: `Bournvita`,
    campaign: "Bournvita ",
    duration: "30 secs",
    material: "MTN Counsumer Marketing Precoms",
    specification: "Midnews on NTA Port Harcourt",
    spots: 5,
    rate: 500000,
    volumeDiscount: 27,
    agencyCommission: 15,
    vat: 7.5,
  },
  {
    mpoNumber: `250314634`,
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
    mpoNumber: `250314634`,
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
];

console.log(mpos[0].total);

export default function Invoice() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (e) => {
    setSelectedValue(e.target.value);
  };

  const filtered = mpos.filter(checkMpoNum);

  function checkMpoNum() {
    return selectedValue;
  }

  console.log(selectedValue);

  console.log(filtered);

  const selectedMpo = mpos.find((mpo) => mpo.mpoNumber === selectedValue);

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

  const totalRate = filtered.reduce((accum, mpo) => accum + mpo.rate, 0);

  console.log(totalRate);

  return (
    <>
      <header>
        <div className="title">
          <h1>invoice</h1>
        </div>
        <div className="header">
          <div className="address-box">
            <li>The Media Buyer</li>
            <li>{`Media Perspectives`}</li>
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
          <div>INVOICE NO: {}</div>
          <div>
            MONTH:{" "}
            <select>
              <option value="January">January</option>
              <option value="Februbary">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
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
                {totalRate.toLocaleString("en-US")}
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
