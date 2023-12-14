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

export default function UpdateShelterPage() {
  const schema = yup.object().shape({
    photo: yup.mixed().required("Please enter a profile picture"),
    username: yup.string().required("Please enter a name"),
    email: yup.string().email().required("Email is required"),
    phoneNumber: yup.number().typeError("Please enter your phone number"),
    location: yup.string().required("Please enter location"),
    missionStatement: yup.string().required("Mission Statement is required"),
  });

  const navigate = useNavigate();
  const { id } = useParams(); // id of pet in this shelter

  const [shelterDetails, setShelterDetails] = useState(null);

  useEffect(() => {
    // check if user is not logged in
    if (
      localStorage.getItem("isShelter") !== "true" &&
      localStorage.getItem("userId") === 0
    ) {
      navigate("/fallback");
    }

    const fetchShelterDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/account/shelter/${localStorage.getItem(
          "userId"
        )}/`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch pet details");
        }

        const responseData = await response.json();
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

        setShelterDetails(tempData); // Update the state with fetched details
      } catch (error) {
        console.error("Error fetching shelter details:", error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchShelterDetails();
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
    if (shelterDetails) {
      reset(shelterDetails);
    }
  }, [shelterDetails, reset]);

  const onSubmit = async (data) => {
    const {
      username,
      email,
      location,
      phoneNumber,
      missionStatement,
    } = data;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("phoneNumber", phoneNumber);
    formData.append("missionStatement", missionStatement);
    if (selectedImage) {
      formData.append(
        "photos",
        document.querySelector('input[type="file"]').files[0]
      );
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/account/shelter/${localStorage.getItem(
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
    await fetch(`http://127.0.0.1:8000/api/account/shelter/${localStorage.getItem(
      "userId"
    )}/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    navigate("/login");
  };

  return (
    <>
      <Header />

      <div className={styles.main}>
        <Card className={styles["background-box"]}>
          <p className={styles["signup-text"]}>
            {shelterDetails ? shelterDetails.username : ""} Update
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["pfp-container"]}>
              <img
                src={
                  selectedImage ||
                  (shelterDetails
                    ? shelterDetails.photo
                      ? BASE_URL + shelterDetails.photo["image"]
                      : pfp
                    : pfp)
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

              <p className={styles["box_header"]}>Mission Statement: </p>
              <textarea
                placeholder="Mission Statement*"
                {...register("missionStatement")}
                required
              />
              <p>{errors.missionStatement?.message}</p>
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
