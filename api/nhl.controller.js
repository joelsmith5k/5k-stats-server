import NhlDAO from "../dao/nhlDAO.js";

export default class NhlController {

    static async apiGetNhlAggregates(req, res, next) {
        const aggregates = await NhlDAO.apiGetNhlAggregates()
        console.log(aggregates)
        res.json(aggregates)     
    }

    static async apiGetNhlGoalieStats(req, res, next) {
        const nhlGoalieStats = await NhlDAO.apiGetNhlGoalieStats()
        res.json(nhlGoalieStats)     
    }

}