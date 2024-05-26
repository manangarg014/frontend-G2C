import React, { useState, useEffect } from "react";
import {Button,Navbar,Container,Table} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../components/config/apiConfig"


function GrowerManager() {
  const [users, setusers] = useState([]);
  const token = localStorage.getItem("token")

  const navigate=useNavigate();

  async function fetchUsers() {
    try {
      const url = `${baseURL}/admin/fetchgrowers`;
      const response = await axios.get(url,{headers:{'Authorization':`Bearer ${token}`}});

      //   alert(JSON.stringify(response.data.data));
      setusers(response.data.data);
      // alert(JSON.stringify(users))
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Show an alert to the user
        alert("Session expired. Please log in again.");
  
        window.location.href = "/";
      } else {
        // Show an alert with the error message
        alert( error.message);
      }
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <>
      <Navbar className="bg-body-tertiary justify-content-between ml-3">
        <Navbar.Brand href="#home" className="m-3">
          Admin Dash
        </Navbar.Brand>

        <Button variant="danger" onClick={() => navigate(-1)} className="h1 m-3" > 
          Back
        </Button>
      </Navbar>
      <Container>
      <div className="row table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>picture</th>
                <th>id proof</th>
                <th>email</th>
                <th>name</th>
                <th>contact</th>
                <th>address</th>
                <th>village</th>
                <th>city</th>
                <th>aadhaar</th>
                <th>info</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={index}>
                  {/* index  */}
                  <td>{index + 1}</td>

                  {/* image 1 */}
                  <td>
                    <img
                      src={`${baseURL}/` + item.pic1}
                      width="100"
                      alt=""
                    />
                  </td>

                  {/* image 2 */}
                  <td>
                    <img
                      src={`${baseURL}/` + item.pic2}
                      width="100"
                      alt=""
                    />
                  </td>

                  {/* email  */}
                  <td>{item.email}</td>

                  {/* name  */}
                  <td>{item.name}</td>

                  {/* contact  */}
                  <td>{item.contact}</td>

                {/* address  */}
                 <td>{item.address}</td>

                {/* village  */}
                 <td>{item.village}</td>

                {/* city  */}
                 <td>{item.city}</td>

                {/* aadhaar  */}
                 <td>{item.aadhaar}</td>

                {/* info  */}
                 <td>{item.info}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default GrowerManager;
