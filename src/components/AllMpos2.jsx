import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import "./NewMpo.css";
import Loading from "./Loading";
import "./AllMpos.css";

export default function AllMpos2() {
  const [mpoList, setMpoList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [filteredMpoNums, setFilteredMpoNums] = useState("");

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

  const mpos = mpoList;

  let filtered = mpos;

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
        mpo.total = Math.round((rem2 + vatAmount) * 100) / 100;
      });
    }
  };
  calcTotalRate();

  const returnTotalSpots = () => {
    if (filtered.length < 1) {
      return;
    } else {
      let totalSpots = 0;
      filtered.forEach((mpo) => {
        totalSpots = totalSpots + mpo.spots;
      });

      return totalSpots;
    }
  };

  const returnTotalUnitRate = () => {
    if (filtered.length < 1) {
      return;
    } else {
      let totalUnitRate = 0;
      filtered.forEach((mpo) => {
        totalUnitRate = totalUnitRate + mpo.rate;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainTotalValue = Math.round(totalUnitRate * 100) / 100;

      return mainTotalValue;
    }
  };

  const returnTotalGrossRate = () => {
    if (filtered.length < 1) {
      return;
    } else {
      let totalGrossRate = 0;
      filtered.forEach((mpo) => {
        totalGrossRate = totalGrossRate + mpo.spots * mpo.rate;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainTotalValue = Math.round(totalGrossRate * 100) / 100;

      return mainTotalValue;
    }
  };

  const returnTotalRate = () => {
    if (filtered.length < 1) {
      return;
    } else {
      let totalValue = 0;
      filtered.forEach((mpo) => {
        totalValue = totalValue + mpo.total;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainTotalValue = Math.round(totalValue * 100) / 100;

      return mainTotalValue;
    }
  };

  function handleMPOs(e) {
    setFilteredMpoNums(e.target.value);
  }

  const filteredAgency = mpos.filter((el) => el.agency === "PHD Media");
  // console.log(filteredAgency[0].rate);

  return (
    <>
      <div className="body allMposBody">
        <div className="dashboard">
          <div className="incomes-container">
            <div>
              <span>Total Gross Income</span>
              <h1>
                {filtered.length < 1
                  ? ""
                  : `${
                      returnTotalGrossRate() % 1 !== 0
                        ? `${returnTotalGrossRate().toLocaleString("en-US")}`
                        : `${returnTotalGrossRate().toLocaleString("en-US")}.00`
                    }`}
              </h1>
            </div>
            <div>
              <span>Total Net Income</span>
              <h1>
                {filtered.length < 1
                  ? ""
                  : `${
                      returnTotalRate() % 1 !== 0
                        ? `${returnTotalRate().toLocaleString("en-US")}`
                        : `${returnTotalRate().toLocaleString("en-US")}.00`
                    }`}
              </h1>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
        <div className="allMposCont">
          <div>
            <h1>All MPOs</h1>
            <hr style={{ marginBottom: "10px", marginTop: "-20px" }} />
          </div>
          {filtered.length < 1 ? (
            <Loading />
          ) : (
            <div className="outerDiv animate__animated animate__fadeIn">
              <div className="innerDiv">
                <table>
                  <thead className="filter-thead">
                    <tr>
                      <td></td>
                      <td>
                        <input
                          type="text"
                          onChange={handleMPOs}
                          placeholder="...search by MPO number"
                        />
                      </td>
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
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <td>SN</td>
                      <td>MPO No.</td>
                      <td>Client</td>
                      <td>Brand</td>
                      <td>Campaign</td>
                      <td style={{ textAlign: "center" }}>Month</td>
                      <td>Title of Material</td>
                      <td style={{ textAlign: "center" }}>Duration</td>
                      <td>Specification</td>
                      <td style={{ textAlign: "center" }}>Spots</td>
                      <td>Rate</td>
                      <td>Gross Total</td>
                      <td style={{ textAlign: "center" }}>V.D</td>
                      <td>V.D Amount</td>
                      <td style={{ textAlign: "center" }}>A.C</td>
                      <td>A.C Amount</td>
                      <td style={{ textAlign: "center" }}>VAT</td>
                      <td>VAT Amount</td>
                      <td style={{ borderRight: "none" }}>Net Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((mpo) => (
                      <tr key={mpo.index}>
                        <td className="short">{filtered.indexOf(mpo) + 1}</td>
                        <td>{mpo.mpoNumber}</td>
                        <td className="long">{mpo.client}</td>
                        <td>{mpo.brand}</td>
                        <td className="long">{mpo.campaign}</td>
                        <td style={{ textAlign: "center" }}>{mpo.month}</td>
                        <td className="vLong">{mpo.material}</td>
                        <td style={{ textAlign: "center" }}>{mpo.duration}</td>
                        <td className="vLong">{mpo.specification}</td>
                        <td className="short" style={{ textAlign: "center" }}>
                          {mpo.spots}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {mpo.rate % 1 !== 0
                            ? mpo.rate.toLocaleString("en-US")
                            : `${mpo.rate.toLocaleString("en-US")}.00`}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {calcRateTotal(mpo.spots, mpo.rate)}
                        </td>
                        <td className="short" style={{ textAlign: "center" }}>
                          {mpo.volumeDiscount}%
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {calcVD(mpo.volumeDiscount, mpo.rate * mpo.spots)}
                        </td>
                        <td className="short" style={{ textAlign: "center" }}>
                          {mpo.agencyCommission}%
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {calcAC(
                            mpo.spots,
                            mpo.rate,
                            mpo.volumeDiscount,
                            mpo.agencyCommission
                          )}
                        </td>
                        <td className="short" style={{ textAlign: "center" }}>
                          {mpo.vat}%
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {calcVatAmount(
                            mpo.spots,
                            mpo.rate,
                            mpo.volumeDiscount,
                            mpo.agencyCommission,
                            mpo.vat
                          )}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {calcLineTotal(
                            mpo.spots,
                            mpo.rate,
                            mpo.volumeDiscount,
                            mpo.agencyCommission,
                            mpo.vat
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="rightbd"></td>
                      <td className="rightbd"></td>
                      <td className="rightbd"></td>
                      <td className="rightbd"></td>
                      <td className="rightbd"></td>
                      <td className="rightbd"></td>
                      <td className="rightbd"></td>
                      <td className="rightbd"></td>
                      <td className="rightbd"></td>
                      <td className="totals" style={{ textAlign: "center" }}>
                        {filtered.length < 1 ? "" : `${returnTotalSpots()}`}
                      </td>
                      <td className="totals">
                        {filtered.length < 1
                          ? ""
                          : `${
                              returnTotalUnitRate() % 1 !== 0
                                ? `${returnTotalUnitRate().toLocaleString(
                                    "en-US"
                                  )}`
                                : `${returnTotalUnitRate().toLocaleString(
                                    "en-US"
                                  )}.00`
                            }`}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className="totals">
                        {filtered.length < 1
                          ? ""
                          : `${
                              returnTotalRate() % 1 !== 0
                                ? `${returnTotalRate().toLocaleString("en-US")}`
                                : `${returnTotalRate().toLocaleString(
                                    "en-US"
                                  )}.00`
                            }`}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div>
            <span className="totalFigure">
              {filtered.length < 1
                ? ""
                : `${
                    returnTotalRate() % 1 !== 0
                      ? `${returnTotalRate().toLocaleString("en-US")}`
                      : `${returnTotalRate().toLocaleString("en-US")}.00`
                  }`}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
