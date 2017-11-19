import React from "react";
import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import path from "path";
import Express from "express";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import App from "./components/App";
import renderFullPage from "./server-components/renderFullPage";

const app = Express();
const port = 3000;

app.use("/static", Express.static("static"));

app.get("/*", (req, res) => {
  const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

  const html = renderToString(
    <Provider store={store}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
  );

  const preloadedState = store.getState();

  res.send(renderFullPage(html, preloadedState));
});

app.listen(port);
