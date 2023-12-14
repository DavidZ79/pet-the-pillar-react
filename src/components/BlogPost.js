import React from 'react';

import styles from '../css/BlogPost.module.css';
import { Link } from "react-router-dom";

function BlogPost({ title, content, num_likes, shelter }) {
  return (
    <div className={styles["blog-post"]}>
      <div className={styles['blog-inner']}>
        <Link to={`/shelter_blog/${shelter}`}>
          <h2>{title}</h2>
        </Link>
        <p className={styles["blog-text"]}>{content}</p>
        <p className={styles["blog-text"]}>{num_likes}</p>
      </div>
      <button type="submit" className={styles["submit-btn"]}>Like</button>
    </div>


  );
}

export default BlogPost;