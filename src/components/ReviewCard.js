import "../css/main_style.css";
import styles from '../pagecss/shelter.module.css';

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cat from "../assets/cat.png";
import pfp from '../assets/profile.png';

var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

export default function ReviewCard({ props }) {
  const [reviewDetails, setReviewDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [rootReviewList, setRootReviewList] = useState([]);
  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await fetch(`${API_URL}comment/review/detail/${props.id}/`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch pet details");
        }

        const responseData = await response.json();
        // console.log(responseData)
        const tempData = {
          id: responseData.id,
          content: responseData.content,
          user: responseData.user,
          timestamp: responseData.timestamp,
          parent: responseData.parent,
          review_children: responseData.review_children,
          shelter: responseData.shelter,
        };
        setReviewDetails(tempData); // Update the state with fetched details
        const regex = /\d+/;
        const match = tempData.user.match(regex);
        fetchUser(match ? match[0] : null);
      } catch (error) {
        // console.error("Error fetching pet details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    const fetchUser = async (userId) => {
      try {
        const response = await fetch(
          API_URL + `account/shelter/${userId}/`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );

        if (!response.ok) {
          // throw new Error("Failed to fetch account details");
        }

        const responseData = await response.json();
        // console.log(responseData)
        const tempData = {
          username: responseData.username,
          picture: responseData.picture,
          id: responseData.id,
        };
        setUser(tempData); // Update the state with fetched details
      } catch (error) {
        try {
        const response = await fetch(
          API_URL + `account/seeker/${userId}/`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );

        if (!response.ok) {
          // throw new Error("Failed to fetch account details");
        }

        const responseData = await response.json();
        // console.log(responseData)
        const tempData = {
          username: responseData.username,
          picture: responseData.picture ?? pfp,
          id: responseData.id,
        };
        setUser(tempData); // Update the state with fetched details
      } catch (error) {
        const tempData = {
          username: "Anon",
          picture: pfp,
          id: 0,
        };
        setUser(tempData);
      }
      }
    };

    fetchReviewDetails();
  }, []);

  const fetchRootReviews = async () => {
    try {
      // console.log(`${API_URL}comment/review/${reviewDetails.shelter}/list/${props.id}/`)
      const response = await fetch(`${API_URL}comment/review/${reviewDetails.shelter}/list/${props.id}/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch review details');
      }

      const responseData = await response.json();
    //   console.log(responseData)
      const tempData = {
        "next": responseData.next,
        "count": responseData.count,
        "previous": responseData.previous,
        "results": responseData.results
     }
      // console.log(responseData)
      return tempData.results;
    } catch (error) {
      // console.error('Error fetching pet details:', error);
      // Handle error, e.g., redirect to an error page
    }
  };

  async function initReviewData() {
    const tempData = await fetchRootReviews();
    setRootReviewList(tempData); // Update the state with fetched details
  }

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

 const handleSubmit = async (event) => {
    event.preventDefault();

    // Here you can use textareaValue in your POST request
    console.log('Submitting:', textareaValue);

    // Example POST request
    const response = await fetch(API_URL + `comment/review/${reviewDetails.shelter}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        // Additional headers if needed
      },
      body: JSON.stringify({ content: textareaValue, user: 1, parent: props.id }),
    });
    console.log(props.id);
    const data = await response.json();
    console.log(data);
    const tempData = await fetchRootReviews();
    setRootReviewList(tempData);
  };


  useEffect(() => {
    initReviewData();
  }, [reviewDetails]);

  return (
    <article className={styles['media-box']}>
                  <figure className='media-left'>
                     <p className='image is-64x64'>
                        <img className='is-rounded' src={user ? user.picture ?? pfp : pfp}/>
                     </p>
                  </figure>

                  <div className='media-content'>
                     <div className='content'>
                        <p className={styles['br-text']}>
                           <span className={`${styles['review-name']} ${reviewDetails && user ? (reviewDetails.shelter === user.id ? styles['shelter-post'] : 'anon') : 'anon'}`}>{user ? user.username : ''}</span>
                           <br/>{reviewDetails ? reviewDetails.content : ''}<br/>
                           <small><time>{user ? new Date(reviewDetails?.timestamp).toLocaleString() : ''}</time></small>
                        </p>
                     </div>

                     {rootReviewList && rootReviewList.map((appResult, index) => (
                <ReviewCard key={appResult.id} props={appResult} />
              ))}

<form className={`${styles['form']}`} onSubmit={handleSubmit}>
      <textarea
        value={textareaValue}
        onChange={handleTextareaChange}
      ></textarea>

      <button type="submit" className={`${styles['is-secondary']} ${styles.button} ${styles.secret3}`}>
        Submit Review
      </button>
    </form>

                  </div>
                  
               </article>
  );
}
