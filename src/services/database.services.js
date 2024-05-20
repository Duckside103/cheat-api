const { MongoClient } = require("mongodb");

require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cheat.mk3uvwd.mongodb.net/?retryWrites=true&w=majority&appName=cheat`;

class DatabaseService {
  constructor() {
    this.client = new MongoClient(uri);
    this.db = this.client.db(process.env.DB_NAME);
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({
        ping: 1,
      });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch {
      console.log("[ERROR]: CLOSED THE SERVER!");
      // Ensures that the client will close when you finish/error
      await this.client.close();
    }
  }

  get questions() {
    return this.db.collection("questions");
  }

  get answers() {
    return this.db.collection("answers");
  }
}

const databaseService = new DatabaseService();

module.exports = databaseService;
