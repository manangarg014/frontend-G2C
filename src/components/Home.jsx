import React from "react";
import NavComponent from "./NavComponent";
import Footer from "./Footer";
import CardSection from "./CardSection";


function Home() {
  
  return (
    <>
      {/* navigation  and banner*/}
      <NavComponent ></NavComponent>

      {/* cards section  */}
      <CardSection></CardSection>


      {/* footer */}
      <Footer></Footer>
    </>
  );
}

export default Home;
