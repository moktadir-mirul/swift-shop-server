require("dotenv").config();
const express = require('express')
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mnwmrsu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware
app.use(cors());
app.use(express.json());

async function run() {
  try {

    // await client.connect();

    const swiftCollection = client.db("shopDB").collection("swiftCollection");

    app.post("/products", async(req, res) => {
        const doc = req.body;
        const result = await swiftCollection.insertOne(doc);
        res.send(result);
    })

    app.get("/products", async (req, res) => {
        const result = await swiftCollection.find().toArray();
        res.send(result);
    })

    app.get("/products/:id", async(req, res) => {
        const id = req.params.id;
        const filter = {_id: new ObjectId(id)};
        const result = await swiftCollection.findOne(filter);
        res.send(result);
    })

    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Swift Shop Database is Here!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
