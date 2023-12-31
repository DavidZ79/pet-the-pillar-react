import "../css/main_style.css";
import styles from "../css/PetCard.module.css";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import cat from "../assets/cat.png";

var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

export default function ShelterPetCard({ props }) {
  const [petDetails, setPetDetails] = useState(null);
  const [shelterName, setShelterName] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`${API_URL}pet/${props.id}/`, {
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
          id: responseData.id,
          photo: responseData.photos[0]["image"],
          name: responseData.name,
          status: responseData.status,
          description: responseData.description,
          behavior: responseData.behavior,
          medicalHistory: responseData.medicalHistory,
          specialNeeds: responseData.specialNeeds,
          age: responseData.age,
          breed: responseData.breed,
          gender: responseData.gender,
          size: responseData.size,
          species: responseData.species,
          color: responseData.color,
          timestamp: responseData.timestamp,
          location: responseData.location,
          fee: responseData.fee,
          shelter: responseData.shelter,
        };
        setPetDetails(tempData); // Update the state with fetched details
        fetchShelterName(tempData.shelter);
      } catch (error) {
        console.error("Error fetching pet details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    const fetchShelterName = async (shelterID) => {
      try {
        const response = await fetch(
          API_URL + `account/shelter/${shelterID}/`,
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
          username: responseData.username,
        };
        setShelterName(tempData); // Update the state with fetched details
      } catch (error) {
        console.error("Error fetching pet details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchPetDetails();
  }, []);

  return (
    <div className={styles.shelter_pet_card_main}>
      <div className={styles.card}>
        {/* image */}
        <div className={styles.cardImage}>
          <Link to={`/pet_detail/${props.id}`}>
            <figure className={styles.cardImage}>
              <img
                src={petDetails ? BASE_URL + petDetails.photo : cat}
                alt="Placeholder pic"
              />
            </figure>
          </Link>
        </div>

        {/* title and subtitle */}
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{petDetails ? petDetails.name : ""}</p>
              <p className="subtitle is-6">
                <Link to={`/shelter/${petDetails ? petDetails.shelter : ""}`}>
                  {shelterName ? shelterName.username : ""}
                </Link>
              </p>
            </div>
          </div>

          {/* details */}
          <div className="content">
            <div className="">
              <div>Age: {petDetails ? petDetails.age : ""}</div>
              <div>Gender: {petDetails ? petDetails.gender : ""}</div>
            </div>
            <div>Breed: {petDetails ? petDetails.breed : ""}</div>
          </div>
          <time>{new Date(petDetails?.timestamp).toLocaleString()}</time>

          {/* buttons */}
          <div>
            <Link to={`/pet_update/${props.id}`}>
              <button className="button is-secondary secret"> Update</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
