import Header from '../components/Header';
import Footer from '../components/Footer';

import styles1 from "../css/main_style.css";
import styles2 from "../css/pet_listing.css"
import styles3 from '../pagecss/searchpage.module.css'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


// import cat from "../assets/cat.png";

import PetCard from '../components/PetCard';

var URL = process.env.REACT_APP_API_URL;

const styles = {...styles1,...styles2,...styles3};

export default function SearchPage() {
  const [petList, setPetList] = useState([]);
  const [nextPage, setNextPage] = useState("initial");
  const [pageNum, setPageNum] = useState(1);
  const [disableLoading, setDisableLoading] = useState(true)

  const fetchPetList = async () => {
    console.log(nextPage)
    console.log(pageNum)
    if (nextPage === null) {
      return []
    }
    try {
      const response = await fetch(`${URL}pet/list/?page=${pageNum}`, {
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
      setNextPage(tempData.next);
      console.log(pageNum)
      setDisableLoading(false);
      return tempData.results
    } catch (error) {
      console.error('Error fetching pet details:', error);
      // Handle error, e.g., redirect to an error page
    }
  };

  async function loadNext() {
    if (pageNum !== -1) {   
      const tempData = await fetchPetList();
      setPetList((oldPetList) => [...oldPetList, ...tempData])
      setPageNum(preNum => preNum + 1)
      setDisableLoading(true);
    }
  }

  async function initData() {
    const tempData = await fetchPetList();
    setPageNum(pageNum + 1)
    setPetList(tempData); // Update the state with fetched details
  }

  useEffect(() => {
    initData();
  }, []);
  
  return (
    <body>
      <Header/>

      <div className={`${styles.main}`}>
        <form id='search_form'>
        <div className={`form search-container ${styles['search-container']}`}>
          <div className={`search-top ${styles['search-top']}`}> 
            <div className={`sort-container ${styles['sort-container']}`}>
              <div className={`label sort-label ${styles['sort-label']}`}>
                Sort by:
              </div>

              {/* control??? */}
              <div className={`control`}>
                <div className={`select`}>
                  <select name='sorting' form='search_form'>
                    <option>Size</option>
                    <option>Name</option>
                    <option>Age</option>
                  </select>
                </div>
              </div>
            </div>

            {/* search bar */}
            <div className={`search-bar ${styles['search-bar']}`}>
              <p className={`${styles['search-bar-input']} control search-bar-input`}>
                <input className={`${styles.input} input`} input="text" placeholder='Search an animal'/>
              </p>

              <p className={`control`}>
                <Link to='/search'>
                  <button type='submit' form='search_form' className={`button is-secondary ${styles['is-secondary']}`}>
                    Search
                  </button>
                </Link>
              </p>
            </div>
          </div>

          <div className={`search-bottom ${styles['search-bottom']}`}>
            {/* breed filter */}
            <div className={`filter`}>
              <div className={`label`}>Breed</div>
              <div className={`control`}>
                <div className={`select`}>
                  <select>
                    <option>Search an animal</option>
                    <option>Labrador</option>
                  </select>
                </div>
              </div>
            </div>

            {/* age filter */}
            <div className={`filter`}>
              <div className={`label`}>Age</div>
              <div className={`control`}>
                <div className={`select`}>
                  <select>
                    <option>Search an animal</option>
                    <option>10+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* gender filter */}
            <div className={`filter`}>
              <div className={`label`}>Gender</div>
              <div className={`control`}>
                <div className={`select`}>
                  <select>
                    <option>Search an animal</option>
                    <option>Male</option>
                  </select>
                </div>
              </div>
            </div>

            {/* size filter */}
            <div className={`filter`}>
              <div className={`label`}>Size</div>
              <div className={`control`}>
                <div className={`select`}>
                  <select>
                    <option>Search an animal</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* color filter */}
            <div className={`filter`}>
              <div className={`label`}>Color</div>
              <div className={`control`}>
                <div className={`select`}>
                  <select>
                    <option>Search an animal</option>
                    <option>Black</option>
                  </select>
                </div>
              </div>
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
                <PetCard key={index} props={petResult} />
              ))}
            </div>
          </div>
        </div>
        <div className='load-container'>
          <div>
          <button className={`button is-secondary load-more ${nextPage === null ? 'hide': ''}`} onClick={loadNext}>Load More</button>
          </div>
        </div>


      </div>

      <Footer/>
    </body>
  );
}

