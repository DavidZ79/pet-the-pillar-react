import React from 'react';

import styles from '../css/BlogPost.module.css';
import { Link } from "react-router-dom";

function BlogPost({ title, content, shelter, timestamp}) {
  return (
    <div className={styles["blog-post"]}>
      <div className={styles['blog-inner']}>
        <Link to={`/shelter_blog/${shelter}`}>
          <h2>{title}</h2>
          <h3>{new Date(timestamp).toLocaleString()}</h3>
        </Link>
        <p className={styles["blog-text"]}>{content}</p>
      </div>
        
    </div>


  );
}

export default BlogPost;