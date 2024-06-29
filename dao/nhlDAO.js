import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let aggregates;
let goalie_stats;

export default class NhlDAO {
  // this async method initially connects to DB
  // call when server starts
  static async injectDB(conn) {
    if (aggregates) {
      return;
    }
    try {
      aggregates = await conn.db(process.env.NHL_NS).collection("nhl_aggregates");
      goalie_stats = await conn.db(process.env.NHL_NS).collection("nhl_goalie_stats");
    } catch (err) {
      console.error(
        `unable to get nhl aggregates or goalie stats collection in nhlDAO: ${err}`
      );
    }
  }

  // get the aggregates - single JSON object
  static async apiGetNhlAggregates() {
    let cursor;
    try {
      cursor = await aggregates.find();
    } catch (err) {
      console.log(`unable to issue find command ${err}`);
      return { resultsList: [], totalResults: 0 };
    }
    try {
      const document = await cursor.next();
      return document;
    } catch (err) {
      console.error(`unable to cursor to array or prob counting, ${err}`);
      return { resultsList: [], totalResults: 0 };
    }
  }

  // get the 32 goalie breakdowns
  static async apiGetNhlGoalieStats() {
    let cursor;
    try {
      cursor = await goalie_stats.find();
    } catch (err) {
      console.log(`unable to issue find command ${err}`);
      return { resultsList: [], totalResults: 0 };
    }
    try {
      const nhlGoalieStats = await cursor.toArray();
      return nhlGoalieStats;
    } catch (err) {
      console.error(`unable to cursor to array or prob counting, ${err}`);
      return { resultsList: [], totalResults: 0 };
    }
  }
}
