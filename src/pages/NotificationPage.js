import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pagecss/notificationpage.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Notification from "../components/Notification";

function NotificationPage() {
  const { id } = useParams();

  const [notiList, setNotiList] = useState(null);

  useEffect(() => {
    const fetchNotiList = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/notification/list/`, {
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
          "count": responseData.count,
          "next": responseData.next,
          "previous": responseData.previous,
          "results": responseData.results
        }
        console.log(tempData);
        setNotiList(tempData); // Update the state with fetched details
      } catch (error) {
        console.error('Error fetching pet details:', error);
        // Handle error, e.g., redirect to an error page
      }
    };
  
    fetchNotiList();
  }, [id]);

  return (
    <>
      <Header />
      <div class="main_notif">
        <h1>Notifications</h1>
        <div class="notification_container">
          {/* <Notification
            title="Reminder"
            text="Reminder to feed your El Gato so he remains happy and strong! You
              wouldn't want a hungry El Gato, would you? More text here! Please
              take a second to tell me more about your El Gato! He looked very
              lively last month!"
          /> */}

          {notiList && notiList.results && notiList.results.map((notiResults, index) => (
                <Notification props={notiResults} key={notiResults.id}/>
              ))}

        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotificationPage;
