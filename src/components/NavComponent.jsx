import { useState, useRef } from "react";
import baseURL from "../components/config/apiConfig";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { Nav } from "react-bootstrap";
import { useNavigate, Route, Routes } from "react-router-dom";

function NavComponent() {
  var navigate = useNavigate();
  // signup
  const [signup, setSignup] = useState(false);

  const signupClose = () => setSignup(false);
  const signupShow = () => setSignup(true);

  // login
  const [login, setLogin] = useState(false);

  const loginClose = () => setLogin(false);
  const loginShow = () => setLogin(true);

  //---------------------------login
  const [obj, setobj] = useState({
    email: "",
    password: "",
  });

  function doLogin(event) {
    const { type, value } = event.target;
    setobj({ ...obj, [type]: value });
  }

  function submitLogin() {
    alert(JSON.stringify(obj));
  }

  const handleLoginClick = () => {
    signupClose(); // Close the signup modal when Login button is clicked
    loginShow(); // Open the login modal
  };

  //-------------------------signup
  const [obj2, setobj2] = useState({
    email: "",
    password: "",
    users: "",
  });
  function doSignup(event) {
    const { name, value } = event.target;
    setobj2({ ...obj2, [name]: value });
  }

  // function submitSignup() {
  //   alert(JSON.stringify(obj2));
  // }

  // submit signup
  async function doSignupAxios() {
    // alert(JSON.stringify(obj2))
    let fd = new FormData();
    for (let prop in obj2) {
      fd.append(prop, obj2[prop]);
    }

    try {
      const url = `${baseURL}/authRoutes/signup`;
      let respObj = await axios.post(url, fd);
      alert(JSON.stringify(respObj.data.msg));
      // console.log(respObj);
    } catch (error) {
      alert("error --->", error);
      alert(JSON.stringify(respObj.data));
    }
  }

  // submit login
  async function doLoginAxios() {
    // alert(JSON.stringify(obj));
    let fd = new FormData();
    for (let prop in obj) {
      fd.append(prop, obj[prop]);
    }
    try {
      const url = `${baseURL}/authRoutes/login`;

      let respObj = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (respObj) {
        if (respObj.data == "user is blocked") alert("user is blocked");

        localStorage.setItem("token", respObj.data.token);
        if (respObj.data.result.users == "grower") {
          navigate("/dashGrower/" + obj.email);
        } else if (respObj.data.result.users == "customer") {
          navigate("/dashCustomer/" + obj.email);
        } else if (respObj.data.result.users == "admin") {
          navigate("/dashadmin/" + obj.email);
        } else {
          alert(JSON.stringify(respObj.data));
        }
      }
      // alert(JSON.stringify(respObj.data.result.users));
      // console.log(respObj.data.result.users);
    } catch (error) {
      alert("wrong email/password");
    }
  }

  return (
    <>
      {/* navbar  section */}
      <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" className="text-success">
            <img src="/images/logo.jpg" width="30%" alt="G2C Logo" />
            G2C
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <div className="d-flex flex-column flex-md-row align-items-center">
              <Button
                variant="success"
                onClick={loginShow}
                className="mb-2 mb-md-0 mr-md-2"
                style={{ margin: "10px" }}
              >
                Login
              </Button>
              <Button
                variant="success"
                onClick={signupShow}
                className="mb-2 mb-md-0"
                style={{ margin: "10px" }}
              >
                Signup
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* navbar section ends  */}

      {/* banner section  */}
      <section id="banner" style={{ marginTop: "5%" }}>
        <Container>
          <div className="row">
            {/* Image column */}
            <div className="col-lg-6 col-sm-12">
              <img
                className="img-fluid"
                src="/images/banner.gif"
                alt="Banner"
                width="90%"
              />
            </div>
            {/* Content column */}
            <div className="col-lg-6 col-md-12">
              <div className="p-4">
                <h2 className="text-success">Grower To Customer</h2>
                <p>
                  Experience the joy of{" "}
                  <strong> supporting local farmers</strong> and savoring the
                  <em> freshest, most flavorful foods</em>. Celebrate the rich
                  tapestry of agricultural communities and enjoy the true
                  essence of farm-to-table goodness. Discover a world of{" "}
                  <strong>sustainable agriculture</strong>,{" "}
                  <strong>community empowerment</strong>, and
                  <strong>culinary delight</strong>. Join our platform and
                  embrace farm-fresh abundance!
                </p>
                <Button
                  variant="outline-success"
                  onClick={signupShow}
                  className="btn btn-outline-success"
                  style={{ borderRadius: "50px" }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* banner section ends  */}

      {/* signup model  */}
      <Modal show={signup} onHide={signupClose}>
        <Modal.Header closeButton>
          <Modal.Title>SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={doSignup}
                name="email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={doSignup}
                name="password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUserType">
              <Form.Select
                aria-label="Default select example"
                onChange={doSignup}
                name="users"
                defaultValue=""
              >
                <option disabled value="">
                  Open this select menu
                </option>
                <option value="grower">grower</option>
                <option value="customer">customer</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" onClick={doSignupAxios}>
              Signup
            </Button>
            <div style={{ marginTop: "10px" }}>
              <span>Already have an account? </span>
              <Button
                variant="link"
                onClick={handleLoginClick}
                className="p-0"
                style={{ textDecoration: "underline", color: "blue" }}
              >
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* login model  */}
      <Modal show={login} onHide={loginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={doLogin}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={doLogin}
              />
            </Form.Group>

            <Button
              className="btn btn-primary"
              variant="primary"
              onClick={doLoginAxios}
            >
              login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavComponent;
