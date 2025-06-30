const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

async function seed() {
  try {
    await client.connect();
    const db = client.db("devbook");
    const posts = db.collection("posts");

    await posts.deleteMany({});
    await posts.insertMany([
      { title: "Hello World", content: "First post content", author: "alice" },
      { title: "Docker Rocks", content: "Microservices with Docker", author: "bob" }
    ]);

    console.log("✅ Sample posts inserted");
  } catch (err) {
    console.error("❌ Error seeding posts:", err);
  } finally {
    await client.close();
  }
}

seed();
