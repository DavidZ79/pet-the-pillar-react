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

const hardcodedPetData = {
  "id": 1,
  "photos": [],
  "name": "farloom",
  "status": "Pending",
  "description": "greatest pet ever, need to give away cuz travelling",
  "behavior": "energetic, friendly",
  "medicalHistory": "ate chocolate",
  "specialNeeds": "no special needs",
  "age": 3,
  "breed": "golden retriever",
  "gender": "M",
  "size": 2,
  "species": "dog",
  "color": "brown",
  "timestamp": "2023-12-08T05:30:34.727976Z",
  "location": "toronto",
  "fee": 1,
  "shelter": 1
};

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
    // In a real app, you would fetch the pet details using the pet_id from an API
    // For now, let's use the hardcoded data
    setPetDetails(hardcodedPetData);
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
          <p className={styles["signup-text"]}>[pet name] Details</p>

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

            {/* <div className={styles["submit-container"]}>
              <input
                type="submit"
                className={styles["submit-btn"]}
                value="Update pet"
              />
            </div>

            <div className={styles["top-margin"]}>
              <div className={styles["info-container"]}>
                <p>* Required</p>
              </div>
            </div> */}
          </form>
        </Card>
      </div>

      <Footer />
    </>
  );
}
