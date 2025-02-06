import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from "./layout/Navbar";
import Movies from "./movies/Movies";

function Home() {
  return (
    <div>
      <Movies />
    </div>
  );
}

export default Home;