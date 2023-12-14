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
var BASE_URL = API_URL.slice(0, -5);

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

  const [userDetails, setUserDetails] = useState([]);
  const { id } = useParams(); // id of pet in this shelter

  useEffect(() => {
    // check if user is not logged in
    if (
      (localStorage.getItem("isShelter") !== "true") &&
      (localStorage.getItem("userId") === 0)
    ) {
      navigate("/fallback");
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/account/shelter/${localStorage.getItem("userId")}/`,
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
          photo: responseData.picture[0] !== "h" ? responseData.picture[0] : null,
          missionStatement: responseData.missionStatement,
          totalRating: responseData.totalRating,
          numberOfRatings: responseData.numberOfRatings,
        };
        console.log(tempData)
        console.log(`http://127.0.0.1:8000/api/account/shelter/${localStorage.getItem("userId")}/`)
        setUserDetails(tempData); // Update the state with fetched details
      } catch (error) {
        console.error("Error fetching account details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchUserDetails();
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userDetails) {
      reset(userDetails);
    }
  }, [userDetails, reset]);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const {
      username,
      email,
      phoneNumber,
      location,
      missionStatement,
      totalRating,
      numberOfRatings,
      photo, 
    } = data;
    const formData = new FormData();
    formData.append("name", username);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("location", location);
    formData.append("missionStatement", missionStatement);
    formData.append("totalRating", totalRating);
    formData.append("numberOfRatings", numberOfRatings);
    formData.append("photo", photo);
    if (selectedImage) {
      formData.append(
        "photos",
        document.querySelector('input[type="file"]').files[0]
      );
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/account/shelter/${userDetails.id}/update/`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: formData,
      });

      if (!response.ok) {
        console.log(formData);
        throw new Error(response);
      }

      const responseData = await response.json();
      console.log(responseData);

      navigate("/shelter_dashboard");
    } catch (error) {
      console.error("second demon:", error.message);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setSelectedImage(URL.createObjectURL(img));
    }
  };

  const handleDelete = async () => {
    await fetch(`http://127.0.0.1:8000/api/account/shelter/${userDetails.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    navigate("/shelter_dashboard");
  };

  return (
    <body>
      <Header />

      <div className={styles.main}>
        <Card className={styles["background-box"]}>
          <h1 className={styles["signup-text"]}> {userDetails.username} Update</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["pfp-container"]}>
              <img src={
                  selectedImage ||
                  (userDetails ? (userDetails.photo ? BASE_URL + userDetails.photo["image"] : pfp) : pfp)
                } 
                alt="pfp pic" className={styles.pfp} />
            </div>

            <div className={styles.pfpsection}>
              <h6>Profile Picture:</h6>
              <input type="file" accept=".jpg,.jpeg,.png" onChange={handleImageChange}/>
            </div>

            <div className={styles["login-box"]}>
              <input
                type="text"
                placeholder="New Shelter name"
                {...register("username")}
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
                {...register("phoneNumber")}
              />
            </div>

            {/* <div className={styles["login-box"]}>
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
            </div> */}

            <div className={styles["mission-box"]}>
              <textarea
                placeholder="New Mission Statement"
                {...register("missionStatement")}
              />
            </div>

            <div className={styles["submit-container"]}>
              <Link to="/shelter_dashboard">
                <input
                  type="submit"
                  className={styles["submit-btn"]}
                  value="Update"
                />
              </Link>
            </div>

            <div className={styles["submit-container"]}>
                <input
                  className={styles["submit-btn"]}
                  value="Delete"
                  onClick={handleDelete}
                />
              </div>
          </form>
        </Card>
      </div>

      <Footer />
    </body>
  );
}
