import React, { useState } from "react";
import { db } from "../config/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import "./NewMpo.css";

export default function NewMpo() {
  const [selectedAgency, setSelectedAgency] = useState("");
  const [selectedMpoNo, setSelectedMpoNo] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedMonth, setselectedMonth] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedSpecification, setSelectedSpecification] = useState("");
  const [selectedSpot, setSelectedSpot] = useState(0);
  const [selectedRate, setSelectedRate] = useState(0);
  const [selectedVDiscount, setSelectedVDiscount] = useState(0);
  const [selectedACommission, setSelectedACommission] = useState(0);
  const [errStyle, setErrStyle] = useState("0%");

  let formData = {};

  formData = {
    agency: selectedAgency,
    mpoNumber: selectedMpoNo,
    client: selectedClient,
    campaign: selectedCampaign,
    brand: selectedBrand,
    month: selectedMonth,
    material: selectedMaterial,
    duration: selectedDuration,
    specification: selectedSpecification,
    spots: Number(selectedSpot),
    rate: Number(selectedRate),
    volumeDiscount: Number(selectedVDiscount),
    agencyCommission: Number(selectedACommission),
    vat: 7.5,
  };

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    // e.preventDefault();
    if (
      !selectedAgency ||
      !selectedMpoNo ||
      !selectedClient ||
      !selectedCampaign ||
      !selectedBrand ||
      !selectedMonth ||
      !selectedMaterial ||
      !selectedDuration ||
      !selectedDuration ||
      selectedSpot === 0 ||
      selectedRate === 0 ||
      selectedVDiscount === 0 ||
      selectedACommission === 0
    ) {
      setErrStyle("100%");
      return;
    } else {
      try {
        await addDoc(collection(db, "MPOS"), formData);
        setSuccessMessage("MPO Details Successfully Saved!");

        // Clear the form
        setErrStyle("0%");
      } catch (error) {
        console.error("Error adding document: ", error);
        setSuccessMessage("Failed to save MPO Details.");
      }
    }
  };

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

  console.log(formData);

  return (
    <>
      <div className="body2">
        <div style={{ width: "100%", margin: "auto" }}>
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
                  <td>Campaign</td>
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
                  <td
                    style={{
                      backgroundColor: `${
                        selectedAgency.length < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <select
                      onChange={(e) => setSelectedAgency(e.target.value)}
                      required
                    >
                      <option value="" selected>
                        ...select agency
                      </option>
                      <option value="Media Perspectives">
                        Media Perspectives
                      </option>
                      <option value="PHD Media">PHD Media</option>
                    </select>
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedMpoNo.length < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <input
                      type="text"
                      required
                      placeholder="...MPO number"
                      onChange={(e) => setSelectedMpoNo(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedClient.length < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <textarea
                      required
                      placeholder="...client"
                      onChange={(e) => setSelectedClient(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedBrand.length < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <input
                      type="text"
                      required
                      placeholder="...brand"
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedCampaign.length < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <textarea
                      required
                      placeholder="...campaign"
                      onChange={(e) => setSelectedCampaign(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedMonth.length < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <select
                      onChange={(e) => setselectedMonth(e.target.value)}
                      required
                    >
                      <option value="" selected>
                        ...select month
                      </option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedMaterial.length < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <textarea
                      required
                      placeholder="...material"
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedDuration.length < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <input
                      type="text"
                      required
                      placeholder="...duration"
                      onChange={(e) => setSelectedDuration(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedSpecification.length < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <textarea
                      required
                      placeholder="...specification"
                      onChange={(e) => setSelectedSpecification(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedSpot.toString() < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <input
                      type="number"
                      required
                      placeholder="...spots"
                      onChange={(e) => setSelectedSpot(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedRate.toString() < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <input
                      type="number"
                      required
                      placeholder="...rate"
                      onChange={(e) => setSelectedRate(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedVDiscount.toString() < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <input
                      type="number"
                      required
                      placeholder="...volume discount"
                      onChange={(e) => setSelectedVDiscount(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: `${
                        selectedACommission.toString() < 1
                          ? "rgb(255, 226, 226)"
                          : "rgb(226, 255, 236)"
                      }`,
                    }}
                  >
                    <input
                      type="number"
                      required
                      placeholder="...agency commission"
                      onChange={(e) => setSelectedACommission(e.target.value)}
                    />
                  </td>
                  <td
                    style={{
                      backgroundColor: "rgb(226, 255, 236)",
                    }}
                  >
                    <input
                      type="number"
                      required
                      placeholder="...VAT"
                      value={formData.vat}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="addBtnCont2">
          <p
            style={{
              margin: "0",
              fontSize: "12px",
              fontStyle: "italic",
              color: "red",
              opacity: errStyle,
            }}
          >
            Unable to add MPO Details. Fill all necessary Fields
          </p>
          <button onClick={handleSubmit}>Add</button>
        </div>
        <span>{successMessage}</span>
      </div>
    </>
  );
}
