import express from "express";
import cors from "cors";
import "dotenv/config";

import { MongoClient, ObjectId } from "mongodb";
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// console.log("DB user : ", process.env.DB_USER);
// console.log("Db password: ", process.env.DB_PASS);

const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pcsjfdp.mongodb.net/`,
);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectedClient = await connectToMongoDB();
const db = connectedClient.db("simpleCrudDB");
const users = db.collection("users");

app.get("/", (req, res) => {
  res.send("SImple CRUD server is running");
});

// showing all user in backend API route(own created, not JSON placeholder)
app.get("/users", async (req, res) => {
  const cursor = users.find({});
  const allUsers = await cursor.toArray();
  res.send(allUsers); // show all user data in object form in backend server(5000)
});

// showing specific user in backend API route(own created, not JSON placeholder)
app.get("/users/:id", async (req, res) => {
  console.log("Params in the server : ", req.params);

  const id = req.params.id;
  const query1 = { _id: new ObjectId(id) };
  const result = await users.findOne(query1);
  res.send(result);
});

app.post("/users", async (req, res) => {
  const newUser = req.body;

  console.log("Adding new user: ", newUser);

  const result = await users.insertOne(newUser);
  res.send(result); // adding all user data in the backend server(5000) plus mongodb server
});

app.patch("/users/:id", async (req, res) => {
  const id = req.params.id;
  const updateUser = req.body;
  console.log(`updating user with ID:`, id, `with data: `, updateUser);

  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };

  // Specify the update to set a value for those fields(name, email)
  const updatedoc = {
    $set: { name: updateUser.name, email: updateUser.email },
  };
  const result = await users.updateOne(filter, updatedoc, options);
  res.send(result);
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await users.deleteOne(query);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Your server is running at port ${port}`);
});
