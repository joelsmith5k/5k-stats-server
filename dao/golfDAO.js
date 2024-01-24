// Data Access Object for tournaments..

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let tournament;
let stats;

export default class golfDAO {
  // this async method initially connects to DB
  // call when server starts
  static async injectDB(conn) {
    if (tournament) {
      return;
    }
    try {
      tournament = await conn.db(process.env.GOLF_NS).collection("next_tournament");
      stats = await conn.db(process.env.GOLF_NS).collection("player_stats");
    } catch (err) {
      console.error(
        `unable to get tournaments or stats collection in tournamentsDAO: ${err}`
      );
    }
  }

  // get the next tournament - single JSON object
  static async getTournament() {
    let cursor;
    try {
      cursor = await tournament.find();
    } catch (err) {
      console.log(`unable to issue find command ${err}`);
      return { resultsList: [], totalResults: 0 };
    }
    try {
      const tournament = await cursor.next();
      return tournament;
    } catch (err) {
      console.error(`unable to cursor to array or prob counting, ${err}`);
      return { resultsList: [], totalResults: 0 };
    }
  }

  // get the top 50 WGC player stats - as an array of JSON objects
  static async getPlayerStats() {
    let cursor;
    try {
      cursor = await stats.find();
    } catch (err) {
      console.log(`unable to issue find command ${err}`);
      return { resultsList: [], totalResults: 0 };
    }
    try {
      const playerStats = await cursor.toArray();
      return playerStats;
    } catch (err) {
      console.error(`unable to cursor to array or prob counting, ${err}`);
      return { resultsList: [], totalResults: 0 };
    }
  }
}
