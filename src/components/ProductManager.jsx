import React, { useState, useEffect } from "react";
import { Container, Button, Table, Form } from "react-bootstrap";
import SecondaryNav from "./SecondaryNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseURL from "../components/config/apiConfig"

function ProductManager() {
  const { email } = useParams();

  const [items, setItems] = useState([]);
  const [toggle, settoggle] = useState(true);
  const [obj, setobj] = useState({
    _id:"",
    email: email,

  });

  // adding info to be updated
  function doAdd(event) {
    const { name, value } = event.target;
    setobj({ ...obj, [name]: value });
  }

  async function fetchProducts() {
    
    try {
      const url = `${baseURL}/products/fetchProduct?email=${email}`;
      const response = await axios.get(url);
      setItems(response.data.doc);
      const id=response.data.doc[0]._id
      setobj({...obj,"_id":id});

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteClick = async (id) => {
    if (confirm("Delete product ? ")) {
      try {
        const url = `${baseURL}}/products/deleteProduct?id=${id}`;
        const response = await axios.get(url);
        // alert(JSON.stringify(response.data));
        alert("record deleted ");
        fetchProducts();
      } catch (error) {
        alert("Error deleting product:" + error);
      }
    }
  };

  const handleSaveClick = async (_id) => {
    // alert(JSON.stringify(obj))
    
    let fd = new FormData();
    for (let prop in obj) {
      fd.append(prop, obj[prop]);
    }
    fd.append("_id",_id);
    try {
      const url = `${baseURL}/products/updateProduct`;
      let respObj = await axios.post(url,fd);
      if(respObj)
      alert("record updated");
    else
    alert("server error");
    fetchProducts();

    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Show an alert to the user
        alert("Session expired. Please log in again.");
  
        window.location.href = "/";
      } else {
        // Show an alert with the error message
        alert( "data not updated");
      }
    }
  };

  return (
    <>
      <SecondaryNav />
      <Container>
        <div className="row">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Product Pic</th>
                <th>Product Category</th>
                <th>City</th>
                <th>Product</th>
                <th>Price</th>
                <th>per</th>
                <th>Info</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                
                <tr key={index}>
                  {/* index  */}
                  <td>{index + 1}</td>

                  {/* image  */}
                  <td>
                    <img
                      src={`${baseURL}/` + item.pic1}
                      width="100"
                      alt=""
                    />
                  </td>

                  {/* category  */}
                  <td>{item.category}</td>

                  {/*City  */}
                  <td>{item.city}</td>

                  {/* product  */}
                  <td>
                    {!toggle ? (
                      <Form.Control type="text" defaultValue={item.product} onChange={doAdd} name="product"/>
                    ) : (
                      item.product
                    )}
                  </td>

                  {/* price */}
                  <td>
                    {!toggle ? (
                      <Form.Control type="text" defaultValue={item.price} onChange={doAdd} name="price" />
                    ) : (
                      item.price
                    )}
                  </td>

                  {/* per  */}
                  <td>
                    {!toggle ? (
                      <Form.Control
                        type="text"
                        defaultValue={item.per}
                        onChange={doAdd}
                        name="per"
                      />
                    ) : (
                      item.per
                    )}
                  </td>

                  {/* info */}
                  <td>
                    {!toggle ? (
                      <Form.Control
                        type="text"
                        defaultValue={item.info}
                        onChange={doAdd}
                        name="info"
                      />
                    ) : (
                      item.info
                    )}
                  </td>

                  {/* actions  */}
                  <td style={{ display: "flex" }}>
                    {toggle ? (
                      <Button onClick={() => settoggle(false)}>Edit</Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => handleSaveClick(index)}
                      >
                        Save
                      </Button>
                    )}

                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(item._id)}
                    >
                      Delete
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

export default ProductManager;
