/**
 * Dependencies
 */
 import React, { useContext } from "react";

 /**
  * Components
  */
 import Button from "../button/Button.js";
 
 /**
  * Styles
  */
 import "./Form.css";
 
 /**
  * Hooks
  */
 import useForm from "../../hooks/useForm.js";
 
 /**
  * Others
  */
 import { fireStore } from "../../firebase/firebase.js";
 
 /**
  * Images
  */
 import postButton from "../../svg/on.svg";
 import { AppContext } from "../../context/AppContext.js";
 
 const Form = () => {
   const [value, handleInput, setValue] = useForm({
     tweet: "",
   });
 
   const {user, setData, data = []} = useContext(AppContext)
 
   const { tweet, author } = value;
 
   function handleSubmit(e) {
     e.preventDefault();
     //Adding tweets
     const newTweet = {
       ...value,
       uid: user.uid,
       email: user.email,
       author: user.displayName,
       likedBy: [],
       photoURL: user.photoURL
     };
     const addTweet = fireStore.collection("tweets").add(newTweet);
     //Reference to the collection from firebase
     const getDoc = addTweet.then((doc) => doc.get());
     //Getting tweets
     getDoc.then((doc) => {
       const currentTweet = {
         tweet: doc.data().tweet,
         author: doc.data().author,
         id: doc.id,
         uid: doc.data().uid,
         email: doc.data().email,
         likedBy: doc.data().likedBy,
         photoURL: doc.data().photoURL
       };
 
       setData([currentTweet, ...data]);
     });
 
     setValue({ tweet: ""});
   }
 
   return (
     <form className="tweet-form">
       <img src={user.photoURL} alt="" className="userProfileID" />
       <div className="boxAndButton">
       <textarea
         name="tweet"
         value={tweet}
         onChange={handleInput}
         placeholder="What's happening?"
         className="tweetBox"
       ></textarea>
       <Button className="btn-tweet" onClick={handleSubmit}>
         <img src={postButton} alt="post button" className="postButton" />
       </Button>
       </div>
     </form>
   );
 };
 
 export default Form;
