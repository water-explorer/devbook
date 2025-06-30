import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ username: "", email: "", title: "", content: "" });

  useEffect(() => {
    axios.get("/api/posts").then(res => setPosts(res.data));
  }, []);

  const handleUserRegister = async () => {
    await axios.post("/api/users/register", {
      username: form.username,
      email: form.email
    });
    alert("User registered!");
  };

  const handleCreatePost = async () => {
    await axios.post("/api/posts", {
      title: form.title,
      content: form.content,
      author: form.username
    });
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>DevBook Frontend</h1>
      <div>
        <h2>Create User</h2>
        <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <button onClick={handleUserRegister}>Register</button>
      </div>
      <hr />
      <div>
        <h2>Create Post</h2>
        <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Content" onChange={e => setForm({ ...form, content: e.target.value })} />
        <button onClick={handleCreatePost}>Post</button>
      </div>
      <hr />
      <div>
        <h2>All Posts</h2>
        {posts.map((post, idx) => (
          <div key={idx}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <small>By {post.author}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
