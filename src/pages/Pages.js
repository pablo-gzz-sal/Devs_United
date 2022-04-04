import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "../components/login/Login";
import Profile from "../components/profile/Profile"
import Tweets from "../components/tweets/Tweets";

function Pages() {
  return (
    <div className="pages">
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Tweets} />
        <Route path="/my-profile" component={Profile} />
      </BrowserRouter>
    </div>
  );
}

export default Pages;