import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import pfp from "../assets/profile.png";

import styles from "../pagecss/petupdatepage.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

export default function UpdateSeekerPage() {
  const schema = yup.object().shape({
    picture: yup.mixed().required("Please enter a profile picture"),
    username: yup.string().required("Please enter a name"),
    email: yup.string().email().required("Email is required"),
    phoneNumber: yup.number().typeError("Please enter your phone number"),
    location: yup.string().required("Please enter location"),
    preference: yup.string().required("Please enter preference"),
  });

  const navigate = useNavigate();
  const { id } = useParams(); 

  const [seekerDetails, setSeekerDetails] = useState(null);

  useEffect(() => {
    // check if user is not logged in
    if (
      localStorage.getItem("isShelter") === "true" || localStorage.getItem("userId") == 0
    ) {
      navigate("/fallback");
    } else {
      console.log("User is logged in");
    }

    const fetchSeekerDetails = async () => {
      try {
        const response = await fetch(API_URL + `account/seeker/${localStorage.getItem(
          "userId"
        )}/`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch sheter details");
        }

        const responseData = await response.json();
        const tempData = {
          id: responseData.id,
          username: responseData.username,
          email: responseData.email,
          phoneNumber: responseData.phoneNumber,
          location: responseData.location,
          picture: responseData.picture ?? null,
          preference: responseData.preference,
        };

        setSeekerDetails(tempData); // Update the state with fetched details
      } catch (error) {
        console.error("Error fetching seeker details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchSeekerDetails();
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
    if (seekerDetails) {
      reset(seekerDetails);
    }
  }, [seekerDetails, reset]);

  const onSubmit = async (data) => {
    const {
      username,
      email,
      location,
      phoneNumber,
    } = data;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("phoneNumber", phoneNumber);
    if (selectedImage) {
      formData.append(
        "picture",
        document.querySelector('input[type="file"]').files[0]
      );
    }

    try {
      const response = await fetch(API_URL + `account/seeker/${localStorage.getItem(
        "userId"
      )}/update/`, {
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

      navigate("/");
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
    await fetch(API_URL + `account/seeker/${localStorage.getItem(
      "userId"
    )}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    localStorage.setItem("accessToken", "");
    localStorage.setItem("isShelter", false);
    localStorage.setItem("userId", 0);
    navigate("/login");
  };

  return (
    <>
      <Header />

      <div className={styles.main}>
        <Card className={styles["background-box"]}>
          <p className={styles["signup-text"]}>
            {seekerDetails ? seekerDetails.username : ""} Update
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["pfp-container"]}>
              <img
                src={
                  selectedImage ||
                  (seekerDetails ? seekerDetails.picture ?? pfp : pfp)
                }
                alt="pfp pic"
                className={styles.pfp}
              />
            </div>

            <div className={styles["login-box"]}>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
              />

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Name: </p>
                <input
                  type="text"
                  placeholder="Name*"
                  {...register("username")}
                  required
                />
                <p>{errors.username?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Email: </p>
                <input
                  type="text"
                  placeholder="Email*"
                  {...register("email")}
                  required
                />
                <p>{errors.email?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Phone Number: </p>
                <input
                  type="text"
                  placeholder="Phone Number*"
                  {...register("phoneNumber")}
                  required
                />
                <p>{errors.phoneNumber?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Location: </p>
                <input
                  type="text"
                  placeholder="location*"
                  {...register("location")}
                  required
                />
                <p>{errors.location?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Preference: </p>
                <input
                  type="text"
                  placeholder="preference*"
                  {...register("preference")}
                  required
                />
              </div>

            </div>

            <div className={styles["wrapper2"]}>
              <div className={styles["submit-container"]}>
                <input
                  type="submit"
                  className={styles["submit-btn"]}
                  value="Update"
                />
              </div>

              <div className={styles["submit-container"]}>
                <input
                  className={styles["submit-btn"]}
                  value="Delete"
                  onClick={handleDelete}
                />
              </div>
            </div>

            <div className={styles["top-margin"]}>
              <div className={styles["info-container"]}>
                <p>* Required</p>
              </div>
            </div>
          </form>
        </Card>
      </div>

      <Footer />
    </>
  );
}
