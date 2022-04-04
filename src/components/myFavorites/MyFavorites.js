/**
 * Dependencies
 */
import React, { useContext} from "react";
import { AppContext } from "../../context/AppContext";

/**
 * Components
 */

import trash from "../../svg/trash.svg";
import Loading from "../loading/Loading";

/**
 * Styles
 */
import "./MyFavorites.css";

function MyFavorites() {
  const { user, data, deleteTweet, showLikes, loading } = useContext(AppContext);

  if (loading) return <Loading />

  return (
    <div className="tweets">
      <div className="tweetsPosts">
        <div className="allFeed">
          {data.map((item) => {
            const newFavs = item.likedBy.findIndex(
              (liked) => user.email === liked
            );
            {
              if (newFavs >= 0) {
                return (
                  <div className="tweet" key={item.id}>
                    <img
                      src={user.photoURL}
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
                      <div className="showLikes">
                        {showLikes(item)}
                        <span className="spaceLike"></span>
                        <span className="showLikesPostsFavs">
                          {item.likedBy.length}{" "}
                        </span>
                      </div>
                    </div>
                    {user !== null && user.uid === item.uid && (
                      <button
                        className="delete"
                        onClick={() => deleteTweet(item.id)}
                      >
                        <img
                          className="deleteImg"
                          src={trash}
                          alt="trash can"
                        />
                      </button>
                    )}
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default MyFavorites;
