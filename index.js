// connect to db and start server

import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import GolfDAO from "./dao/golfDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

// syntax to access environment variable
const port = process.env.PORT || 443;

// connect to db - passs in URI
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
    // after connect before start server
    // get reference to DB
    await GolfDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
