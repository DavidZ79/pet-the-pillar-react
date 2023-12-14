import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPost from "../components/BlogPost";
import Card from "../components/Card";

import styles from '../pagecss/shelterblog.module.css'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
var API_URL = process.env.REACT_APP_API_URL;

// import { Link } from "react-router-dom";

export default function ShelterBlog() {
   const { id } = useParams();
   const [posts, setPosts] = useState([]);
   const [nextPage, setNextPage] = useState("initial");
   const [previousPage, setPreviousPage] = useState("initial");
  const [pageNum, setPageNum] = useState(1);
 
   const fetchPosts = async () => {
     try {
       const params = new URLSearchParams(window.location.search)
       const response = await fetch(`${API_URL}blog/list2/${id}?page=${pageNum}`, {
         method: 'GET',
       });
 
       if (!response.ok) {
         throw new Error('Failed to fetch pet details');
       }
       console.log("GGOOOOD")
       const responseData = await response.json();
       const tempData = {
         "count": responseData.count,
         "next": responseData.next,
         "previous": responseData.previous,
         "results": responseData.results
       }
       setNextPage(tempData.next);
       setPreviousPage(tempData.previous);

       return tempData.results;
     } catch (error) {
       console.error('Error fetching pet details:', error);
     }
   };

   async function loadNext() {
      if (pageNum !== -1) {   
        const tempData = await fetchPosts(nextPage);
        setPosts((oldPetList) => [tempData])
        setPageNum(preNum => preNum + 1)
        // setDisableLoading(true);c
      }
    }

    async function loadPrevious() {
      if (pageNum !== -1) {   
        const tempData = await fetchPosts(previousPage);
        setPosts((oldPetList) => [tempData])
        setPageNum(preNum => preNum - 1)
        // setDisableLoading(true);c
      }
    }
 
   async function initData() {
     console.log("hi")
     console.log(posts.length)
     if (posts.length === 0 || posts.length === 1) {
       console.log("hoya")
       const tempData = await fetchPosts();
       setPosts(tempData); // Update the state with fetched details
     }
   }
 
   useEffect(() => {
     initData();
   });

   return (
      <body>
         <Header/>

         <div className={styles.main}>
         <Card className={styles["background-box"]}>
        <div className="blog">
          {posts.map((post, index) => (
            <BlogPost key={index} title={post.title} content={post.content} num_likes={post.num_likes} shelter={post.shelter} />
          ))}
        </div>
      </Card>
         </div>
         <div>
            <p>
          <button className={`button is-secondary load-more ${nextPage === null ? 'hide': ''}`} onClick={loadNext}>Load Next</button>
            </p>
          </div>
          <div>
            <p>
          <button className={`button is-secondary load-more ${previousPage === null ? 'hide': ''}`} onClick={loadPrevious}>Load Previous</button>
            </p>
          </div>

         <Footer/>
      </body>
   );
}