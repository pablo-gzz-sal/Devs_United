import React, { useEffect, useState, createContext } from "react";

import like from "../svg/like.svg"
import dislike from "../svg/noLike.svg"
import { confirmAlert } from "react-confirm-alert";
import "./alert.css"

/**
 * Firebase
 */

import {
  fireStore,
  loginWithGoogle,
  auth,
  logout,
} from "../firebase/firebase.js";

export const AppContext = createContext();

export const AppProvider = (props) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = fireStore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = [];
        snapshot.forEach((doc) => {
          const { tweet, author, uid, email, likedBy, likes, photoURL } = doc.data();
          const snap = {
            tweet,
            author,
            id: doc.id,
            uid,
            email,
            likedBy,
            likes,
            photoURL
          };
          tweets.push(snap);
        });
        setLoading(false)
        setData(tweets);
        console.log(tweets)
      });

    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  /**
   *
   * @param {id} id of the selected tweet
   * @returns a new array without the tweet that was selected by the user
   */

  
  const deleteTweet = (id) => {

    confirmAlert({
      title: "Confirmation",
      message: "Delete the tweet",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fireStore.doc(`tweets/${id}`)
            .delete()
            .then(()=> console.log("deleted"))
            .catch (()=> console.log("something went wrong"))
          }
        },
        {
          label: "No"
        }
      ]
    })
  };

  /**
   *@description Fn that updates number of likes in a tweet
   */

  /*function likeTweet(id, likes) {
    const innerLikes = likes || 0;
    fireStore.doc(`tweets/${id}`).update({ likes: innerLikes + 1 });
  }*/

  const likeTweet = (data) =>{
    let newLikedBy = [...data.likedBy, user.email];
  
    fireStore.doc(`tweets/${data.id}`)
     .update({ likedBy: newLikedBy })
     .then(()=> console.log("success"))
     .catch (()=> console.log("something went wrong"))
   };
  
  
   const dislikeTweet = (data) =>{
    let newLikedBy = data.likedBy.filter((like)=> like !== user.email)
  
    fireStore.doc(`tweets/${data.id}`)
     .update({ likedBy: newLikedBy })
     .then(()=> console.log("success"))
     .catch (()=> console.log("something went wrong"))
   };
  
  
  
  
   const showLikes = (data)=>{
     if (data.likedBy && user.email){

       const isLiked = data.likedBy.findIndex((liked)=> user.email === liked);
       if (isLiked < 0){
         return (
           <>
            <img src={dislike} onClick={() => likeTweet(data)}/>
            </>
         )
       }
       else {
         return (
           <>
           <img src={like} onClick={() => dislikeTweet(data)}/>
  
           </>
         )
       }
  
     }
  
   }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        data,
        setData,
        deleteTweet,
        likeTweet,
        showLikes,
        dislikeTweet,
        loading,
        setLoading
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
