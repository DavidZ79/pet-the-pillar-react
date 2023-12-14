import React, { useState } from 'react';
import styles from '../css/NewPost.module.css';
import { set } from 'react-hook-form';
var API_URL = process.env.REACT_APP_API_URL;

export default function NewPost({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [num_likes, setNum_likes] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content) {
      return;
    }
    console.log(title, content);
    try {
      const response = await fetch(API_URL + "blog/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ content: content, title: title, likes: num_likes }),
      });

      if (!response.ok) {
        throw new Error(response);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("second demon:", error.message);
    }
    addPost({ title, content });
     // reset input fields
    setTitle('');
    setContent('');
    setNum_likes('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles["create-post-form"]}>
      <h2>Add a new post</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">New Post</button>
    </form>
  );
}