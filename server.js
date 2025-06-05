// const http = require("http");
const app = require("./app");
// const server = http.createServer(app);
const serverless = require("serverless-http");
// const port = process.env.PORT || 3000;

// server.listen(port, () => console.log("server is running on port 3000"));

module.exports.handler = serverless(app);
