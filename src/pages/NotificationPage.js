import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../pagecss/notificationpage.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Notification from "../components/Notification";
var API_URL = process.env.REACT_APP_API_URL;

function NotificationPage() {
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState("initial");
  const { id } = useParams();

  const [notiList, setNotiList] = useState([]);

  const fetchNotiList = async (url = null) => {
    try {
      const response = await fetch(url ?? API_URL + `notification/list/?page=${pageNum}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch pet details");
      }

      const responseData = await response.json();
      // console.log(responseData)
      const tempData = {
        count: responseData.count,
        next: responseData.next,
        previous: responseData.previous,
        results: responseData.results,
      };
      console.log(tempData);
      setNextPage(tempData.next);
      return tempData.results; // Update the state with fetched details
    } catch (error) {
      console.error("Error fetching pet details:", error);
      // Handle error, e.g., redirect to an error page
    }
  };

  useEffect(() => {
    initData();
  }, []);

  async function loadNext() {
    if (pageNum !== -1) {   
      const tempData = await fetchNotiList(nextPage);
      setNotiList((oldPetList) => [...oldPetList, ...tempData])
      setPageNum(preNum => preNum + 1)
      // setDisableLoading(true);c
    }
  }

  async function initData() {
    console.log("hi")
    console.log(notiList)
    if (notiList.length === 0) {
      console.log("hoya")
      const tempData = await fetchNotiList();
      setPageNum(pageNum + 1);
      setNotiList(tempData); // Update the state with fetched details
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let url = `${API_URL}notification/list/?page=1`;
    const tempPage = await setPageNum(1);
    setNextPage("initial");
    formData.forEach((param, key) => {
      if (param !== 'All') {url += param !== '' ? `&${key}=${param}` : '';}
    })
    console.log("url = " + url);
    const tempData = await fetchNotiList(url);
    setNotiList(tempData);
  };


  return (
    <>
      <Header />
      <div class="main_notif">
        <h1>Notifications</h1>
        <form id='search_form' onSubmit={handleSearch}>
        <div className={`filter`}>
                <div className={`label`}>Status</div>
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='status'>
                      <option>All</option>
                      <option>Unread</option>
                      <option>Read</option>
                    </select>
                  </div>
                </div>
              </div>

              <p className={`control`}>
                  <button type='submit' className={`button is-secondary ${styles['is-secondary']}`}>
                    Search
                  </button>
                </p>
                </form>

        <div class="notification_container">
          {/* <Notification
            title="Reminder"
            text="Reminder to feed your El Gato so he remains happy and strong! You
              wouldn't want a hungry El Gato, would you? More text here! Please
              take a second to tell me more about your El Gato! He looked very
              lively last month!"
          /> */}

          {/* {notiList &&
            notiList.results &&
            notiList.results.map((notiResults, index) => (
              <Notification props={notiResults} key={notiResults.id} />
            ))} */}

          <div class="notification_container">
          {notiList && notiList.map((petResult, index) => (
                <Notification key={petResult.id} props={petResult} />
              ))}
          </div>
        </div>
        <div className={`search-top ${styles['search-top']}`}>
          <div>
            <p>
          <button className={`button is-secondary load-more ${(notiList ? notiList.length === 0 : false) || nextPage === null ? 'hide': ''}`} onClick={loadNext}>Load More</button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotificationPage;
