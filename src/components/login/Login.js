/**
 * Dependencies
 */

import React, { useEffect, useState } from "react";

/**
 * Components
 */

import Tweets from "../tweets/Tweets";

/**
 * Firebase
 */

import {
  fireStore,
  loginWithGoogle,
  auth,
  logout,
} from "../../firebase/firebase";

/**
 * Styles
 */

import "./Login.css";

/**
 * SVG
 */

import logo from "../../svg/logo_big.svg";
import google from "../../svg/google.svg";


/**
 * @description fn that has the login page. Has the variable of user and the method of Google login
 * @returns the svg, a title, paragraph and button to login.
 */

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div>
      {user ? (
        <Tweets />
      ) : (
        <div className="login">
          <section className="logoSingIn">
          <img src={logo} alt="logo" className="logo" id="logoLogin" />
          </section>
          <div className="infoSection">
            <h1 className="title">Welcome to Devs United!</h1>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <span className="googleAndButton">
              <div className="googleBack">
                <img src={google} alt="google" className="google" />
              </div>
              <button onClick={loginWithGoogle} className="buttonLogin">
                Sign in with Google 
              </button>
            </span>
            <p className="beta">© 2022 Devs_United - BETA</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
