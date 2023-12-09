import React from 'react';

import styles from '../css/BlogPost.module.css';

function BlogPost({ title, content }) {
  return (
    <div className={styles["blog-post"]}>
      <h2>{title}</h2>
      <p className={styles["blog-text"]}>{content}</p>
    </div>
  );
}

export default BlogPost;