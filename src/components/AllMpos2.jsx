import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import "./NewMpo.css";
import Loading from "./Loading";
import "./AllMpos.css";
import Chart from "../charts/Chart";

export default function AllMpos2() {
  const [currAgencyMpos, setCurrAgencyMpos] = useState("All");
  const [mpoList, setMpoList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  // const [filteredMpoNums, setFilteredMpoNums] = useState("");
  // const [clientInput, setClientInput] = useState("");
  // const [clientResults, setClientResults] = useState([]);

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

  const clearFilters = () => {
    // setClientInput("");
    setSelectedBrand("");
    // setClientResults("");
    // setFilteredMpoNums("");
  };

  let filtered = mpos;

  // function handleMPOs(e) {
  //   setFilteredMpoNums(e.target.value);
  // }

  const filteredMPOSbyAgency =
    currAgencyMpos === "All"
      ? mpos
      : mpos.filter((mpo) => mpo.agency === currAgencyMpos);

  // function handleClient(e) {
  //   setClientInput(e.target.value);
  //   const filteredClient = mpos.filter((item) => {
  //     const regex = new RegExp(`(${clientInput.split("").join(".*")})`, "i");
  //     return regex.test(item.client);
  //   });

  //   // setFilteredClients(e.target.value);
  //   setClientResults(filteredClient);
  // }

  // if (clientInput.length < 1 || filteredMpoNums === "") {
  //   filtered = mpos;
  // } else {
  //   if (clientInput.length > 0) {
  //     filtered = clientResults;
  //   } else if (filteredMpoNums.length === 10) {
  //     filtered = mpos.filter((mpo) => mpo.mpoNumber === filteredMpoNums);
  //   }
  //   // setIsFiltered(true);
  // }

  // console.log(clientInput.length, filteredMpoNums.length);

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
    if (filteredMPOSbyAgency.length < 1) {
      return;
    } else {
      let totalSpots = 0;
      filteredMPOSbyAgency.forEach((mpo) => {
        totalSpots = totalSpots + mpo.spots;
      });

      return totalSpots;
    }
  };

  const returnTotalUnitRate = () => {
    if (filteredMPOSbyAgency.length < 1) {
      return;
    } else {
      let totalUnitRate = 0;
      filteredMPOSbyAgency.forEach((mpo) => {
        totalUnitRate = totalUnitRate + mpo.rate;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainTotalValue = Math.round(totalUnitRate * 100) / 100;

      return mainTotalValue;
    }
  };

  const returnTotalGrossRate = () => {
    if (mpos.length < 1) {
      return;
    } else {
      let totalGrossRate = 0;
      mpos.forEach((mpo) => {
        totalGrossRate = totalGrossRate + mpo.spots * mpo.rate;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainTotalValue = Math.round(totalGrossRate * 100) / 100;

      return mainTotalValue;
    }
  };

  const returnTotalGrossRate2 = () => {
    if (filteredMPOSbyAgency.length < 1) {
      return;
    } else {
      let totalGrossRate = 0;
      filteredMPOSbyAgency.forEach((mpo) => {
        totalGrossRate = totalGrossRate + mpo.spots * mpo.rate;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainTotalValue = Math.round(totalGrossRate * 100) / 100;

      return mainTotalValue;
    }
  };

  const returnTotalRate = () => {
    if (filteredMPOSbyAgency.length < 1) {
      return;
    } else {
      let totalValue = 0;
      filteredMPOSbyAgency.forEach((mpo) => {
        totalValue = totalValue + mpo.total;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainTotalValue = Math.round(totalValue * 100) / 100;

      return mainTotalValue;
    }
  };

  const returnTotalRate2 = () => {
    if (filtered.length < 1) {
      return;
    } else {
      let totalValue = 0;
      mpos.forEach((mpo) => {
        totalValue = totalValue + mpo.total;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainTotalValue = Math.round(totalValue * 100) / 100;

      return mainTotalValue;
    }
  };

  // const filteredAgency = mpos.filter((el) => el.agency === "PHD Media");
  // console.log(filteredAgency[0].rate);

  const uniqueFiltered = Array.from(
    new Map(filtered.map((item) => [item.brand, item])).values()
  );

  const uniqueAgency = Array.from(
    new Map(mpos.map((item) => [item.agency, item])).values()
  );

  selectedBrand.length < 1
    ? (filtered = mpos)
    : (filtered = filtered.filter((item) => item.brand === selectedBrand));

  console.log(currAgencyMpos);

  return (
    <>
      <div className="body allMposBody">
        <div className="dashboard">
          <div
            className="box box1 incomes-container"
            style={{ gap: filtered.length < 1 ? "60px" : "15px" }}
          >
            <div>
              <span className="span">Total Gross Income</span>
              <div style={{ position: "relative" }}>
                {filtered.length < 1 ? (
                  <Loader />
                ) : (
                  <h1
                    style={{
                      boxSizing: "border-box",
                      padding: "5px",
                      backgroundColor: "#ffffff18",
                      color: "#27a5ff",
                      borderRadius: "5px",
                    }}
                  >
                    {filtered.length < 1
                      ? ""
                      : `${
                          returnTotalGrossRate() % 1 !== 0
                            ? `${returnTotalGrossRate().toLocaleString(
                                "en-US"
                              )}`
                            : `${returnTotalGrossRate().toLocaleString(
                                "en-US"
                              )}.00`
                        }`}
                  </h1>
                )}
              </div>
            </div>
            <div>
              <span className="span">Total Net Income</span>

              <div style={{ position: "relative" }}>
                {filtered.length < 1 ? (
                  <Loader />
                ) : (
                  <h1
                    style={{
                      boxSizing: "border-box",
                      padding: "5px",
                      backgroundColor: "#ffffff18",
                      color: "#27a5ff",
                      borderRadius: "5px",
                    }}
                  >
                    {filtered.length < 1
                      ? ""
                      : `${
                          returnTotalRate2() % 1 !== 0
                            ? `${returnTotalRate2().toLocaleString("en-US")}`
                            : `${returnTotalRate2().toLocaleString("en-US")}.00`
                        }`}
                  </h1>
                )}
              </div>
            </div>
          </div>
          <div className="box box2"></div>
          <div className="box" style={{ flex: "1.5", height: "100%" }}>
            <Chart />
          </div>
        </div>
        <div className="allMposCont">
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "60px",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h1>All MPOs</h1>
              <div className="mposFilterCon">
                <select onChange={(e) => setCurrAgencyMpos(e.target.value)}>
                  <option value={"All"} defaultValue>
                    All Agencies
                  </option>
                  {uniqueAgency.map((mpo) => (
                    <option value={mpo.agency} key={mpo.agency}>
                      {mpo.agency}
                    </option>
                  ))}
                </select>
              </div>
              <button
                style={{
                  backgroundColor: `${
                    filtered === mpos ? "#0675c3" : "OrangeRed"
                  }`,
                  padding: "6px 15px",
                  border: "none",
                  fontSize: "16px",
                  borderRadius: "16px",
                  outline: "none",
                }}
                onClick={clearFilters}
              >
                Clear FIlters
              </button>
            </div>
            <hr style={{ marginBottom: "10px", marginTop: "-10px" }} />
          </div>
          <div className="outerDiv animate__animated animate__fadeIn">
            <div className="innerDiv">
              <table>
                <thead className="filter-thead">
                  <tr>
                    <td></td>
                    <td>
                      <input
                        type="text"
                        placeholder="...search by MPO number"
                      />
                    </td>
                    <td>
                      <input type="text" placeholder="...search by client" />
                    </td>
                    <td>
                      <select
                        onChange={(e) => setSelectedBrand(e.target.value)}
                      >
                        <option value="" selected>
                          Select Brand
                        </option>
                        {uniqueFiltered.map((item) => (
                          <option key={item.brand}>{item.brand}</option>
                        ))}
                      </select>
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
                  {filteredMPOSbyAgency.length < 1 ? (
                    <tr className="specialTR">
                      <Loading />
                    </tr>
                  ) : (
                    filteredMPOSbyAgency.map((mpo) => (
                      <tr key={mpo.index} className="specialTR">
                        <td className="short">
                          {filteredMPOSbyAgency.indexOf(mpo) + 1}
                        </td>
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
                    ))
                  )}

                  <tr
                    style={{
                      backgroundColor: "#00101c",
                      color: "white",
                      border: "none",
                    }}
                  >
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
                    <td>
                      {filtered.length < 1
                        ? ""
                        : `${
                            returnTotalGrossRate2() % 1 !== 0
                              ? `${returnTotalGrossRate2().toLocaleString(
                                  "en-US"
                                )}`
                              : `${returnTotalGrossRate2().toLocaleString(
                                  "en-US"
                                )}.00`
                          }`}
                    </td>
                    <td className="rightbd"></td>
                    <td className="rightbd"></td>
                    <td className="rightbd"></td>
                    <td className="rightbd"></td>
                    <td className="rightbd"></td>
                    <td className="rightbd"></td>
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

          <div style={{ width: "100%", textAlign: "right" }}>
            <span style={{ fontSize: "14px" }}>Total Net: </span>
            <span
              className="totalFigure"
              style={{
                fontSize: "22px",
                fontWeight: "600",
                backgroundColor: "#00101c",
                boxSizing: "border-box",
                padding: "0px 15px 0px 15px",
                color: "white",
              }}
            >
              ₦
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

function Loader() {
  return (
    <div className="loading">
      <span>Loading Data</span>
    </div>
  );
}
