import React from "react";
import loading from "../../images/giphy.gif"
import "./Loading.css"

function Loading() {
  return (
    <header className="loading">
        <img src={loading} className="loading" alt="loading" />
    </header>
  );
}

export default Loading;