import "../css/main_style.css";
import styles from '../pagecss/shelter.module.css';

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cat from "../assets/cat.png";
import pfp from '../assets/profile.png';

var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

export default function DiscussionCard({ props }) {
  const [discussionDetails, setDiscussionDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [rootDiscussionList, setRootDiscussionList] = useState([]);
  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    const fetchDiscussionDetails = async () => {
      try {
        const response = await fetch(`${API_URL}comment/discussion/detail/${props.id}/`, {
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
          discussion_children: responseData.discussion_children,
          shelter: responseData.shelter,
        };
        setDiscussionDetails(tempData); // Update the state with fetched details
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

    fetchDiscussionDetails();
  }, []);

  const fetchRootDiscussions = async () => {
    try {
      // console.log(`${API_URL}comment/discussion/${discussionDetails.shelter}/list/${props.id}/`)
      const response = await fetch(`${API_URL}comment/discussion/${discussionDetails.shelter}/list/${props.id}/`, {
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
      // console.log(responseData)
      return tempData.results;
    } catch (error) {
      // console.error('Error fetching pet details:', error);
      // Handle error, e.g., redirect to an error page
    }
  };

  async function initDiscussionData() {
    const tempData = await fetchRootDiscussions();
    setRootDiscussionList(tempData); // Update the state with fetched details
  }

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

 const handleSubmit = async (event) => {
    event.preventDefault();

    // Here you can use textareaValue in your POST request
    console.log('Submitting:', textareaValue);

    // Example POST request
    const response = await fetch(`http://127.0.0.1:8000/api/comment/discussion/${discussionDetails.shelter}/`, {
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
    const tempData = await fetchRootDiscussions();
    setRootDiscussionList(tempData);
  };


  useEffect(() => {
    initDiscussionData();
  }, [discussionDetails]);

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
                           <span className={`${styles['discussion-name']} ${discussionDetails && user ? (discussionDetails.shelter === user.id ? styles['shelter-post'] : 'anon') : 'anon'}`}>{user ? user.username : ''}</span>
                           <br/>{discussionDetails ? discussionDetails.content : ''}<br/>
                           <small><time>{user ? new Date(discussionDetails?.timestamp).toLocaleString() : ''}</time></small>
                        </p>
                     </div>

                     {rootDiscussionList && rootDiscussionList.map((appResult, index) => (
                <DiscussionCard key={appResult.id} props={appResult} />
              ))}

<form className={`${styles['form']}  ${styles['write-review']}`} onSubmit={handleSubmit}>
      <textarea
        value={textareaValue}
        onChange={handleTextareaChange}
      ></textarea>

      <button type="submit" className={`button ${styles['is-secondary']} ${styles.button} ${styles.submit_button} ${styles.secret3}`}>
        Submit Discussion
      </button>
    </form>

                  </div>
                  
               </article>
  );
}
