import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import "./MPChart.css";

export default function MPChart() {
  const [mpoList, setMpoList] = useState([]);

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

  filtered = mpos.filter((mpo) => mpo.agency === "Media Perspectives");

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

  const janGross = Math.round(totalMonthGross(jan) / 1000000);
  const febGross = Math.round(totalMonthGross(feb) / 1000000);
  const marGross = Math.round(totalMonthGross(mar) / 1000000);
  const aprGross = Math.round(totalMonthGross(apr) / 1000000);
  const mayGross = Math.round(totalMonthGross(may) / 1000000);
  const junGross = Math.round(totalMonthGross(jun) / 1000000);
  const julGross = Math.round(totalMonthGross(jul) / 1000000);
  const augGross = Math.round(totalMonthGross(aug) / 1000000);
  const sepGross = Math.round(totalMonthGross(sep) / 1000000);
  const octGross = Math.round(totalMonthGross(oct) / 1000000);
  const novGross = Math.round(totalMonthGross(nov) / 1000000);
  const decGross = Math.round(totalMonthGross(dec) / 1000000);

  const janFig = Math.round(totalMonthNet(jan) / 1000000);
  const febFig = Math.round(totalMonthNet(feb) / 1000000);
  const marFig = Math.round(totalMonthNet(mar) / 1000000);
  const aprFig = Math.round(totalMonthNet(apr) / 1000000);
  const mayFig = Math.round(totalMonthNet(may) / 1000000);
  const junFig = Math.round(totalMonthNet(jun) / 1000000);
  const julFig = Math.round(totalMonthNet(jul) / 1000000);
  const augFig = Math.round(totalMonthNet(aug) / 1000000);
  const sepFig = Math.round(totalMonthNet(sep) / 1000000);
  const octFig = Math.round(totalMonthNet(oct) / 1000000);
  const novFig = Math.round(totalMonthNet(nov) / 1000000);
  const decFig = Math.round(totalMonthNet(dec) / 1000000);

  return (
    <>
      <div
        className="chartContainer animate__animated animate__fadeIn"
        style={{ padding: `${filtered.length < 1 ? "0px" : "5px"}` }}
      >
        {filtered.length < 1 ? (
          <Loader />
        ) : (
          <table className="phdTable">
            <tbody>
              <tr className="tr1">
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${janGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${janFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${febGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${febFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${marGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${marFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${aprGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${aprFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${mayGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${mayFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${junGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${junFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${julGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${julFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${augGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${augFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${sepGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${sepFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${octGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${octFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${novGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${novFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="monthChart">
                    <div className="bar" style={{ height: `${decGross}%` }}>
                      <div
                        className="netBar"
                        style={{ height: `${decFig}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
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
            </tbody>
          </table>
        )}
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
