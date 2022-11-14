const config = {};

config.host = process.env.HOST || 'https://dmurillo.documents.azure.com:443/'; // URL
config.authKey =
  process.env.AUTH_KEY || 'd7XIZPcSPQTLGA8Ezyh33nRdkRacY5X2cBjOlMtukaZykkwM0fPVXEfBkDCXr69ZtMMxQLFMFG6cACDbJdDuKA=='; // PRIMARY KEY
config.databaseId = "ToDoList";
config.containerId = "Items";

if (config.host.includes("https://localhost:")) {
  console.log("Local environment detected");
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  console.log(`Go to http://localhost:${process.env.PORT || '3000'} to try the sample.`);
}

module.exports = config;