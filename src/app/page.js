import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "./layout/Navbar";
import Peliculas from "./peliculas/Peliculas";

function Home() {
  return (
    <div>
      <MyNavbar />
      <Peliculas />
    </div>
  );
}

export default Home;