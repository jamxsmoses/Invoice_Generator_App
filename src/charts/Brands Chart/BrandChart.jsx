import React, { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import "./Chart.css";

export default function Chart() {
  const [mpoList, setMpoList] = useState([]);
  const [currentChart, setCurrentChart] = useState("PHD Media");

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
  let filtered;

  const uniqueAgency = Array.from(
    new Map(mpos.map((item) => [item.agency, item])).values()
  );

  if (currentChart === "PHD Media") {
    filtered = mpos.filter((mpo) => mpo.agency === "PHD Media");
  } else if (currentChart === "Media Perspectives") {
    filtered = mpos.filter((mpo) => mpo.agency === "Media Perspectives");
  }

  // phd filtered months
  const jan = filtered.filter((mpo) => mpo.month === "January");
  const feb = filtered.filter((mpo) => mpo.month === "Februar");
  const mar = filtered.filter((mpo) => mpo.month === "March");
  const apr = filtered.filter((mpo) => mpo.month === "April");
  const may = filtered.filter((mpo) => mpo.month === "May");
  const jun = filtered.filter((mpo) => mpo.month === "June");
  const jul = filtered.filter((mpo) => mpo.month === "July");
  const aug = filtered.filter((mpo) => mpo.month === "August");
  const sep = filtered.filter((mpo) => mpo.month === "September");
  const oct = filtered.filter((mpo) => mpo.month === "October");
  const nov = filtered.filter((mpo) => mpo.month === "November");
  const dec = filtered.filter((mpo) => mpo.month === "December");

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

  const totalMonthGross = (arr) => {
    if (filtered.length < 1) {
      return;
    } else {
      let totalMonthGross = 0;
      arr.forEach((mpo) => {
        totalMonthGross = totalMonthGross + mpo.spots * mpo.rate;
      });
      // console.log(totalValue);
      // totalValue = totalValue.toLocaleString("en-US");
      const mainGross = Math.round(totalMonthGross * 100) / 100;

      return mainGross;
    }
  };

  const totalMonthNet = (arr) => {
    if (filtered.length < 1) {
      return;
    } else {
      let decTotal = 0;
      arr.forEach((mpo) => {
        decTotal = decTotal + mpo.total;
      });

      const mainTotal = Math.round(decTotal * 100) / 100;

      return mainTotal;
    }
  };

  const monthNet = [
    {
      net: Math.round(totalMonthNet(jan) / 1000000),
      gross: Math.round(totalMonthGross(jan) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(feb) / 1000000),
      gross: Math.round(totalMonthGross(feb) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(mar) / 1000000),
      gross: Math.round(totalMonthGross(mar) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(apr) / 1000000),
      gross: Math.round(totalMonthGross(apr) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(may) / 1000000),
      gross: Math.round(totalMonthGross(may) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(jun) / 1000000),
      gross: Math.round(totalMonthGross(jun) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(jul) / 1000000),
      gross: Math.round(totalMonthGross(jul) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(aug) / 1000000),
      gross: Math.round(totalMonthGross(aug) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(sep) / 1000000),
      gross: Math.round(totalMonthGross(sep) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(oct) / 1000000),
      gross: Math.round(totalMonthGross(oct) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(nov) / 1000000),
      gross: Math.round(totalMonthGross(nov) / 1000000),
    },
    {
      net: Math.round(totalMonthNet(dec) / 1000000),
      gross: Math.round(totalMonthGross(dec) / 1000000),
    },
  ];

  return (
    <>
      <div
        className="chartContainer animate__animated animate__fadeIn"
        style={{ padding: `${filtered.length < 1 ? "0px" : "5px"}` }}
      >
        <div className="box3">
          <div
            style={{
              flex: "1",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <select onChange={(e) => setCurrentChart(e.target.value)}>
              {uniqueAgency.map((mpo) => (
                <option key={uniqueAgency.indexOf(mpo)} value={mpo.agency}>
                  {mpo.agency}
                </option>
              ))}
            </select>
            <div></div>
          </div>
          <div
            style={{ flex: "5", height: "100%", backgroundColor: "#cfcfcf" }}
          >
            {filtered.length < 1 ? (
              <Loader />
            ) : (
              <table className="chartTable">
                <tr className="tr1">
                  {monthNet.map((month) => (
                    <td key={monthNet.indexOf(month)}>
                      <div className="monthChart">
                        <div
                          className="bar"
                          style={{ height: `${month.gross}%` }}
                        >
                          <div
                            className="netBar"
                            style={{ height: `${month.net}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="tr2">
                  <td>Jan</td>
                  <td>Feb</td>
                  <td>Mar</td>
                  <td>Apr</td>
                  <td>May</td>
                  <td>Jun</td>
                  <td>Jul</td>
                  <td>Aug</td>
                  <td>Sep</td>
                  <td>Oct</td>
                  <td>Nov</td>
                  <td>Dec</td>
                </tr>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Loader() {
  return (
    <div className="loading2">
      <span>Loading Chart Data</span>
    </div>
  );
}
