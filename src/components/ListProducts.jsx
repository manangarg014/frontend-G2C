import React from "react";
import baseURL from "../components/config/apiConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { json, useParams } from "react-router-dom";
import SecondaryNav from "./SecondaryNav";
import { Image, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function ListProducts() {
  const { email } = useParams();

  let [image1, setImage1] = useState(null);

  var [obj, setobj] = useState({
    email: email,
    city: "",
    pic1: "",
    category: "",
    product: "",
    price: "",
    per: "",
    info: "",
  });

  // image preview
  function doPrev1(event) {
    let file = event.target.files[0];
    //   alert(JSON.stringify(file.name))
    //   alert(JSON.stringify(obj))
    // console.log(file)
    setobj({ ...obj, ["pic1"]: file });
    const imgPrev = document.getElementById("imgPrev1");
    imgPrev.src = URL.createObjectURL(file);
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    setImage1(imageUrl);
  }

  //-------------------------------------------------- sending profile info---------------------------------

  function doAdd(event) {
    const { name, value } = event.target;
    setobj({ ...obj, [name]: value });
  }

  async function productSaveAxios() {
    // alert(JSON.stringify(obj));

    let fd = new FormData();
    for (let prop in obj) {
      fd.append(prop, obj[prop]);
    }
    try {
      const url = `${baseURL}/products/saveProduct`;

      let respObj = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (respObj) alert("Product Added");
      else alert("server error");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Show an alert to the user
        alert("Session expired. Please log in again.");

        window.location.href = "/";
      } else {
        // Show an alert with the error message
        alert("data not added");
      }
    }
  }

  //   useEffect(() => {
  //     productSearchAxios(); // Fetch records on component mount
  //   }, []);

  return (
    <>
      <SecondaryNav></SecondaryNav>

      <div className="container">
        <Form>
          {/* ---------------------------product picture and email---------------------- */}
          <div className="row">
            <div className="col-md-6">
              <Col xs={6} md={4}>
                <img
                  id="imgPrev1"
                  src={image1}
                  style={{ width: "200px", height: "200px" }}
                />
              </Col>
              <Form.Group controlId="formFileLg1">
                <Form.Label>product category </Form.Label>
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
          </div>
          {/* ---------------------------------------product category and product ----------------------*/}
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formBasicProduct">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  type="text"
                  value={obj.product}
                  placeholder="Enter product name"
                  onChange={doAdd}
                  name="product"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="formBasicCategory">
                <Form.Label>Product Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={doAdd}
                  defaultValue=""
                  name="category"
                >
                  <option disabled value="">
                    select product category
                  </option>
                  <option value="dairy">dairy</option>
                  <option value="seafood">seafood</option>
                  <option value="vegetables">vegetables</option>
                  <option value="fruits">fruits</option>
                  <option value="grain">grain</option>
                  <option value="nuts">nuts</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          {/* ------------------------------------price and per------------------------- */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formBasicProduct">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  value={obj.price}
                  placeholder="Enter price"
                  onChange={doAdd}
                  name="price"
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group controlId="formBasicPer">
                <Form.Label>{obj.price}Rs/per</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={doAdd}
                  defaultValue=""
                  name="per"
                >
                  <option disabled value="">
                    select product/per
                  </option>
                  <option value="kg">kg</option>
                  <option value="gm">gm</option>
                  <option value="piece">piece</option>
                  <option value="liters">liters</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          {/* -----------------------------------------------------Other information and save button ------------------------ */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formBasicOtherInfo">
                <Form.Label>Other Info.</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter other information"
                  value={obj.info}
                  onChange={doAdd}
                  name="info"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={obj.city}
                  placeholder="Enter city"
                  onChange={doAdd}
                  name="city"
                />
              </Form.Group>
            </div>
          </div>

          {/* -------------------------------------------save and update button ----------------------------------- */}
          <Button variant="primary" onClick={productSaveAxios}>
            Save
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ListProducts;
