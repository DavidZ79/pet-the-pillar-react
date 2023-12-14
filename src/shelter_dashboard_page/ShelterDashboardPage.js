import Footer from "../components/Footer";
import Button from "../components/Button";
import Header from "../components/Header";
import ShelterPetCard from "../components/ShelterPetCard";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./shelter_dashboard_page.module.css";
import shelterpic from "./shelter_dashboard_images/shelter_management_front.jpg";
var API_URL = process.env.REACT_APP_API_URL;

export default function ShelterDashboardPage() {
  const { id } = useParams();
  const [nextPage, setNextPage] = useState("initial");
  const [pageNum, setPageNum] = useState(1);
  const shelterID = localStorage.getItem("userId"); 

  const [petList, setPetList] = useState([]);
  const fetchPetList = async (url = null) => {
    try {
      console.log(API_URL + `pet/all/?page=${pageNum}`)
      const response = await fetch(url ?? API_URL + `pet/all/?page=${pageNum}`, {
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
        "count": responseData.count,
        "next": responseData.next,
        "previous": responseData.previous,
        "results": responseData.results
      }
      setNextPage(tempData.next);
      return tempData.results;
    } catch (error) {
      console.error("Error fetching pet details:", error);
      // Handle error, e.g., redirect to an error page
    }
  };
  async function initData() {
    console.log("hi")
    if (petList.length === 0) {
      console.log("hoya")
      const tempData = await fetchPetList();
      setPageNum(pageNum + 1);
      setPetList(tempData); // Update the state with fetched details
    }
  }

  useEffect(() => {
    initData();
  }, [id]);

  async function loadNext() {
    if (pageNum !== -1) {   
      const tempData = await fetchPetList(nextPage);
      setPetList((oldPetList) => [...oldPetList, ...tempData])
      setPageNum(preNum => preNum + 1)
      // setDisableLoading(true);c
    }
  }

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div>
          <img
            src={shelterpic}
            alt="Shelter Pic"
            className={styles.shelter_img_front}
          />
        </div>
        <div className={styles.cards_container}>
          <div className={styles.h1}>Shelter Management</div>
          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.h2}>Create New Listing</div>
              <p>List another pet in this shelter for adoption</p>
              <Link to="/pet_create">
                <Button>Create</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* pet list */}
        <div className={`tile is-ancestor pet-list`}>
          <div className={`tile is-vertical is-12 ${styles['secret2']}`}>
            <div className='tile is-12' style={{ flexWrap: 'wrap' }}> {/* Added inline style for flex wrap */}
              {/* pet 1 */}

                  {petList && petList.map((petResult, index) => (
                <ShelterPetCard key={petResult.id} props={petResult} />
              ))}
            </div>
          </div>
        </div>
        <div className={`search-top ${styles['search-top']}`}>
          <div>
            <p>
          <button className={`button is-secondary load-more ${(petList ? petList.length === 0 : false) || nextPage === null ? 'hide': ''}`} onClick={loadNext}>Load More</button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
