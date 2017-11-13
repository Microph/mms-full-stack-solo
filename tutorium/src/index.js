import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "./index.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById("root"));
registerServiceWorker();
