import React, { useState } from "react";
import { db } from "../config/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import "./NewMpo.css";

export default function NewMpo() {
  //   const [selectedAgency, setSelectedAgency] = useState("");
  //   const [selectedMonth, setselectedMonth] = useState("January");
  const [formData, setFormData] = useState({
    agency: "",
    mpoNumber: "",
    client: "",
    brand: "",
    month: "",
    material: "",
    duration: "",
    specification: "",
    spots: 0,
    rate: 0,
    volumeDiscout: 0,
    agencyCommission: 0,
    vat: 0,
  });

  const handleChange = (e) => {
    // const [agency, setAgency] = useState("");
  };

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "MPOS"), formData);
      setSuccessMessage("User information saved successfully!");
      setFormData({
        agency: "",
        mpoNumber: "",
        client: "",
        brand: "",
        month: "",
        material: "",
        duration: "",
        specification: "",
        spots: 0,
        rate: 0,
        volumeDiscout: 0,
        agencyCommission: 0,
        vat: 0,
      }); // Clear the form
    } catch (error) {
      console.error("Error adding document: ", error);
      setSuccessMessage("Failed to save user information.");
    }
  };

  //   function trackAgency(e) {
  //     setSelectedAgency(e.target.value);
  //   }

  //   function trackMonth(e) {
  //     setselectedMonth(e.target.value);
  //   }

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

  return (
    <>
      <div className="body2">
        <div style={{ width: "98%", margin: "auto" }}>
          <h1>New MPO</h1>
          <hr style={{ marginBottom: "10px", marginTop: "-20px" }} />
        </div>

        <div className="outerDiv2">
          <div className="innerDiv2">
            <table>
              <thead>
                <tr>
                  <td>Agency</td>
                  <td>MPO No.</td>
                  <td>Client</td>
                  <td>Brand</td>
                  <td>Month</td>
                  <td>Material</td>
                  <td>Duration</td>
                  <td>Specification</td>
                  <td>Spots</td>
                  <td>Rate</td>
                  <td>V.Discount</td>
                  <td>A.Commission</td>
                  <td>VAT</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select onChange={handleChange}>
                      <option value="Media Perspectives">
                        Media Perspectives
                      </option>
                      <option value="PHD Media">PHD Media</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <select onChange={handleChange}>
                      {months.map((month) => (
                        <option key={month}>{month}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                  <td>
                    <input type="number" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="addBtnCont2">
          <button onClick={handleSubmit}>Add</button>
        </div>
        <span>{successMessage}</span>
      </div>
    </>
  );
}
