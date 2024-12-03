let serverURL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  serverURL = "http://localhost:4000";
} else {
  serverURL = "https://crypto-tennis-backend.onrender.com";
}

export { serverURL };
