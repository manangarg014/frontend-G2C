import React from "react";
import SecondaryNav from "./SecondaryNav";
import axios from "axios";
import baseURL from "../components/config/apiConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Form,
  Col,
  Row,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import { useState, useEffect } from "react";

function GrowerFinder() {
  const token = localStorage.getItem("token");

  //for grower model
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // sending data through this to the server
  const [obj, setobj] = useState({});

  // after products are fetched
  const [products, setproducts] = useState([]);

  // after cities are fetched
  const [cities, setcities] = useState([]);

  // grower model
  const [grower, setGrower] = useState({
    email: "",
    name: "",
    contact: "",
    address: "",
    village: "",
    city: "",
    aadhaar: "",
    info: "",
    pic1: "",
    pic2: "",
  });

  // display cards
  const [cards, setcard] = useState([]);
  function doFetch(event) {
    const { name, value } = event.target;
    setobj({ ...obj, [name]: value });
  }

  // fetch cities
  async function doCities() {
    try {
      const url = `${baseURL}/products/distinctCities`;
      let respObj = await axios.get(url);
      // alert(JSON.stringify(respObj.data.data));
      setcities(respObj.data.data);
    } catch (error) {
      alert(error);
    }
  }

  // product category
  async function doProductCategory() {
    try {
      const url = `${baseURL}/products/distinctCategory`;
      let respObj = await axios.get(url);
      // alert(JSON.stringify(respObj.data.data));
      setproducts(respObj.data.data);
    } catch (error) {
      alert(error);
    }
  }

  // fetch reqiured products
  async function doShowCards() {
    try {
      const { city, category } = obj;
      const url = `${baseURL}/products/productsCustomer?city=${city}&category=${category}`;
      let respObj = await axios.get(url);
      setcard(respObj.data.data);
    } catch (error) {
      // Show an alert with the error message
      alert(error);
    }
  }

  // fetch grower details
  async function showGrower(email) {
    let fd = new FormData();
    fd.append("email", email);
    try {
      const url = `${baseURL}/grower/growerProfileSearch`;
      const response = await axios.post(url, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setGrower(response.data.result);
      // alert(JSON.stringify(grower));
      openModal();
      // alert(JSON.stringify(response.data.result));
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

  useEffect(() => {
    doCities();
    doProductCategory();
  }, []);

  return (
    <>
      <SecondaryNav />
      <Container className="my-5">
        <Row className="mb-3">
          {/* cities select box */}
          <Col md={6}>
            <Form.Group controlId="formCity">
              <Form.Label>Select City</Form.Label>
              <Form.Select
                aria-label="Default select city"
                onChange={doFetch}
                name="city"
                defaultValue=""
                className="mb-3"
              >
                <option disabled value="">
                  Select your city
                </option>
                {/* Add your options here */}
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* product category select box */}
          <Col md={6}>
            <Form.Group controlId="formProductType">
              <Form.Label>Select Product Category</Form.Label>
              <Form.Select
                aria-label="Default select product"
                onChange={doFetch}
                name="category"
                defaultValue=""
                className="mb-3"
              >
                <option disabled value="">
                  Select product Category
                </option>
                {/* Add your options here */}
                {products.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* fetch button  */}
        <Row className="justify-content-center mb-3">
          <Col xs="auto">
            <Button variant="success" onClick={doShowCards} size="lg">
              Search
            </Button>
          </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-4">
        {cards.map((category, index) => (
  <Col key={index}>
    <Card className="h-100">
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <Card.Img
          src={`${baseURL}/${category.pic1}`}
          alt={category.product}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div className="text-center mb-3">
          <Card.Title>{category.product}</Card.Title>
        </div>
        <div className="mb-3">
          <div>
            <b>Category: </b>
            {category.category}
          </div>
          <div>
            <b>Info: </b>
            {category.info}
          </div>
          <div>
            <b>Price: </b>
            {category.price}/{category.per}
          </div>
        </div>
        <div className="text-center">
          <Button
            variant="outline-danger"
            onClick={() => showGrower(category.email)}
          >
            Grower Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  </Col>
))}

        </Row>
      </Container>
      <Modal show={showModal} onHide={closeModal} dialogClassName="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Grower Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Profile pictures */}
            <div className="row mb-3">
              <div className="col-md-6 text-center">
                <p>
                  <b>Profile Picture</b>
                </p>
                <img
                  src={`${baseURL}/${grower.pic1}`}
                  alt="Profile Pic"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
              <div className="col-md-6 text-center">
                <p>
                  <b>ID Proof</b>
                </p>
                <img
                  src={`${baseURL}/${grower.pic2}`}
                  alt="ID Proof"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    <b>Email address</b>
                  </Form.Label>
                  <Form.Control type="email" value={grower.email} readOnly />
                </Form.Group>
              </div>
            </div>

            {/* Name and Contact */}
            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group controlId="formBasicName">
                  <Form.Label>
                    <b>Name</b>
                  </Form.Label>
                  <Form.Control type="text" value={grower.name} readOnly />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="formBasicContact">
                  <Form.Label>
                    <b>Contact Number</b>
                  </Form.Label>
                  <Form.Control type="text" value={grower.contact} readOnly />
                </Form.Group>
              </div>
            </div>

            {/* Address and Village */}
            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group controlId="formBasicAddress">
                  <Form.Label>
                    <b>Address</b>
                  </Form.Label>
                  <Form.Control type="text" value={grower.address} readOnly />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="formBasicVillage">
                  <Form.Label>
                    <b>Village</b>
                  </Form.Label>
                  <Form.Control type="text" value={grower.village} readOnly />
                </Form.Group>
              </div>
            </div>

            {/* City and Aadhaar */}
            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group controlId="formBasicCity">
                  <Form.Label>
                    <b>City</b>
                  </Form.Label>
                  <Form.Control type="text" value={grower.city} readOnly />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group controlId="formBasicAdharCard">
                  <Form.Label>
                    <b>Aadhaar Card No.</b>
                  </Form.Label>
                  <Form.Control type="text" value={grower.aadhaar} readOnly />
                </Form.Group>
              </div>
            </div>

            {/* Other Info */}
            <div className="row mb-3">
              <div className="col-md-12">
                <Form.Group controlId="formBasicOtherInfo">
                  <Form.Label>
                    <b>Other Info</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={grower.info}
                    readOnly
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GrowerFinder;
