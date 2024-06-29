import express from "express";
import cors from "cors";

// the file we will have our routes in:
import api5kstats from "./api/5kstats.route.js";

// using to make our server
const app = express();

// apply middleware - express uses
app.use(cors());

// allows server to accept json in the body of a request (GET/POST, read json)
app.use(express.json());

// initial base route
app.use("/api/5kstats", api5kstats);

// wildcard return not found
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// export app as a module
export default app;
