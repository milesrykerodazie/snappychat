import React from "react";
import "./Info.css";
import Front from "./images/Front.jpg";

function Info() {
  return (
    <div className="info">
      <div className="info__container">
        <h2>
          Welcome To <strong>Snappy Chat</strong>
        </h2>
        <img src={Front} alt="front__picture" />
        <div className="info__text">
          <span>⭐⭐⭐⭐⭐⭐⭐</span>
          <h1>Nathaniel Odazie Miles</h1>
          <p>...part of my ReactJs journey</p>
          <marquee>
            Unknown User Can Not Have Access: sign in or sign up.
          </marquee>
        </div>
      </div>
    </div>
  );
}

export default Info;
