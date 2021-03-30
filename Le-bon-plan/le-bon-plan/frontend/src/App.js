import React from "react";
import "./App.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Navbar from "./Views/Navbar";
import Home from "./Views/Home";
import ProductList from "./Views/ProductList";
import Signup from "./Components/SignUp";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Home/>
        <Login/>
        <Signup/> 
      </div>
    );
  }
}

export default App;