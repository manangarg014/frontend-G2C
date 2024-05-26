import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home";
import DashCustomer from "../DashCustomer";
import DashGrower from "../DashGrower";
import GrowerProfile from "../GrowerProfile";
import ProductManager from "../ProductManager";
import ListProducts from "../ListProducts";
import CustomerProfile from "../CustomerProfile";
import DashAdmin from "../DashAdmin";
import UserManager from "../UserManager";
import GrowerManager from "../GrowerManager"
import CustomerManager from "../CustomerManager"
import GrowerFinder from "../GrowerFinder";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/dashGrower/:email" element={<DashGrower />} />
        <Route path="/profileGrower/:email" element={<GrowerProfile></GrowerProfile>}/>
        <Route path="/productManager/:email" element={<ProductManager></ProductManager>}/>
        <Route path="/listproducts/:email" element={<ListProducts></ListProducts>}/>

        {/* customer  */}
        <Route path="/dashCustomer/:email" element={<DashCustomer />} />
        <Route path="/profileCustomer/:email" element={<CustomerProfile />} />
        <Route path="/growerfinder" element={<GrowerFinder></GrowerFinder>}/>

        {/* admin  */}
        <Route path="/dashadmin/:email" element={<DashAdmin />} />
        <Route path="/usermanager/:email" element={<UserManager/>}></Route>
        <Route path="/growermanager" element={<GrowerManager/>}></Route>
        <Route path="/customermanager" element={<CustomerManager/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
