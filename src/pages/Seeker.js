import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";

import "bulma/css/bulma.min.css";
import styles from "../pagecss/seeker.module.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";

var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

export default function SeekerPage() {
  const { id } = useParams(); // id of pet in this seeker

  const [seekerDetails, setSeekerDetails] = useState(null);

  useEffect(() => {
    const fetchSeekerDetails = async () => {
      try {
        console.log(id);
        console.log(localStorage.getItem("userId"));
        const response = await fetch(API_URL + "account/seeker/" + id + "/", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });
        console.log("hello");
        console.log(response);

        // check if user is not logged in
        if (localStorage.getItem("isShelter") === "true" || localStorage.getItem("userId") == 0) {
          navigate("/fallback");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch seeker details");
        }

        const responseData = await response.json();
        const tempData = {
          id: responseData.id,
          username: responseData.username,
          email: responseData.email,
          phoneNumber: responseData.phoneNumber,
          preference: responseData.preference,
          location: responseData.location,
        };

        setSeekerDetails(tempData); // Update the state with fetched details
      } catch (error) {
        console.error("Error fetching pet details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchSeekerDetails();
  }, [id]);

  const goBack = () => {
    navigate(-1); // prev page
  };

  const navigate = useNavigate();

  return (
    <body>
      <Header />

      <div className={styles.main}>
        <div className={styles.title}>Seeker Profile</div>

        <div className={styles["pfp-container"]}>
          {/* <img
            src={selectedImage || pfp}
            alt="pfp pic"
            className={styles.pfp}
          /> */}
        </div>

        <div className={styles.field}>Username</div>
        <div className={styles.content}>{seekerDetails.username}</div>

        <div className={styles.field}>Email</div>
        <div className={styles.content}>{seekerDetails.email}</div>

        <div className={styles.field}>Phone Number</div>
        <div className={styles.content}>{seekerDetails.phoneNumber}</div>

        <div className={styles.field}>Preference</div>
        <div className={styles.content}>{seekerDetails.preference}</div>

        <div className={styles.field}>Location</div>
        <div className={styles.content}>{seekerDetails.location}</div>

        <Button onClick={goBack}>Go Back</Button>
      </div>

      <Footer />
    </body>
  );
}
