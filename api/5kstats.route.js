import express from "express";
import GolfController from "./golf.controller.js";
import NhlController from "./nhl.controller.js";

// access express' router
const router = express.Router();

// this controller is what the router uses to get data
// make the home route (demo)
router.route("/").get((req, res) => res.send("hello world!"));

// golf routes
router.route("/golf").get(GolfController.apiGetTournament);
router.route("/golf/stats").get(GolfController.apiGetPlayerStats);

// nhl routes
router.route("/nhl/aggregates").get(NhlController.apiGetNhlAggregates);
router.route("/nhl/goalie/stats").get(NhlController.apiGetNhlGoalieStats);

export default router;
