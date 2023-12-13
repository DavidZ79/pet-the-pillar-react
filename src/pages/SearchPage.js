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
  // const [disableLoading, setDisableLoading] = useState(true)

  const fetchPetList = async (url = null) => {
    console.log(nextPage)
    console.log(pageNum)
    if (pageNum !== 1 && nextPage === null) {
      console.log("WHY")
      return [];
    }
    try {
      const params = new URLSearchParams(window.location.search)
      const response = await fetch(url ?? `${URL}pet/list/?page=${pageNum}&species=${params.get('species') ?? ''}`, {
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
      const tempData = await fetchPetList(nextPage);
      setPetList((oldPetList) => [...oldPetList, ...tempData])
      setPageNum(preNum => preNum + 1)
      // setDisableLoading(true);c
    }
  }

  async function initData() {
    if (petList.length === 0) {
      const tempData = await fetchPetList();
      setPageNum(pageNum + 1);
      setPetList(tempData); // Update the state with fetched details
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let url = `${URL}pet/list/?page=1`;
    const tempPage = await setPageNum(1);
    setNextPage("initial");
    formData.forEach((param, key) => {
      url += param !== '' ? `&${key}=${param}` : '';
    })
    console.log(url);
    const tempData = await fetchPetList(url);
    setPetList(tempData);
    console.log(tempData)
    console.log("FINISH SETTING SEARCH DATA")
  }

  useEffect(() => {
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
                      <option value='age'>Age</option>
                      <option value='size'>Size</option>
                      <option value='name'>Name</option>
                      <option value='name'>Breed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* search bar */}
              <div className={`search-bar ${styles['search-bar']}`}>
                <p className={`${styles['search-bar-input']} control search-bar-input`}>
                  <input name="species" className={`${styles.input} input`} input="text" placeholder='Search an animal' value={new URLSearchParams(window.location.search).get('species' ?? '')}/>
                </p>

                <p className={`control`}>
                  <button type='submit' className={`button is-secondary ${styles['is-secondary']}`}>
                    Search
                  </button>
                </p>
              </div>
            </div>

            <div className={`search-bottom ${styles['search-bottom']}`}>
              {/* breed filter */}
                <div className={`filter`}>
                <div className={`label`}>Breed</div>
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='breed'>
                      <option value=''>All</option>
                      <option>Labrador</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* min age filter */}
              <div className={`filter`}>
                <div className={`label`}>Min Age</div>
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='min_age'>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>10</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* max age filter */}
              <div className={`filter`}>
                <div className={`label`}> Max Age</div>
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='max_age'>
                      <option>99</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>20</option>
                    </select>
                  </div>
                </div>
              </div>


              {/* gender filter */}
              <div className={`filter`}>
                <div className={`label`}>Gender</div>
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='gender'>
                      <option value=''>All</option>
                      <option value='M'>Male</option>
                      <option value='F'>Female</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* status filter */}
              <div className={`filter`}>
                <div className={`label`}>Status</div>
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='status'>
                      <option>Available</option>
                      <option>Adopted</option>
                      <option>Pending</option>
                      <option>Withdrawn</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* size filter */}
              <div className={`filter`}>
                <div className={`label`}>Size</div>
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='size'>
                      <option value=''>All</option>
                      <option value='0'>X-Small</option>
                      <option value='1'>Small</option>
                      <option value='2'>Medium</option>
                      <option value='3'>Large</option>
                      <option value='4'>X-Large</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* color filter */}
              <div className={`filter`}>
                <div className={`label`}>Color</div>
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='color'>
                      <option value=''>All</option>
                      <option>Black</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* shelter filter */}
              <div className={`filter`}>
                <div className={`label`}>Shelter</div>
                <div className={`control`}>
                  <div className={`select`}>
                    <select name='shelter'>
                      <option value=''>All</option>
                      <option>Salt Moon</option>
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

