import React, { useState, useEffect } from "react";
import { Container, Button, Table, Form } from "react-bootstrap";
import SecondaryNav from "./SecondaryNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "./config/apiConfig";
import { doFetchUsers,doBlockUsers } from "./config/adminController";

function UserManager() {
  const { email } = useParams();

  const [users, setusers] = useState([]);

  async function fetchUsers() {
    // try {
    //   const url = `${baseURL}/admin/fetchusers`;
    //   const response = await axios.get(url);

    //   //   alert(JSON.stringify(response.data.data));
    //   setusers(response.data.data);
    //   // alert(JSON.stringify(users))
    // } catch (error) {
    //   console.error("Error fetching users:", error); // Log the error to the console
    //   alert("Error fetching users:", error.message); // Show an alert with the error message
    try{
    var response= await doFetchUsers();

    if(response){
      setusers(response.data.data)
    }
    }
    catch(error){
      alert("error fetching users:", error.message);
    }
    
    
  }

  // async function doBlock(status, email) {
  //   if (status == 1) {
  //     try {
  //       // const url = `${baseURL}/admin/blockunbock?status=0&email=${email}`;
  //       const response = doBlockUsers(email,status);

  //       if (response) alert(JSON.stringify(response));
  //     } catch (error) {
  //       console.error("Error fetching users:", error); // Log the error to the console
  //       alert("Error fetching users:", error.message); // Show an alert with the error message
  //     }
  //   } else {
  //     try {
  //       // const url = `${baseURL}/admin/blockunbock?status=1&email=${email}`;
  //       const response = doBlockUsers(email,status);
  //       if (response) alert("user unblocked");
  //     } catch (error) {
  //       console.error("Error fetching users:", error); // Log the error to the console
  //       alert("Error fetching users:", error.message); // Show an alert with the error message
  //     }
  //   }
  //   fetchUsers();
  // }

  async function doBlock(status, email) {
    try {
      let response;
      if (status == 1) {
        response = await doBlockUsers(email, status);
        if (response) alert(JSON.stringify(response.data));
      } else {
        response = await doBlockUsers(email, status);
        if (response) alert(JSON.stringify(response.data));
      }
      fetchUsers();
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
  }, []);

  return (
    <>
      <SecondaryNav />
      <Container>
        <div className="row">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>email</th>
                <th>status</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={index}>
                  {/* index  */}
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.users}</td>
                  <td>{item.status}</td>

                  <td>
                    <Button
                      variant="danger"
                      onClick={() => doBlock(item.status, item.email)}
                    >
                      Block/unBlock
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default UserManager;
