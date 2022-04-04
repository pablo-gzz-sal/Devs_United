/**
 * Dependencies
 */

 import React, { useContext } from "react";
 import { Link } from "react-router-dom";
 
 /**
  * Styles
  */
 
 import "./HeaderFeed.css";
 
 /**
  * Images
  */
 
 import logoSmall from "../../svg/logo_small.svg";
 import title from "../../svg/title.svg";
 
 /**
  * Firebase
  */
 
 import {
   fireStore,
   loginWithGoogle,
   auth,
   logout,
 } from "../../firebase/firebase";
 import { AppContext } from "../../context/AppContext";
 
 function HeaderFeed() {
 
   const {user} = useContext(AppContext)
  
   return (
     <div className="headerFeed">
       <Link to="/my-profile">
         {" "}
         <img className="usernamePP" src={user.photoURL} alt="logo" />{" "}
       </Link>
       <img className="logoSmall" src={logoSmall} alt="logo" />
       <img className="titleHeader" src={title} alt="title" />
     </div>
   );
 }
 
 export default HeaderFeed;
 