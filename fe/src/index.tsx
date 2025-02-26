import { Auth0Provider } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth0Config } from "./auth/auth0-config";
import { AppRoutes } from "./shared/models/app.routes";
import { BrowserRouter } from "react-router-dom";

const onRedirectCallback = () => {
  window.location.replace(AppRoutes.Callback);
};

// Function to dynamically load Google Translate script and initialize it
const loadGoogleTranslate = () => {
  if (!document.querySelector("#google_translate_script")) {
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.id = "google_translate_script";
    script.async = true;
    script.onload = () => {
      window.googleTranslateElementInit();
    };
    document.body.appendChild(script);
  }
};

// Initialize Google Translate
window.googleTranslateElementInit = () => {
  new window.google.translate.TranslateElement(
    { pageLanguage: "en", includedLanguages: "en,fr" },
    "google_translate_element"
  );
};

const AppWrapper = () => {
  useEffect(() => {
    loadGoogleTranslate();
  }, []);

  return (
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
      <BrowserRouter>
        <App />
        {/* Hidden Google Translate dropdown */}
        <div id="google_translate_element" style={{ display: "none" }}></div>
      </BrowserRouter>
    </Auth0Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

reportWebVitals();
