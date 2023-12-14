import Header from "../components/Header";
import Footer from "../components/Footer";
import ShelterCard from "../components/ShelterCard";

import styles4 from "../pagecss/shelterlistpage.module.css";
import styles1 from "../css/main_style.css";
import styles2 from "../css/pet_listing.css"
import styles3 from '../pagecss/searchpage.module.css'

import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const styles = {...styles1,...styles2,...styles3,...styles4};
export default function ShelterListPage() {
  const { id } = useParams();
  const [shelterList, setShelterList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState("initial");
  const fetchShelterList = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/account/all/shelter/?page=${pageNum}`, {
        method: 'GET',
        headers: {
        },
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
      return tempData.results;
    } catch (error) {
      console.error('Error fetching pet details:', error);
      // Handle error, e.g., redirect to an error page
    }
  };

  async function initData() {
    console.log("init");
    if (shelterList.length === 0) {
      console.log("init2");
      const tempData = await fetchShelterList();
      setPageNum(pageNum + 1);
      setShelterList(tempData); // Update the state with fetched details
    }
  }

  useEffect(() => {
    initData();
  }, [id]);

  async function loadNext() {
    if (pageNum !== -1) {   
      const tempData = await fetchShelterList(nextPage);
      setShelterList((oldShelterList) => [...oldShelterList, ...tempData])
      setPageNum(preNum => preNum + 1)
      // setDisableLoading(true);c
    }
  }

  return (
    <>
      <Header />
        <div className={styles.main}>
          <p className={styles.title}>
            List of all shelters
          </p>

          <div className={styles.card_container}>
            {shelterList &&
              shelterList.map((shelterResult, index) => (
                <ShelterCard key={shelterResult.id} props={shelterResult} />
              ))}
          </div>
          <div className={`search-top ${styles['search-top']}`}>
        <div>
            <p>
          <button className={`button is-secondary load-more ${shelterList.length === 0 || nextPage === null ? 'hide': ''}`} onClick={loadNext}>Load More</button>
            </p>
          </div>
          </div>
        </div>
          

      <Footer />
    </>
  );
}
