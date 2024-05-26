import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SecondaryNav from "./SecondaryNav";
import { useParams, useNavigate } from "react-router-dom";
import CardSection from "./CardSection";
import Footer from "./Footer";
import { FaCog } from "react-icons/fa";

function DashGrower() {
  const { email } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <SecondaryNav></SecondaryNav>

      <div className="container justify-content-center">
        <div className="mx-auto text-success fw-bold fs-3" width="50%">
          <span className="text-muted fs-3">Welcome</span> {email}
        </div>
        <div className="row justify-content-center"  style={{margin:"5%"}}>
          {/* Card 1 */}
          <div className="col-lg-4 p-3 col-md-12">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="/images/profile.png"
                className="img-fluid"
                alt="Profile Image"
                style={{ height: "300px", objectFit: "cover" }} // Adjust height as needed
              />
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Button
                  variant="success"
                  onClick={() => navigate("/profileGrower/" + email)}
                >
                  Profile
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Card 2 */}
          <div className="col-lg-4 p-3 col-md-12">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="/images/product-manager.jpg"
                className="img-fluid"
                alt="Product Manager Image"
                style={{ height: "300px", objectFit: "cover" }} // Adjust height as needed
              />
              <Card.Body>
                <Card.Title>Product Manager</Card.Title>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <Button
                    variant="success"
                    className="mb-3 mb-md-0"
                    onClick={() => navigate("/listproducts/" + email)}
                  >
                    Add Products
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => navigate("/productManager/" + email)}
                  >
                    <FaCog className="mr-1" /> Products
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
        {/* card section  */}
        <CardSection></CardSection>

        {/* footer section  */}
        <Footer></Footer>
      </div>
    </>
  );
}

export default DashGrower;
