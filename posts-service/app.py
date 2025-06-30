from flask import Flask, request, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

client = MongoClient(os.environ.get("DB_HOST", "localhost"), 27017)
db = client.devbook
posts = db.posts

@app.route("/", methods=["GET"])
def index():
    return "Posts Service Running"

@app.route("/posts", methods=["POST"])
def create_post():
    data = request.json
    result = posts.insert_one(data)
    return jsonify({"_id": str(result.inserted_id)}), 201

@app.route("/posts", methods=["GET"])
def get_posts():
    all_posts = list(posts.find({}, {"_id": 0}))
    return jsonify(all_posts)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
