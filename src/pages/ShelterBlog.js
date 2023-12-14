import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogPost from "../components/BlogPost";
import Card from "../components/Card";
import DiscussionCard from '../components/DiscussionCard';

import styles from '../pagecss/shelterblog.module.css'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

var API_URL = process.env.REACT_APP_API_URL;
// import { Link } from "react-router-dom";

export default function ShelterBlog() {
   const { id } = useParams();
   const [posts, setPosts] = useState([]);
   const [nextPage, setNextPage] = useState("initial");
   const [previousPage, setPreviousPage] = useState("initial");
   const [pageNum, setPageNum] = useState(1);
   const [likesList, setLikesList] = useState([]);
   const [rootDiscussionList, setRootDiscussionList] = useState([]);
   const [textareaValue, setTextareaValue] = useState('');

   const fetchPosts = async () => {
     try {
       const params = new URLSearchParams(window.location.search)
       const response = await fetch(`${API_URL}blog/list2/${id}?page=${pageNum}`, {
         method: 'GET',
       });
 
       if (!response.ok) {
         throw new Error('Failed to fetch post details');
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
       console.log(tempData.results)
       return tempData.results;
     } catch (error) {
       console.error('Error fetching pet details:', error);
     }
   };

   const handleSubmit = async (event) => {
    event.preventDefault();

    // Here you can use textareaValue in your POST request
    console.log('Submitting:', textareaValue);

    // Example POST request
    const response = await fetch(`http://127.0.0.1:8000/api/comment/discussion/${id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        // Additional headers if needed
      },
      body: JSON.stringify({ content: textareaValue, user: 1 }),
    });
    const data = await response.json();
    console.log(data);
    const tempData = await fetchRootDiscussion();
    setRootDiscussionList(tempData);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
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

    async function callLikes(blog_id, method) {
      try {
        const response = await fetch(`${API_URL}comment/likes/${blog_id}/`, {
          method: method,
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
          if (!response.ok) {
            throw new Error('Failed to do likes stuff');
          } 
          if (method === 'GET') {
            setLikesList((oldLikeList) => [...oldLikeList, [response.blog !== 0]])
          }
          console.log(response.blog !== 0)
          return response.blog !== 0;
        } catch (error) {
        console.error('Error fetching likes:', error);
      }
    }

    async function initDiscussionData() {
      if (rootDiscussionList.length === 0) {
        const tempData = await fetchRootDiscussion();
        setRootDiscussionList(tempData); // Update the state with fetched details
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

   const fetchRootDiscussion = async (url = null) => {
    try {
      const response = await fetch(url ?? `${API_URL}comment/discussion/${id}/list/0/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch discussion details');
      }

      const responseData = await response.json();
    //   console.log(responseData)
      const tempData = {
        "next": responseData.next,
        "count": responseData.count,
        "previous": responseData.previous,
        "results": responseData.results
     }
    //   console.log(responseData)
      return tempData.results;
    } catch (error) {
    //   console.error('Error fetching pet details:', error);
      // Handle error, e.g., redirect to an error page
    }
  };

   useEffect(() => {
     initData();
     initDiscussionData();
   }, []);

   return (
      <body>
        <Header/>

        <div className={`${styles.main}`}>

          <div className={`${styles['blog-container']}`}>
          
            <Card className={styles["background-box"]}>
                {posts.map((post, index) => (
                <div className="blog">
                    {/* <div> */}
                    <BlogPost key={2*post.id} title={post.title} content={post.content} shelter={post.shelter} timestamp={post.timestamp} />
                    <div className={styles["rating-div"]}>
                    <FontAwesomeIcon key={2*post.id+1} className={`${likesList[index] ? styles.liked : ''}`} onClick={() => callLikes(post.id, likesList[index] ? 'DELETE' : 'POST')}icon={faHeart} />
                    <div className={styles["likes-text"]}>{[post.num_likes] + ' likes'}</div>
                    </div>
                    {/* </div> */}
                </div>
                  ))}
            </Card>
            </div>
            <div className={`${styles['blog-container']}`}>
            <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>
            <nav class="pagination" role="navigation" aria-label="pagination">

            
            <div className={``}>
              <p>
            <button className={`button is-secondary load-more ${previousPage === null ? 'invisible': ''}`} onClick={loadPrevious}>Load Previous</button>
              </p>
            </div>
            
            <a class="pagination-link is-current">{pageNum}</a>

            <div className={``}>
              <p>
                <button className={`button is-secondary load-more ${nextPage === null ? 'invisible': ''}`} onClick={loadNext}>Load Next</button>
              </p>
            </div>
            </nav>
            <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>
          </div>
        </div>
         
        <div className={styles['review-section']}>
               <p className={styles.review}>Discussion:</p>
               <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>

               <div className={styles['write-review']}>

                  <form className={`${styles['form']}`} onSubmit={handleSubmit}>
                     <textarea
                     value={textareaValue}
                     onChange={handleTextareaChange}
                     ></textarea>

                     <button type="submit" className={`${styles['is-secondary']} ${styles.button} ${styles.secret3}`}>
                     Submit Review
                     </button>
                  </form>

               {/* https://bulma.io/documentation/layout/media-object/ */}
               </div>

               {rootDiscussionList && rootDiscussionList.map((appResult, index) => (
                <DiscussionCard key={appResult.id} props={appResult} />
              ))}

            </div>

         <Footer/>
      </body>
   );
}