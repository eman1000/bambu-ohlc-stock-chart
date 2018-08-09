import React from "react";
import loading from "./assets/loader.svg";
import "./LoaderStyles.css";

export default () => (
  <div id="loader">
    <img src={loading} />
  </div>
);
