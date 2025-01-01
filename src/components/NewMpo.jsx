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
  const [selectedSpot, setSelectedSpot] = useState("");
  const [selectedRate, setSelectedRate] = useState("");
  const [selectedVDiscount, setSelectedVDiscount] = useState("");
  const [selectedACommission, setSelectedACommission] = useState("");
  const [selectedVAT, setSelectedVAT] = useState("");
  const [selectedSn, setSelectedSn] = useState("");
  const [errStyle, setErrStyle] = useState("0%");

  let formData = {};

  formData = {
    sn: selectedSn,
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
    vat: Number(selectedVAT),
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
      selectedSpot < 0 ||
      selectedRate < 0 ||
      selectedVDiscount < 0 ||
      selectedACommission < 0 ||
      selectedVAT < 0
    ) {
      setErrStyle("100%");
      setSuccessMessage(
        "Unable to upload MPO!!! Fill all the necessary fields."
      );
      setTimeout(() => {
        setErrStyle("0%");
        setSuccessMessage("");
      }, 2000);
      return;
    } else {
      try {
        await addDoc(collection(db, "MPOS"), formData);

        setErrStyle("100%");
        setSuccessMessage("MPO Details Successfully Saved!");
        setTimeout(() => {
          setErrStyle("0%");
          setSuccessMessage("");
        }, 2000);
      } catch (error) {
        console.error("Error adding document: ", error);
        setErrStyle("100%");
        setSuccessMessage("Failed to upload MPO!!");
        setTimeout(() => {
          setErrStyle("0%");
          setSuccessMessage("");
        }, 2000);
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

  const spotString = selectedSpot.toString();
  const rateString = selectedRate.toString();
  const vdString = selectedVDiscount.toString();
  const acString = selectedACommission.toString();
  const vatString = selectedVAT.toString();

  return (
    <>
      <div className="body2">
        <div style={{ width: "100%", margin: "auto" }}>
          <h1>New MPO</h1>
          <hr style={{ marginBottom: "10px", marginTop: "-20px" }} />
        </div>

        <div className="outerDiv2">
          <div className="innerDiv2">
            <div style={{ width: "100%" }}>
              <table>
                <thead>
                  <tr>
                    <td>S/N</td>
                    <td>Agency</td>
                    <td>MPO No.</td>
                    <td>Client</td>
                    <td>Brand</td>
                    <td>Campaign</td>
                    <td>Month</td>
                    <td>Material</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: `${
                          selectedSn < 1
                            ? "rgb(255, 226, 226)"
                            : "rgb(226, 255, 236)"
                        }`,
                      }}
                    >
                      <input
                        type="number"
                        required
                        placeholder="...S/N"
                        onChange={(e) => setSelectedSn(e.target.value)}
                      />
                    </td>
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
                        <option value="" defaultValue>
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
                        <option value="" defaultValue>
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
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ width: "100%" }}>
              <table>
                <thead>
                  <tr>
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
                        onChange={(e) =>
                          setSelectedSpecification(e.target.value)
                        }
                      />
                    </td>
                    <td
                      style={{
                        backgroundColor: `${
                          spotString.length < 1
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
                          rateString.length < 1
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
                          vdString.length < 1
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
                          acString.length < 1
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
                        backgroundColor: `${
                          vatString.length < 1
                            ? "rgb(255, 226, 226)"
                            : "rgb(226, 255, 236)"
                        }`,
                      }}
                    >
                      <input
                        type="number"
                        required
                        placeholder="...VAT"
                        onChange={(e) => setSelectedVAT(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
            {successMessage}
          </p>
          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </>
  );
}
