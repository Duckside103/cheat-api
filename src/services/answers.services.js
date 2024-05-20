const databaseService = require("./database.services.js");

class AnswersService {
  async add({ number, answer }) {
    await databaseService.answers.insertOne({
      number,
      answer,
    });

    return {
      success: true,
    };
  }

  async get() {
    const result = await databaseService.answers.find().toArray();
    console.log(">> Check | AnswersService | get | result:", result);

    return {
      success: true,
      result,
    };
  }
}

const answersService = new AnswersService();

module.exports = answersService;
