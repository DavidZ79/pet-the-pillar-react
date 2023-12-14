import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogPost from "../components/BlogPost";
import Card from "../components/Card";
import NewPost from "../components/NewPost";

import styles from "../pagecss/blogpage.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
var API_URL = process.env.REACT_APP_API_URL;

export default function SampleBlog() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams(window.location.search)
      const response = await fetch(`${API_URL}blog/list/${id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pet details');
      }

      const responseData = await response.json();
      const tempData = {
        "count": responseData.count,
        "next": responseData.next,
        "previous": responseData.previous,
        "results": responseData.results
      }
      return tempData.results;
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };

  async function initData() {
    console.log("hi")
    if (posts.length === 0) {
      console.log("hoya")
      const tempData = await fetchPosts();
      setPosts(tempData); // Update the state with fetched details
    }
  }

  useEffect(() => {
    initData();
  }, []);

  return (
    <body className={styles["body"]}>
      <Header />

      <div className={styles["main"]}>
      
      <Card className={styles["background-box"]}>
        <div className="blog">
          {posts.map((post, index) => (
            <BlogPost key={index} title={post.title} content={post.content} num_likes={post.num_likes} shelter={post.shelter} />
          ))}
        </div>
      </Card>

      {/* new post */}
      <Card className={styles["background-box"]}>
        <NewPost addPost={addPost} />
      </Card>
      </div>
      <Footer />
    </body>
  );
}
