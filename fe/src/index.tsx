import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth0Config } from "./auth/auth0-config";
import { AppRoutes } from "./shared/models/app.routes";


const onRedirectCallback = () => {
  window.location.replace(AppRoutes.Callback);
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: auth0Config.callback,
        audience: auth0Config.audience,
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
        <App />
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
