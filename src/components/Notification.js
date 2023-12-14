import "../css/notification.css";
import x from "./x.png";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
var API_URL = process.env.REACT_APP_API_URL;

// var URL = process.env.REACT_APP_API_URL;

function Notification({props}) {
    const [notification, setNotification] = useState(null);
    const [isVisible, setIsVisible] = useState(true); // Visibility state

    async function del() {
        console.log("delete");
        const response = await fetch(API_URL + `notification/${props.id}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });

        if (response.ok) {
          setIsVisible(false); // Hide notification on successful delete
        } 
    }

  const { id } = useParams();

  async function handleNotificationClick() {
    fetchNotification();
  }

  const fetchNotification = async () => {
    try {
      const response = await fetch(API_URL + `notification/${props.id}/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pet details');
      }

      const responseData = await response.json();
      // console.log(responseData)
      const tempData = {
        "id": responseData.id,
        "user": responseData.user,
        "status": responseData.status,
        "forward": responseData.forward,
        "content": responseData.content,
        "timestamp": responseData.timestamp
      }
      setNotification(tempData); // Update the state with fetched details
    } catch (error) {
      console.error('Error fetching pet details:', error);
      // Handle error, e.g., redirect to an error page
    }
  };

  if (!isVisible) {
    return null; // Don't render the component if it's not visible
  }


    return (
        <div class="notification">
          {/* bell icon */}
          <div class="notification-bell-div">
            <svg
              class="notification-bell"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
              <path
                d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
              />
            </svg>
          </div>

          {/* text */}
          <div class="text_container">
            {/* <h2>{props.user}</h2> */}
            <Link to={props.forward} onClick={handleNotificationClick}>
            <p class="notif_content">
              {props.content}
            </p>
            </Link>
          </div>

          <div class="text_container">
            {/* <h2>{props.user}</h2> */}
            <p class="notif_content">
              {new Date(props.timestamp).toLocaleString()}
            </p>
          </div>

          <div class="text_container">
            {/* <h2>{props.user}</h2> */}
            <p class="notif_content">
              {props.status}
            </p>
          </div>

          {/* x button */}
          <div class="x">
            <button class="notif_btn" onClick={del}><img src={x} alt="" /></button>
          </div>
        </div>
    )
}

export default Notification;