import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "bulma/css/bulma.min.css";
import styles from "../pagecss/seeker.module.css";
import pfp from "../assets/profile.png";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";

var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

export default function SeekerPage() {
  const onSubmit = (data) => {
    console.log("submitted");
    navigate("/pet_detail");
    console.log({ data });
    //form logic here
  };
  const schema = yup.object().shape({
    username: yup.string().required("username is required"),
    email: yup.string().matches(/^[!#$%^&*a-zA-Z0-9_+-]+(\.[!#$%^&*a-zA-Z0-9_+-]+)*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Email is invalid").required("Email is required"),
    phone: yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
    password: yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, "Password must be at least 8 characters long and contain at least one number, one uppercase, one lowercase, and one special character").required("Please enter your password"),
    picture: yup.mixed().notRequired(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required("Passwords don't match"),
    preference: yup.string().required("Please select your preference"),
    location: yup.string().required("Please enter your location"),
  });

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
        // check if user is not logged in
        if (
          localStorage.getItem("isShelter") === "true" ||
          localStorage.getItem("userId") == 0 || localStorage.getItem("userId") == null
        ) {
          navigate("/fallback");
        } else {
          console.log("user is logged in");
          console.log(localStorage.getItem("userId") == null);
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
          picture: responseData.picture,
        };

        setSeekerDetails(tempData); // Update the state with fetched details
      } catch (error) {
        console.error("Error fetching pet details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchSeekerDetails();
  }, [id]);

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className={styles.main}>
        <Card className={styles["background-box"]}>
          <p className={styles["signup-text"]}>{seekerDetails ? seekerDetails.username : ""} Details</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["pfp-container"]}>
              <img src={seekerDetails ? seekerDetails.picture ? seekerDetails.picture : pfp : pfp} alt="pfp pic" className={styles.pfp} />              
            </div>
            

            <div className={styles["login-box"]}>
              {/* <input type="file" accept=".jpg,.jpeg,.png" required/> */}

              <div className={styles["wrapper"]}>
              <p>Username: </p>
              <input
                type="text"
                value={seekerDetails ? seekerDetails.username : ""}
                {...register("username")}
                disabled
              />
              </div>
              
              <div className={styles["wrapper"]}>
              <p>Email: </p>
              <input
                type="text"
                value={seekerDetails ? seekerDetails.email : ""}
                {...register("email")}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>
              <p>Phone Number: </p>
              <input
                type="text"
                value={seekerDetails ? seekerDetails.phoneNumber : ""}
                {...register("phoneNumber")}
                disabled
              />
              </div>

              <div className={`${styles.wrapper}`}>
              <p>Location: </p>
              <input
                type="text"
                value={seekerDetails ? seekerDetails.location : ""}
                {...register("location")}
                disabled
              />
              </div>

              <div className={`${styles.wrapper} ${styles['margin-bottom']}`}>
              <p>Preference: </p>
              <input
                type="text"
                value={seekerDetails ? seekerDetails.preference : ""}
                {...register("preference")}
                disabled
              />
              </div>

            </div>
          </form>
        </Card>
      </div>

      <Footer />
    </>
  );
}
