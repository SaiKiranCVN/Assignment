require("dotenv").config();
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(morgan("combined"));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

(async () => {
  const { Low } = await import("lowdb");
  const { JSONFile } = await import("lowdb/node");

  const adapter = new JSONFile("db.json");
  const defaultData = { items: [] };
  const db = new Low(adapter, defaultData);

  await db.read();
  db.data ||= defaultData;
  await db.write();

  const itemSchema = Joi.object({
    name: Joi.string().min(1).required(),
  });

  app.get("/items", async (req, res) => {
    await db.read();
    res.status(200).json(db.data.items);
  });

  app.post("/items", async (req, res) => {
    const { error, value } = itemSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newItem = {
      id: uuidv4(),
      name: value.name,
    };

    db.data.items.push(newItem);
    await db.write();

    res.status(201).json(newItem);
  });

  app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
