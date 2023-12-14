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
  const shelterID = localStorage.getItem("userId"); 

  const [petList, setPetList] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    // check if the user is a seeker
    if (localStorage.getItem("isShelter") !== "true") {
      navigate("/fallback");
    }

    const fetchPetList = async () => {
      try {
        const response = await fetch(API_URL + `pet/list/`, {
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
        setPetList(tempData); // Update the state with fetched details
      } catch (error) {
        console.error("Error fetching pet details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchPetList();
  }, [id]);

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

        {/* pets in this shelter */}
        <div className={styles["pet_card_array"]}>
          {petList &&
            petList.results &&
            petList.results.map((petResult, index) => (
              petResult.shelter === parseInt(shelterID) &&
              <ShelterPetCard key={petResult.id} props={petResult} />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
