import GolfDAO from "../dao/golfDAO.js";

export default class GolfController {

    static async apiGetTournament(req, res, next) {
        const tournament = await GolfDAO.getTournament()
        console.log(tournament)
        res.json(tournament)     
    }

    static async apiGetPlayerStats(req, res, next) {
        const playerStats = await GolfDAO.getPlayerStats()
        res.json(playerStats)     
    }

}