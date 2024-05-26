import React from "react";
import baseURL from "../components/config/apiConfig"
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { json, useParams } from "react-router-dom";
import SecondaryNav from "./SecondaryNav";
import { Image, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const { email } = useParams();
  const token = localStorage.getItem("token");

  let [image1, setImage1] = useState(null);
  let [image2, setImage2] = useState(null);

  var [obj, setobj] = useState({
    email: email,
    pic1: image1,
    pic2: image2,
    name: "",
    contact: "",
    address: "",
    village: "",
    city: "",
    aadhaar: "",
    info: "",
  });
  var [fetchingData, setFetchingData] = useState(false);

  const [disabledSave, setDisabledSave] = useState(false);
  const [disabledUpdate, setDisabledUpdate] = useState(true);

  // image preview
  function doPrev1(event) {
    let file = event.target.files[0];
      setobj({ ...obj, ["pic1"]: file }); 
      const imgPrev = document.getElementById("imgPrev1");
      imgPrev.src = URL.createObjectURL(file);
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setImage1(imageUrl);
  }

  function doPrev2(event) {
    let file = event.target.files[0];
    console.log(event.target.files[0].name)
      setobj({ ...obj, ["pic2"]: file }); 
      const imgPrev = document.getElementById("imgPrev2");
      imgPrev.src = URL.createObjectURL(file);
      const imageUrl = URL.createObjectURL(file);
      setImage2(imageUrl);
  }
  

  //-------------------------------------------------- sending profile info---------------------------------

  function doProfile(event) {
    const { name, value } = event.target;
    setobj({ ...obj, [name]: value });
  }

  async function growerProfileAxios() {
    // alert(JSON.stringify(obj));

    let fd = new FormData();
    for (let prop in obj) {
      fd.append(prop, obj[prop]);
    }
    try {
      const url =  `${baseURL}/grower/growerProfile`;

      let respObj = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data",'Authorization':`Bearer ${token}` },
      });
      alert("Profile Saved");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Show an alert to the user
        alert("Session expired. Please log in again.");
  
        window.location.href = "/";
      } else if (error.response) {
        // Handle other error status codes (e.g., 400, 500)
        alert("Error: " + error.response.data.message); // Example: Display specific error message from the backend
      } else {
        alert("Network error or other issue occurred.");
      }
    }
  }
  // ---------------------------------------------------------searching Profile info------------------------
  async function growerProfileSearchAxios() {
    // alert(email)
    let fd = new FormData();
    fd.append("email", email);
    try {
      const url = `${baseURL}/grower/growerProfileSearch`;
      const response = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data",'Authorization':`Bearer ${token}` },
      });
      // alert(JSON.stringify(response.data.result));

      let { pic1, pic2, name, contact, address, village, city, aadhaar, info } =
        response.data.result;

      setobj({
        ...obj,
        pic1,
        pic2,
        name,
        contact,
        address,
        village,
        city,
        aadhaar,
        info,
      });
      // alert(JSON.stringify(obj));
      setImage1(`${baseURL}/` + pic1);
      setImage2(`${baseURL}/` + pic2);

      if (response.data.result.length > 0) {
        setDisabledSave(false);
        setDisabledUpdate(true);
      } else {
        setDisabledUpdate(false);
        setDisabledSave(true);
      }

      // alert("hello1" + JSON.stringify(obj));
      // Handle the response
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Show an alert to the user
        alert("Session expired. Please log in again.");
  
        window.location.href = "/";
      } else if (error.response) {
        // Handle other error status codes (e.g., 400, 500)
        console.log("Error: " + error.response.data.message); // Example: Display specific error message from the backend
      } else {
        console.log("Network error or other issue occurred.");
      }
    }
  }

  // ------------------------------------------------------------updating profile -------------------------------------

  async function updateGrowerProfile() {
    alert(JSON.stringify(obj)); 
    let fd = new FormData();
    try {
      for (let prop in obj) {
        fd.append(prop, obj[prop]);
      }
      const url = `${baseURL}/grower/updateGrowerProfile`;

      const response = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data",'Authorization':`Bearer ${token}` },
      });
      
  
      // alert(JSON.stringify(response.data));
      alert("data updated");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Show an alert to the user
        alert("Session expired. Please log in again.");
  
        window.location.href = "/";
      }else if (error.response) {
        // Handle other error status codes (e.g., 400, 500)
        alert("Error: " + error.response.data.message); // Example: Display specific error message from the backend
      } else {
        alert("Network error or other issue occurred.");
      }
    }
  }

  
  useEffect(() => {
    growerProfileSearchAxios(); // Fetch records on component mount
  }, []);

  return (
    <>
      <SecondaryNav></SecondaryNav>

      <div className="container">
        <Form>
          {/* ---------------------------pictures---------------------- */}
          <div className="row">
            <div className="col-md-6">
              <Col xs={6} md={4}>
                <img
                  // src={"../uploads/" + pic1}
                  id="imgPrev1"
                  src={image1}
                  style={{ width: "200px", height: "200px" }}
                />
              </Col>
            </div>
            <div className="col-md-6">
              <Col xs={6} md={4}>
                <img
                  id="imgPrev2"
                  src={image2}
                  style={{ width: "200px", height: "200px" }}
                />
              </Col>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formFileLg1">
                <Form.Label>Profile pic </Form.Label>
                <Form.Control
                  type="file"
                  size="md"
                  name="pic1"
                  accept="image/*"
                  onChange={doPrev1}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="formFileLg2">
                <Form.Label>ID Proof </Form.Label>
                <Form.Control
                  type="file"
                  size="md"
                  name="pic2"
                  onChange={doPrev2}
                />
              </Form.Group>
            </div>
          </div>
          {/* ---------------------------------------email and Fetch button-----------------------*/}
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  readOnly
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Button variant="primary" onClick={growerProfileSearchAxios}>
                Fetch Records
              </Button>
            </div>
          </div>
          {/* ------------------------------------Name and Contact Number------------------------- */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={obj.name}
                  placeholder="Enter name"
                  onChange={doProfile}
                  name="name"
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group controlId="formBasicContact">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  value={obj.contact}
                  placeholder="Enter contact number"
                  onChange={doProfile}
                  name="contact"
                />
              </Form.Group>
            </div>
          </div>

          {/* ---------------------------------------------------Address and Village------------------- */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={obj.address}
                  placeholder="Enter address"
                  onChange={doProfile}
                  name="address"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="formBasicVillage">
                <Form.Label>Village</Form.Label>
                <Form.Control
                  type="text"
                  value={obj.village}
                  placeholder="Enter village"
                  onChange={doProfile}
                  name="village"
                />
              </Form.Group>
            </div>
          </div>

          {/* ------------------------------------------------City and Aadhaar Card----------------------------- */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={obj.city}
                  placeholder="Enter city"
                  onChange={doProfile}
                  name="city"
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group controlId="formBasicAdharCard">
                <Form.Label>Adhar Card No.</Form.Label>
                <Form.Control
                  type="text"
                  value={obj.aadhaar}
                  placeholder="Enter Aadhar card number"
                  onChange={doProfile}
                  name="aadhaar"
                />
              </Form.Group>
            </div>
          </div>
          {/* -----------------------------------------------------Other information and save button ------------------------ */}
          <div className="row">
            <div className="col-md-12">
              <Form.Group controlId="formBasicOtherInfo">
                <Form.Label>Other Info.</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter other information"
                  value={obj.info}
                  onChange={doProfile}
                  name="info"
                />
              </Form.Group>
            </div>
          </div>

          {/* -------------------------------------------save and update button ----------------------------------- */}
          <Button
            variant="primary"
            onClick={growerProfileAxios}
            disabled={disabledSave}
          >
            Save
          </Button>

          <Button
            variant="primary"
            disabled={disabledUpdate}
            onClick={updateGrowerProfile}
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Profile;
