// Imports 
const express = require('express');
const userRouter = require("./users/userRouter"); // This is so the server can use the CRUD operations
const morgan = require("morgan");
const helmet = require("helmet");
const server = express();

// This is to call middleware
server.use(express.json());
server.use(helmet());
server.use(logger);

server.get('/', (req, res) => {
  // res.send(`<h2>Let's write some middleware!</h2>`);
  const message = process.env.MESSAGE || "hello";
  res.status(200).json({ message, database: process.env.DB_NAME });
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
}

server.use("/api/users", userRouter);

module.exports = server;
