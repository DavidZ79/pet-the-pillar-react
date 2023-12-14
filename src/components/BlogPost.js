import React from 'react';

import styles from '../css/BlogPost.module.css';

function BlogPost({ title, content, num_likes }) {
  return (
    <div className={styles["blog-post"]}>
      <div className={styles['blog-inner']}>
        <h2>{title}</h2>
        <p className={styles["blog-text"]}>{content}</p>
        <p className={styles["blog-text"]}>{num_likes}</p>
      </div>
    </div>
  );
}

export default BlogPost;