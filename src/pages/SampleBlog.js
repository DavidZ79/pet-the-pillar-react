import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogPost from "../components/BlogPost";
import Card from "../components/Card";
import NewPost from "../components/NewPost";
import Button from "../components/Button";

import styles from "../pagecss/blogpage.module.css";

import { useState } from "react";

export default function SampleBlog() {
  const [posts, setPosts] = useState([
    { title: "Post 1", content: "this is the first post" },
    { title: "Post 2", content: "this is the second post" },
  ]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <body className={styles["body"]}>
      <Header />

      {/* blog posts */}
      <Card className={styles["background-box"]}>
        <div className="blog">
          {posts.map((post, index) => (
            <BlogPost key={index} title={post.title} content={post.content} />
          ))}
        </div>
      </Card>

      {/* new post */}
      <Card className={styles["background-box"]}>
        <NewPost addPost={addPost} />
      </Card>

      <Footer />
    </body>
  );
}
