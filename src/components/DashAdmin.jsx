import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { Button, Navbar } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import axios from "axios";
import baseURL from "../components/config/apiConfig";

function DashAdmin() {
  const { email } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([
    ["User Type", "Count"],
    ["Grower", 0],
    ["Customer", 0],
  ]);

  const [product, setProduct] = useState([["Category", "Count"]]);

  // fetching grower and customer's count
  async function fetchCount() {
    try {
      const url = `${baseURL}/admin/fetchusercount`;
      let respObj = await axios.get(url);
      const newData = [
        ["User Type", "Count"],
        ["Grower", respObj.data.grower],
        ["Customer", respObj.data.customer],
      ];
      setData(newData);
    } catch (error) {
      alert(error);
    }
  }

  // fetching category
  async function fetchCategory() {
    try {
      const url = `${baseURL}/admin/fetchproductcateory`;
      let respObj = await axios.get(url);
      // alert(JSON.stringify(respObj.data))
      // Extract the data array
      const categoryData = respObj.data.data;

      // Prepare the data for the chart
      const newData = [
        ["Category", "Count"],
        ...categoryData.map((item) => [item._id, item.count]),
      ];

      setProduct(newData);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    fetchCount();
    fetchCategory();
  }, []);

  const options = {
    title: "Grower and Consumer's Activity",
  };

  const productOptions = {
    title: "Product Categories Data",
    width: "100%",
    height: 400,
    bar: { groupWidth: "80%" },
    legend: { position: "none" },
  
  };

  return (
    <>
      <div className="container justify-content-center">
        <Navbar className="bg-body-tertiary justify-content-between ml-3">
          <Navbar.Brand href="#home" className="m-3 text-danger fw-bold fs-3">
            Admin Dash
          </Navbar.Brand>
          <Button
            variant="danger"
            onClick={() => navigate(-1)}
            className="h1 m-3"
          >
            Back
          </Button>
        </Navbar>

        <div className="mx-auto text-danger fw-bold fs-3">
          <span className="text-muted fs-3">Welcome</span> {email}
        </div>
        <div className="row justify-content-center" style={{ margin: "6%" }}>
          {/* Card 1 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="/public/images/admin-1.jpg"
                alt="User Manager"
                className="img-fluid"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>User Manager</Card.Title>
                <Button
                  variant="danger"
                  onClick={() => navigate("/usermanager/" + email)}
                >
                  Profile
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Card 2 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="/images/logo.jpg"
                alt="Grower Profiles"
                className="img-fluid"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>Grower Profiles</Card.Title>
                <Button
                  variant="danger"
                  onClick={() => navigate("/growermanager")}
                >
                  Grower Profiles
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Card 3 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src="/images/profile.png"
                alt="Customer Profiles"
                className="img-fluid"
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>Customer Profiles</Card.Title>
                <Button
                  variant="danger"
                  onClick={() => navigate("/customermanager")}
                >
                  Customer Profiles
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="text-danger fw-bold fs-3 mb-4">
          Grower and Consumer's Activity
        </div>
        <div className="chart-container">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>

        <div className="text-danger fw-bold fs-3 mb-4">Product Categories</div>
        <div className="chart-container">
          <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={product}
            options={productOptions}
          />
        </div>
      </div>
    </>
  );
}

export default DashAdmin;
