import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../pagecss/petdetailpage.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import pfp from "../assets/farloom.png";

var URL = process.env.REACT_APP_API_URL;

export default function PetDetailPage() {
  const schema = yup.object().shape({
    // profilePic: yup.mixed().required("Please enter a profile picture"),
    name: yup.string().required("Please enter a name"),
    status: yup.string().required("Please enter a status"),
    description: yup.string().required("Please enter description"),
    medicalHistory: yup.string().required("Please enter medical history"),
    specialNeeds: yup.string().required("Please enter special needs"),
    age: yup.number().required("Please enter am age"),
    gender: yup.string().required("Please enter a gender"),
    breed: yup.string().required("Please enter a breed"),
    size: yup.number().required("Please enter a size"),
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
    register,
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
                disabled
              />

              <input
                type="text"
                value={petDetails ? petDetails.status : ""}
                {...register("status")}
                disabled
              />

              <input
                type="text"
                value={petDetails ? petDetails.breed : ""}
                {...register("breed")}
                disabled
              />

              <input
                type="text"
                value={petDetails ? petDetails.age : ""}
                {...register("age")}
                disabled
              />

              <input
                type="text"
                value={petDetails ? petDetails.gender : ""}
                {...register("gender")}
                disabled
              />

              <input
                type="text"
                value={petDetails ? petDetails.size : ""}
                {...register("size")}
                disabled
              />

              <input
                type="text"
                value={petDetails ? petDetails.color : ""}
                {...register("color")}
                disabled
              />

              <input
                type="text"
                value={petDetails ? petDetails.fee : ""}
                {...register("fee")}
                disabled
              />
            </div>

            <div className={styles["mission-box"]}>
              <textarea
                value={petDetails ? petDetails.description : ""}
                {...register("description")}
                disabled
              />

              <textarea
                value={petDetails ? petDetails.medicalHistory : ""}
                {...register("medicalHistory")}
                disabled
              />

              <textarea
                value={petDetails ? petDetails.specialNeeds : ""}
                {...register("specialNeeds")}
                disabled
              />
            </div>
          </form>
        </Card>
      </div>

      <Footer />
    </>
  );
}
