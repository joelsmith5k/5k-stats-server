// connect to db and start server

import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import GolfDAO from "./dao/golfDAO.js";
import NhlDAO from "./dao/nhlDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 5000;

MongoClient.connect(process.env.GOLF_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 250,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.log(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await GolfDAO.injectDB(client);
    await NhlDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
