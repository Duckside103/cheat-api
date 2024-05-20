const express = require("express");
const fs = require("node:fs");

var cors = require("cors");
const path = require("node:path");
const moment = require("moment");
const questionsService = require("./src/services/questions.services.js");
const databaseService = require("./src/services/database.services.js");
const { wrapRequestHandler } = require("./src/utils/handlers.js");
const answersService = require("./src/services/answers.services.js");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post(
  "/question/",
  wrapRequestHandler(async (req, res) => {
    const nowUnix = Math.floor(new Date().getTime() / 1000.0);
    const now = moment(nowUnix * 1000).format("DD[-]MM_HH[h]mm");
    fs.writeFile(
      path.resolve(`contents/content_${now}.html`),
      req.body.data,
      { flag: "a" },
      (err) => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      }
    );

    await questionsService.add({
      timestamp: nowUnix,
      html: req.body.data,
      date: now,
    });

    return res.status(200).json({
      success: true,
    });
  })
);

app.get(
  "/question/",
  wrapRequestHandler(async (req, res) => {
    const result = await questionsService.getAll();

    return res.status(200).json(result);
  })
);

app.get(
  "/question/:id",
  wrapRequestHandler(async (req, res) => {
    const { id } = req.params;

    const result = await questionsService.getById(id);

    return res.status(200).json(result);
  })
);

app.post(
  "/answer",
  wrapRequestHandler(async (req, res) => {
    const { number, answer } = req.body;
    await answersService.add({
      number,
      answer,
    });

    return res.status(200).json({
      success: true,
    });
  })
);

app.get(
  "/answer",
  wrapRequestHandler(async (req, res) => {
    const result = await answersService.get();

    return res.status(200).json(result);
  })
);

databaseService.connect();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
