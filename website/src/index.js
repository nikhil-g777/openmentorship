import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import "../src/style/styles.css";

require("dotenv-flow").config();

ReactDOM.render(<App />, document.getElementById("root"));
