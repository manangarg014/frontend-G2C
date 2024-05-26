import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import SecondaryNav from "./SecondaryNav";
import CardSection from "./CardSection";
import Footer from "./Footer";

function DashCustomer() {
  let { email } = useParams();

  const navigate = useNavigate();
  return (
    <>
      <SecondaryNav></SecondaryNav>

      <div className="container justify-content-center">
        <div className="mx-auto text-success fw-bold fs-3">
          <span className="text-muted fs-3">Welcome</span> {email}
        </div>

        <div className="row justify-content-center" style={{margin:"5%"}}>
          {/* Card 1 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <Card>
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
                  onClick={() => navigate("/profileCustomer/" + email)}
                >
                  Profile
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Card 2 */}
          <div className="col-lg-4 col-md-6 mb-4">
            <Card>
              <Card.Img
                variant="top"
                src="/images/product-search.jpg"
                className="img-fluid"
                alt="Profile Image"
                style={{ height: "300px", objectFit: "cover" }} // Adjust height as needed
              />
              <Card.Body>
                <Card.Title>Search Products</Card.Title>
                <Button
                  variant="success"
                  onClick={() => navigate("/growerfinder")}
                >
                  Search Products
                </Button>
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

export default DashCustomer;
