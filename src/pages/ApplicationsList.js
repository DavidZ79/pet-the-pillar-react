import Header from '../components/Header';
import Footer from '../components/Footer';

import styles1 from "../css/main_style.css";
import styles2 from "../css/pet_listing.css"
import styles3 from '../pagecss/searchpage.module.css'
import { useState, useEffect } from "react";


// import cat from "../assets/cat.png";

import PetCard from '../components/PetCard';

var API_URL = process.env.REACT_APP_API_URL;

const styles = {...styles1,...styles2,...styles3};

export default function SearchPage() {
  const [petList, setPetList] = useState([]);
  const [nextPage, setNextPage] = useState("initial");
  const [pageNum, setPageNum] = useState(1);
  // const [disableLoading, setDisableLoading] = useState(true)

  const fetchAppList = async (url = null) => {
    console.log(nextPage)
    console.log(url)
    console.log(pageNum)
    if (pageNum !== 1 && nextPage === null) {
      console.log("WHY")
      return [];
    }
    try {
      const params = new URLSearchParams(window.location.search)
      const response = await fetch(url ?? `${API_URL}pet/list/?page=${pageNum}&species=${params.get('species') ?? ''}` , {
        method: 'GET',
        // headers: {
        //   'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        // },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pet details');
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
      // console.log(pageNum);
      // setDisableLoading(false);
      return tempData.results;
    } catch (error) {
      console.error('Error fetching pet details:', error);
      // Handle error, e.g., redirect to an error page
    }
  };

  async function loadNext() {
    if (pageNum !== -1) {   
      const tempData = await fetchAppList(nextPage);
      setPetList((oldPetList) => [...oldPetList, ...tempData])
      setPageNum(preNum => preNum + 1)
      // setDisableLoading(true);c
    }
  }

  async function initData() {
    if (petList.length === 0) {
      console.log("AAAAAAAAAAAAAAAAAAA")
      const tempData = await fetchAppList();
      setPageNum(pageNum + 1);
      setPetList(tempData); // Update the state with fetched details
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let url = `${API_URL}pet/list/?page=1`;
    const tempPage = await setPageNum(1);
    setNextPage("initial");
    formData.forEach((param, key) => {
      url += param !== '' ? `&${key}=${param}` : '';
    })
    console.log(url);
    const tempData = await fetchAppList(url);
    setPetList(tempData);
    console.log(tempData)
    console.log("FINISH SETTING SEARCH DATA")
  }

  useEffect(() => {
    console.log("INIT DATA")
    initData();
  }, []);
  
  return (
    <body>
      <Header/>

      <div className={`${styles.main}`}>
        <form id='search_form' onSubmit={handleSearch}>
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
                      <option>All</option>
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

        {/* pet list */}
        <div className={`tile is-ancestor pet-list`}>
          <div className='tile is-vertical is-12'>
            <div className='tile is-12' style={{ flexWrap: 'wrap' }}> {/* Added inline style for flex wrap */}
              {/* pet 1 */}

                  {petList && petList.map((petResult, index) => (
                <PetCard key={petResult.id} props={petResult} />
              ))}
            </div>
          </div>
        </div>
        <div className={`search-top ${styles['search-top']}`}>
          <div>
            <p>
          <button className={`button is-secondary load-more ${petList.length === 0 || nextPage === null ? 'hide': ''}`} onClick={loadNext}>Load More</button>
            </p>
          </div>
        </div>


      </div>

      <Footer/>
    </body>
  );
}