import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../pagecss/petcreatepage.module.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pfp from "../assets/profile.png";
var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

export default function PetCreatePage() {
  const schema = yup.object().shape({
    // profilePic: yup.mixed().required("Please enter a profile picture"),
    name: yup.string().required("Please enter a name"),
    description: yup.string().required("Please enter description"),
    medicalHistory: yup.string().required("Please enter medical history"),
    specialNeeds: yup.string().required("Please enter special needs"),
    behavior: yup.string().required("Please enter behavior"),
    location: yup.string().required("Please enter location"),
    species: yup.string().required("Please enter species"),
    age: yup.number().required("Please enter an age"),
    gender: yup
      .string()
      .matches(/^[MF]$/, "Gender must be M or F")
      .required("Please enter a gender"),
    breed: yup.string().required("Please enter a breed"),
    size: yup
      .string()
      .matches(/^[01234]$/, "0 for smallest, 4 for largest")
      .required("Please enter a size"),
    color: yup.string().required("Please enter a color"),
    fee: yup.number().required("Please enter a fee"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  useEffect(() => {
    // check if the user is a seeker
    if (localStorage.getItem("isShelter") !== "true") {
      navigate("/fallback");
    }
  }, []);

  const onSubmit = async (data) => {
    const {
      name,
      breed,
      age,
      gender,
      size,
      color,
      fee,
      description,
      medicalHistory,
      specialNeeds,
      behavior,
      species,
      location,
    } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("breed", breed);
    formData.append("age", parseInt(age));
    formData.append("gender", gender);
    formData.append("size", parseInt(size));
    formData.append("color", color);
    formData.append("fee", parseInt(fee));
    formData.append("description", description);
    formData.append("medicalHistory", medicalHistory);
    formData.append("specialNeeds", specialNeeds);
    formData.append("behavior", behavior);
    formData.append("species", species);
    formData.append("location", location);
    if (selectedImage) {
      formData.append(
        "photos",
        document.querySelector('input[type="file"]').files[0]
      );
    }

    try {
      const response = await fetch(API_URL + "pet/", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response);
      }

      const responseData = await response.json();
      console.log(responseData);

      navigate("/pet_detail/" + responseData.id);
    } catch (error) {
      console.error("second demon:", error.message);
      console.log(formData.name);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setSelectedImage(URL.createObjectURL(img));
    }
  };

  return (
    <>
      <Header />

      <div className={styles.main}>
        <Card className={styles["background-box"]}>
          <p className={styles["signup-text"]}>Create a new pet</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["pfp-container"]}>
              <img
                src={selectedImage || pfp}
                alt="pfp pic"
                className={styles.pfp}
              />
            </div>

            <div className={styles["login-box"]}>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                required
              />

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Name: </p>
                <input
                  type="text"
                  placeholder="Name*"
                  {...register("name")}
                  required
                />
                <p>{errors.name?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Breed: </p>
                <input
                  type="text"
                  placeholder="Breed*"
                  {...register("breed")}
                  required
                />
                <p>{errors.breed?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Species: </p>
                <input
                  type="text"
                  placeholder="Species*"
                  {...register("species")}
                  required
                />
                <p>{errors.species?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Age: </p>
                <input
                  type="text"
                  placeholder="Age*"
                  {...register("age")}
                  required
                />
                <p>{errors.age?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Gender: </p>
                <input
                  type="text"
                  placeholder="Gender*"
                  {...register("gender")}
                  required
                />
                <p>{errors.gender?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Size: </p>
                <input
                  type="text"
                  placeholder="Size*"
                  {...register("size")}
                  required
                />
                <p>{errors.size?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Color: </p>
                <input
                  type="text"
                  placeholder="Color*"
                  {...register("color")}
                  required
                />
                <p>{errors.color?.message}</p>
              </div>

              <div className={styles["wrapper"]}>
                <p className={styles["box_header"]}>Fee: </p>
                <input
                  type="text"
                  placeholder="Fee*"
                  {...register("fee")}
                  required
                />
                <p>{errors.fee?.message}</p>
              </div>
            </div>

            <div className={styles["mission-box"]}>
              <p className={styles["box_header"]}>Description: </p>
              <textarea
                placeholder="Description*"
                {...register("description")}
                required
              />
              <p>{errors.description?.message}</p>

              <p className={styles["box_header"]}>Behavior: </p>
              <textarea
                placeholder="Behavior*"
                {...register("behavior")}
                required
              />
              <p>{errors.behavior?.message}</p>

              <p className={styles["box_header"]}>Medical History: </p>
              <textarea
                placeholder="Medical history*"
                {...register("medicalHistory")}
                required
              />
              <p>{errors.medicalHistory?.message}</p>

              <p className={styles["box_header"]}>Special Needs: </p>
              <textarea
                placeholder="Special Needs*"
                {...register("specialNeeds")}
                required
              />
              <p>{errors.specialNeeds?.message}</p>

              <p className={styles["box_header"]}>Location: </p>
              <textarea
                placeholder="Location*"
                {...register("location")}
                required
              />
              <p>{errors.location?.message}</p>
            </div>

            <div className={styles["submit-container"]}>
              <input
                type="submit"
                className={styles["submit-btn"]}
                value="Create pet"
              />
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
