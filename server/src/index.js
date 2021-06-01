require("dotenv").config();

// Express App Setup
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const port = process.env.PORT || 3001;

const pgClient = require("./models/db.config");

const newTaskRouter = require("./routes/new");
const allTasksRouter = require("./routes/index");
const singleTaskRouter = require("./routes/show");
const updateTaskRouter = require("./routes/update");
const deleteTaskRouter = require("./routes/delete");

// Initialization
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

pgClient.on("error", () => console.log("Lost Postgres connection"));

app.use(newTaskRouter);
app.use(allTasksRouter);
app.use(singleTaskRouter);
app.use(updateTaskRouter);
app.use(deleteTaskRouter);

// Server
app.listen(port, () => console.log(`Server running on port ${port}`));
