import Header from '../components/Header';
import Footer from '../components/Footer';

import styles1 from "../css/main_style.css";
import styles2 from "../css/pet_listing.css"
import styles3 from '../pagecss/searchpage.module.css'
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// import cat from "../assets/cat.png";

import AppCard from '../components/AppCard';

var API_URL = process.env.REACT_APP_API_URL;

const styles = {...styles1,...styles2,...styles3};

export default function SearchPage() {
  const [appList, setAppList] = useState([]);
  const [nextPage, setNextPage] = useState("initial");
  const [pageNum, setPageNum] = useState(1);
  // const [disableLoading, setDisableLoading] = useState(true)

  const fetchAppList = async (url = null) => {
    console.log(url ?? `${API_URL}application/list/?page=${pageNum}`)
    try {
      const params = new URLSearchParams(window.location.search)
      console.log(url ?? `${API_URL}application/list/?page=${pageNum}`)
      const response = await fetch(url ?? `${API_URL}application/list/?page=${pageNum}` , {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch app details');
      }

      const responseData = await response.json();
      console.log(responseData);
      const tempData = {
        "count": responseData.count,
        "next": responseData.next,
        "previous": responseData.previous,
        "results": responseData.results
      }
      setNextPage(tempData.next);
      console.log(tempData.next);
      console.log("up");
      // setDisableLoading(false);
      return tempData.results;
    } catch (error) {
      console.error('Error fetching app details:', error);
      // Handle error, e.g., redirect to an error page
    }
  };

  async function loadNext() {
    if (pageNum !== -1) {   
      const tempData = await fetchAppList(nextPage);
      setAppList((oldAppList) => [...oldAppList, ...tempData])
      setPageNum(preNum => preNum + 1)
      // setDisableLoading(true);c
    }
  }

  async function initData() {
    if (appList.length === 0) {
      const tempData = await fetchAppList();
      setPageNum(pageNum + 1);
      setAppList(tempData); // Update the state with fetched details
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let url = `${API_URL}application/list/?page=1`;
  
    // Set pageNum and nextPage. These updates will be reflected in the next render.
    setPageNum(1);
    console.log("SET PAGE NUM");
    setNextPage("initial");
  
    // Construct the URL with parameters from formData
    formData.forEach((param, key) => {
      url += param !== '' ? `&${key}=${param}` : '';
    })
  
    // Fetch the application list
    const tempData = await fetchAppList(url);
    setAppList(tempData);
  
    console.log("FINISH SETTING SEARCH DATA");
  }

  const navigate = useNavigate();

  useEffect(() => {

    // check if user is not logged in
    if (localStorage.getItem("userId") == 0) {
      navigate("/fallback");
    }

    console.log("INIT DATA")
    initData();
  }, []);

  useEffect(() => {
    console.log(pageNum)
    console.log(nextPage)
  }, [pageNum, nextPage]);
  
  return (
    <body>
      <Header/>

      <div className={`${styles.main}`}>
        <form id='search_form' className='search-form' onSubmit={handleSearch}>
          <div className={`form search-container ${styles['search-container']}`}>
            <div className={`search-top ${styles['search-top']}`}> 
              <div className={`sort-container ${styles['sort-container']}`}>
                <div className={`label sort-label ${styles['sort-label']}`}>
                  Sort by:
                </div>

                {/* control??? */}
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='ordering' form='search_form'>
                      <option value=''>None</option>
                      <option value='timestamp'>Creation Time</option>
                      <option value='last_updated'>Last Updated</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={`sort-container ${styles['sort-container']}`}>
                <div className={`label sort-label ${styles['sort-label']}`}>
                  Status:
                </div>

              <div className={`filter`}>
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='status'>
                      <option></option>
                      <option>Accepted</option>
                      <option>Pending</option>
                      <option>Denied</option>
                      <option>Withdrawn</option>
                    </select>
                  </div>
                </div>
              </div>
              </div>

              {/* search bar */}
              <div className={`search-bar ${styles['search-bar']}`}>
                <p className={`control`}>
                  <button type='submit' className={`button is-secondary ${styles['is-secondary']}`}>
                    Search
                  </button>
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* app list */}
        <div className={`tile is-ancestor app-list`}>
          <div className='tile is-vertical is-12'>
            <div className='tile is-12' style={{ flexWrap: 'wrap' }}> {/* Added inline style for flex wrap */}
              {/* app 1 */}

                  {appList && appList.map((appResult, index) => (
                <AppCard key={appResult.id} props={appResult} />
              ))}
            </div>
          </div>
        </div>
        <div className={`search-top ${styles['search-top']}`}>
          <div>
            <p>
          <button className={`button is-secondary load-more ${appList.length === 0 || nextPage === null ? 'hide': ''}`} onClick={loadNext}>Load More</button>
            </p>
          </div>
        </div>


      </div>

      <Footer/>
    </body>
  );
}