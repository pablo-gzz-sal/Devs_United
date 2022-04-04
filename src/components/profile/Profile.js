/**
 * Dependencies
 */
 import React, { useContext, useState } from "react";
 import { Link } from "react-router-dom";
 import { AppContext } from "../../context/AppContext.js";
 
 /**
  * Components
  */
 
 import MyFavorites from "../myFavorites/MyFavorites.js";
 import MyPosts from "../myPosts/MyPosts.js";
 import logoSmall from "../../svg/logo_small.svg";
 import title from "../../svg/title.svg";
 import postsImg from "../../images/postsImg.png";
 import postsClicked from "../../images/postsClickedImg.png";
 import favoritesImg from "../../images/favsImg.png";
 import favoritesClicked from "../../images/favsClickedImg.png";
 
 /**
  * Styles
  */
 import "./Profile.css";
 
 /**
  * Firebase
  */
 
 import { logout } from "../../firebase/firebase";
 
 function Profile() {
   const [posts, setPosts] = useState(true);
   const [favs, setFavs] = useState(false);
   const { user } = useContext(AppContext);
 
   const handleChangePosts = () => {
     setPosts(true);
     setFavs(false)
   };
 
   const handleChangeFavs = () => {
     setFavs(true);
     setPosts(false)
   };
 
   return (
     <div className="profile">
       <header className="headerProfile">
         <div className="headerPosition">
           <Link to="/">
             <p className="backHome">Home</p>
           </Link>
           <img className="logoSmall" src={logoSmall} alt="logo" />
           <img className="titleHeader" src={title} alt="title" />
         </div>
         <Link to="/">
         <button onClick={logout} className="logout">
           Logout
         </button>
         </Link>
       </header>
       <section className="middleBox">
         <img src={user.photoURL} alt="photo" className="ppProfile" />
         <p className="authorProfile">{user.displayName}</p>
         <div className="buttonsProfile">
           <button onClick={handleChangePosts} className="buttonPosts">
            Posts
           </button>
           <button onClick={handleChangeFavs} className="buttonPosts">
            Favs
           </button>
         </div>
       </section>
       <section className="tweetArea">
         {posts ? <MyPosts /> : <MyFavorites />}
       </section>
     </div>
   );
 }
 
 export default Profile;
 