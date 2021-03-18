import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Admin from "./Admin";
import Login from "./Login";
import Signup from "./Signup";
const Home = () => {
  return (
    <BrowserRouter>
      <h1>Home</h1>
      <Link className='nav-link' to='/'>
        Sign Up
      </Link>
      <Link className='nav-link' to='/Login'>
        Login
      </Link>
      <Link className='nav-link' to='/Admin'>
        Admin
      </Link>
      <Switch>
        <Route path='/Login' component={Login} />
        <Route exact path='/' component={Signup} />
        <Route path='/Admin' component={Admin} />
      </Switch>
    </BrowserRouter>
  );
};
export default Home;