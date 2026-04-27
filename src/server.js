import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { dbConnect } from "./Database/dbconnect.js";
import { userRoute } from "./Routes/user.route.js";
import cookieParser from "cookie-parser"
import { limiter } from "./Services/ratelimiter.js";
import morgan from "morgan";
import { logger } from "./utils/logger.js";

// process environment config

dotenv.config();

const server = express();

// middlewares

server.use(express.json())
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials : true,
    // methods : ["GET", "POST", "PUT", "PATCH"]
  }),
);
server.use(cookieParser())

// database connection code

// port info
const PORT = process.env.PORT || 3001

// logging and monitoring
const stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

server.use(morgan("dev", { stream }));




 // db connect with port  
(async () => {
    try {
      await dbConnect();
      server.listen(PORT, () => {
        console.log(`server has started on port ${PORT}`);
          logger.info(`server has started on port ${PORT}`);
      });
    } catch (error) {
      console.log(error.message);
      logger.info(error.message);
    }
  })();

  // rate limiter

server.use(limiter);

// test request 

server.get("/", (req, res) => {
  logger.info("server running...");
  res.send("server is running");
});

server.use("/api/user", userRoute)


// global error handler middleware
server.use((err, req, res, next)=> {
  // console.log(err.message)
  logger.error(err.message);
  // Set the response status code
  const statusCode = err.statusCode || 500;

  // Send a JSON response to the client
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
})
