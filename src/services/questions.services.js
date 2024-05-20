const { ObjectId } = require("mongodb");
const databaseService = require("./database.services.js");

class QuestionsService {
  async getAll() {
    const result = await databaseService.questions.find().toArray();

    return {
      success: true,
      result,
    };
  }

  async getById(id) {
    const result = await databaseService.questions.findOne({
      _id: new ObjectId(id),
    });

    return {
      success: true,
      result,
    };
  }

  async add({ timestamp, html, date }) {
    await databaseService.questions.insertOne({
      timestamp,
      html,
      date,
    });

    return {
      success: true,
    };
  }
}

const questionsService = new QuestionsService();

module.exports = questionsService;
