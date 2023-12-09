import React, { useState } from 'react';
import styles from '../css/NewPost.module.css';

export default function NewPost({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !content) {
      return;
    }
    addPost({ title, content });
     // reset input fields
    setTitle('');
    setContent('');
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