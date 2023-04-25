import express from "express";
import cors from "cors";

// the file we will have our routes in:
import api5kstats from "./api/5kstats.route.js";

// using to make our server
const app = express();

// apply middleware - the things express uses
app.use(cors());

// this allows server to accept json in the body of a request (GET/POST, read json)
app.use(express.json());

// initial base route,.... routes
app.use("/api/5kstats", api5kstats);

// wildcard return not found
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

app.get("*", (req, res) => {
    let url = path.join(__dirname, '../client/build', 'index.html');
    if (!url.startsWith('/app/'))
    url = url.substring(1);
   res.sendFile(url);
 });

// export app as a module
// import it in the file that accesses the db
export default app;
