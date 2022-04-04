/**
 * Dependencies
 */

import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

/**
 * Components
 */
import Form from "../form/Form.js";
import Login from "../login/Login.js";
import like from "../../svg/like.svg";
import HeaderFeed from "../headerFeed/HeaderFeed.js";
import trash from "../../svg/trash.svg";
import Profile from "../profile/Profile";
import Loading from "../loading/Loading";

/**
 * Firebase
 */

import {
  fireStore,
  loginWithGoogle,
  auth,
  logout,
} from "../../firebase/firebase.js";

/**
 * Styles
 */

import "./Tweets.css";

function Tweets() {
  const { data, setData, user, deleteTweet, likeTweet, showLikes, loading } =
    useContext(AppContext);

    
    if (loading) return <Loading />

  return (
    <div className="tweets">
      {user ? (
        <>
          <HeaderFeed />
          <div className="allFeed">
            <div className="userProfile">
              <Form />
            </div>
            <section className="tweetsPosts">
              {data.map((item) => (
                <div className="tweet" key={item.id}>
                  <img
                    src={item.photoURL}
                    alt="photo"
                    className="usernamePPTweet"
                  />
                  <div className="tweet-content">
                    <small className="author">
                      <strong>@{item.author}</strong>
                    </small>
                    <p>{item.tweet}</p>
                  </div>
                  <div className="tweet-actions">
                    <div className="showLikes">{showLikes(item)}<span className="spaceLike"></span>{item.likedBy.length}</div>
                  </div>
                  {user !== null && user.uid === item.uid && (
                    <button
                      className="delete"
                      onClick={() => deleteTweet(item.id)}
                    >
                      <img src={trash} alt="trash can" />
                    </button>
                  )}
                </div>
              ))}
            </section>
            <button onClick={logout} className="logout">
              Logout
            </button>
          </div>
        </>
      ) : (
        <button onClick={loginWithGoogle} className="buttonLogin">
          Login
        </button>
      )}
    </div>
  );
}

export default Tweets;
