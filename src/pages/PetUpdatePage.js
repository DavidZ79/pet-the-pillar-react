import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../pagecss/petupdatepage.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import pfp from "../assets/farloom.png";
var URL = process.env.REACT_APP_API_URL;

export default function PetUpdatePage() {
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
    gender: yup.string().matches(/^[MF]$/, "Gender must be M or F").required("Please enter a gender"),
    breed: yup.string().required("Please enter a breed"),
    size: yup.string().matches(/^[01234]$/, "0 for smallest, 4 for largest").required("Please enter a size"),
    color: yup.string().required("Please enter a color"),
    fee: yup.number().required("Please enter a fee"),
  });

  const { id } = useParams();

  const [petDetails, setPetDetails] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`${URL}pet/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
  
        const responseData = await response.json();
        // console.log(responseData)
        const tempData = {
          "id": responseData.id,
          "photos": [],
          "name": responseData.name,
          "status": responseData.status,
          "description": responseData.description,
          "behavior": responseData.behavior,
          "medicalHistory": responseData.medicalHistory,
          "specialNeeds": responseData.specialNeeds,
          "age": responseData.age,
          "breed": responseData.breed,
          "gender": responseData.gender,
          "size": responseData.size,
          "species": responseData.species,
          "color": responseData.color,
          "timestamp": responseData.timestamp,
          "location": responseData.location,
          "fee": responseData.fee,
          "shelter": responseData.shelter
        }
        setPetDetails(tempData); // Update the state with fetched details
      } catch (error) {
        console.error('Error fetching pet details:', error);
        // Handle error, e.g., redirect to an error page
      }
    };
  
    fetchPetDetails();
  }, [id]);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("submitted");
    navigate("/pet_detail");
    console.log({ data });
    //form logic here
  };

  const { register } = useForm();
  const [specialNeeds, setSpecialNeeds] = useState("");

  useEffect(() => {
    if (petDetails) {
      setSpecialNeeds(petDetails.specialNeeds);
    }
  }, [petDetails]);

  const handleSpecialNeedsChange = (event) => {
    setSpecialNeeds(event.target.value);
  };


  return (
    <>
      <Header />

      <div className={styles.main}>
        <Card className={styles["background-box"]}>
          <p className={styles["signup-text"]}>{petDetails ? petDetails.name : ""} Details</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["pfp-container"]}>
              <img src={pfp} alt="pfp pic" className={styles.pfp} />
            </div>

            <div className={styles["login-box"]}>
              {/* <input type="file" accept=".jpg,.jpeg,.png" required/> */}

              <input
                type="text"
                value={petDetails ? petDetails.name : ""}
                {...register("name")}
              />

              <input
                type="text"
                value={petDetails ? petDetails.status : ""}
                {...register("status")}
              />

              <input
                type="text"
                value={petDetails ? petDetails.breed : ""}
                {...register("breed")}
              />

              <input
                type="text"
                value={petDetails ? petDetails.age : ""}
                {...register("age")}
              />

              <input
                type="text"
                value={petDetails ? petDetails.gender : ""}
                {...register("gender")}
              />

              <input
                type="text"
                value={petDetails ? petDetails.size : ""}
                {...register("size")}
              />

              <input
                type="text"
                value={petDetails ? petDetails.color : ""}
                {...register("color")}
              />

              <input
                type="text"
                value={petDetails ? petDetails.fee : ""}
                {...register("fee")}
              />
            </div>

            <div className={styles["mission-box"]}>
              <textarea
                value={petDetails ? petDetails.description : ""}
                {...register("description")}
              />

              <textarea
                value={petDetails ? petDetails.behavior : ""}
                {...register("behavior")}
              />

              <textarea
                value={petDetails ? petDetails.medicalHistory : ""}
                {...register("medicalHistory")}
              />

              <textarea
                value={specialNeeds}
                onChange={handleSpecialNeedsChange}
                {...register("specialNeeds")}
                required
              />

              <textarea
                value={petDetails ? petDetails.location : ""}
                onChange={handleSpecialNeedsChange}
                {...register("location")}
                required
              />
            </div>
          </form>
        </Card>
      </div>

      <Footer />
    </>
  );
}
