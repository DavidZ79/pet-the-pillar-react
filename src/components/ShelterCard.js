import Button from "./Button";

import styles from "../css/ShelterCard.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import default_picture from "../assets/profile.png";
var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

export default function ShelterCard({props}) {
  const [shelterDetail, SetShelterDetail] = useState([]);

  useEffect(() => {
    const fetShelterDetails = async () => {
      try {
        const response = await fetch(
          API_URL + `account/shelter/${props.id}/`,
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
        console.log(responseData);
        // console.log(responseData)
        const tempData = {
          "id": responseData.id,
          "username": responseData.username,
          "email": responseData.email,
          "phoneNumber": responseData.phoneNumber,
          "location": responseData.location,
          "picture": responseData.picture ?? default_picture,
          "missionStatement": responseData.missionStatement,
          "totalRating": responseData.totalRating,
          "numberOfRating": responseData.numberOfRating
        };
        SetShelterDetail(tempData); // Update the state with fetched details
      } catch (error) {
        console.error("Error fetching pet details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetShelterDetails();
  }, [props.id]);

  return (
    
    <>
        <div className={styles.sheltercard}>
            <h2>{shelterDetail.username}</h2>
            <img src={shelterDetail.picture} alt="Shelter" />
            <Link to={`/shelter/${shelterDetail ? shelterDetail.id : ""}`}>
              <button className={styles['shelter-btn']} >View Shelter</button>
            </Link>
        </div>
    </>
  );
}
