import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";

import styles from "../pagecss/updateshelterpage.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";


import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import pfp from "../assets/profile.png";

var API_URL = process.env.REACT_APP_API_URL;

export default function UpdateShelterPage() {
  const schema = yup.object().shape({
    shelterName: yup.string().required("Shelter name is required"),
    location: yup.string().required("location is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.number().typeError("Please enter your phone number"),
    // age: yup.number().positive().integer().min(18).required(),
    password: yup.string().required("Please enter your password"),
    profilePic: yup.mixed().notRequired(),
    missionStatement: yup.string().required("Mission Statement is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required("Passwords don't match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // check if user is not logged in
    if (
      (localStorage.getItem("isShelter") === "false") &
      (localStorage.getItem("userId") == 0)
    ) {
      navigate("/fallback");
    }

    const fetchPetDetails = async () => {
      try {
        const response = await fetch(
          `${API_URL}account/${localStorage.getItem("userId")}/`,
          {
            method: "GET",
            headers: {},
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch account details");
        }

        const responseData = await response.json();
        // console.log(responseData)
        const tempData = {
          id: responseData.id,
          username: responseData.username,
          email: responseData.email,
          phoneNumber: responseData.phoneNumber,
          location: responseData.location,
          missionStatement: responseData.missionStatement,
          totalRating: 0,
          numberOfRatings: 0,
        };
        setUserDetails(tempData); // Update the state with fetched details
      } catch (error) {
        console.error("Error fetching pet details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchPetDetails();
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
    navigate("/shelter_management");
    console.log(data);
  };

  return (
    <body>
      <Header />

      <div className={styles.main}>
        <Card className={styles["background-box"]}>
          <h1 className={styles["signup-text"]}>Shelter Account Update</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["pfp-container"]}>
              <img src={pfp} alt="pfp pic" className={styles.pfp} />
            </div>

            <div className={styles.pfpsection}>
              <h6>Profile Picture:</h6>
              <input type="file" accept=".jpg,.jpeg,.png" />
            </div>

            <div className={styles["login-box"]}>
              <input
                type="text"
                placeholder="New Shelter name"
                {...register("shelterName")}
              />
              <input
                type="text"
                placeholder="New Location"
                {...register("location")}
              />
            </div>

            <div className={styles["login-box"]}>
              <input
                type="text"
                placeholder="New Email"
                {...register("email")}
              />
              <input
                type="number"
                placeholder="New Phone Number"
                {...register("phone")}
              />
            </div>

            <div className={styles["login-box"]}>
              <input
                type="password"
                placeholder="New Password"
                {...register("password")}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                {...register("confirmPassword")}
              />
            </div>

            <div className={styles["mission-box"]}>
              <textarea
                placeholder="New Mission Statement"
                {...register("missionStatement")}
              />
            </div>

            <div className={styles["submit-container"]}>
              <Link to="/shelter_management">
                <input
                  type="submit"
                  className={styles["submit-btn"]}
                  value="Update"
                />
              </Link>
            </div>
          </form>
        </Card>
      </div>

      <Footer />
    </body>
  );
}
