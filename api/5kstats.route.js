import express from "express";
import GolfController from "./golf.controller.js";

// access express' router
const router = express.Router();

// this controller is what the router uses to get data
// make the home route (demo)
router.route("/").get((req, res) => res.send("hello world!"));

// the /golf route (gets next_tournament, the golf homepage)
router.route("/golf").get(GolfController.apiGetTournament);

router.route("/golf/stats").get(GolfController.apiGetPlayerStats);

export default router;
