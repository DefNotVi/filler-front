export const msalConfig = {
  auth: {
    clientId: "a6544f6f-1d06-421d-a743-3d225ee06a97",
    authority: "https://login.microsoftonline.com/87c304cc-22d8-44f5-8876-e82e9b090abb",
    redirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
  scopes: ["a6544f6f-1d06-421d-a743-3d225ee06a97/.default"]
};