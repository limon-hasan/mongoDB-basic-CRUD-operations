import express from "express";
import cors from "cors";
import "dotenv/config";

import { MongoClient, ObjectId } from "mongodb";

const { DB_USER, DB_PASS } = process.env;
const port = process.env.PORT || 5000;

if (!DB_USER || !DB_PASS) {
  throw new Error(
    "Missing MongoDB credentials. Set DB_USER and DB_PASS in the environment.",
  );
}

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const client = new MongoClient(
  `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASS)}@cluster0.pcsjfdp.mongodb.net/`,
  // Fail fast instead of hanging past a Vercel Function's execution limit.
  { serverSelectionTimeoutMS: 10_000 },
);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error(
      "Failed to connect to MongoDB. Check DB_USER and DB_PASS in the environment.",
    );
    console.error(error);
    throw error;
  }
}

const connectedClient = await connectToMongoDB();
const db = connectedClient.db("simpleCrudDB");
const users = db.collection("users");

function parseObjectId(id, res) {
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid user id." });
    return null;
  }

  return new ObjectId(id);
}

function parseUserInput(body) {
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!name || !email) {
    return null;
  }

  return { name, email };
}

app.get("/", (req, res) => {
  res.send("Simple CRUD server is running");
});

// show all users
app.get("/users", async (req, res) => {
  const allUsers = await users.find({}).toArray();
  res.json(allUsers);
});

// show a specific user
app.get("/users/:id", async (req, res) => {
  const _id = parseObjectId(req.params.id, res);
  if (!_id) return;

  const user = await users.findOne({ _id });

  if (!user) {
    res.status(404).json({ error: "User not found." });
    return;
  }

  res.json(user);
});

app.post("/users", async (req, res) => {
  const userInput = parseUserInput(req.body);

  if (!userInput) {
    res.status(400).json({ error: "name and email are required." });
    return;
  }

  const result = await users.insertOne(userInput);
  res.status(201).json(result);
});

app.patch("/users/:id", async (req, res) => {
  const _id = parseObjectId(req.params.id, res);
  if (!_id) return;

  const userInput = parseUserInput(req.body);

  if (!userInput) {
    res.status(400).json({ error: "name and email are required." });
    return;
  }

  // Do not upsert: updating a deleted user must not recreate it.
  const result = await users.updateOne({ _id }, { $set: userInput });

  if (result.matchedCount === 0) {
    res.status(404).json({ error: "User not found." });
    return;
  }

  res.json(result);
});

app.delete("/users/:id", async (req, res) => {
  const _id = parseObjectId(req.params.id, res);
  if (!_id) return;

  const result = await users.deleteOne({ _id });

  if (result.deletedCount === 0) {
    res.status(404).json({ error: "User not found." });
    return;
  }

  res.json(result);
});

// JSON 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found." });
});

// JSON errors, including malformed request bodies
app.use((error, req, res, next) => {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  const status = error.status ?? error.statusCode ?? 500;
  res.status(status).json({
    error: status >= 500 ? "Internal server error." : error.message,
  });
});

// Vercel imports this module and runs the exported app as a Function.
// Only bind a port for local `npm run dev` / `npm start`.
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Your server is running at http://localhost:${port}`);
  });
}

export default app;
