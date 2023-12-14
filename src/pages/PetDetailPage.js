import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../pagecss/petdetailpage.module.css";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

export default function PetDetailPage() {
  const schema = yup.object().shape({
    // profilePic: yup.mixed().required("Please enter a profile picture"),
    name: yup.string().required("Please enter a name"),
    status: yup.string().required("Please enter a status"),
    description: yup.string().required("Please enter description"),
    medicalHistory: yup.string().required("Please enter medical history"),
    specialNeeds: yup.string().required("Please enter special needs"),
    location: yup.string().required("Please enter location"),
    behavior: yup.string().required("Please enter behavior"),
    age: yup.number().required("Please enter am age"),
    gender: yup.string().required("Please enter a gender"),
    breed: yup.string().required("Please enter a breed"),
    size: yup.number().required("Please enter a size"),
    color: yup.string().required("Please enter a color"),
    fee: yup.number().required("Please enter a fee"),
    // photos: yup.mixed().required("Please enter a photo"),
  });
  
  const { id } = useParams();

  const [petDetails, setPetDetails] = useState(null);
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`${API_URL}pet/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
  
        const responseData = await response.json();
        const tempData = {
          "id": responseData.id,
          "photo": responseData.photos[0]['image'],
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

  const handleAdopt = async () => {
    navigate(`/pet_adoption/${id}`);    
  }

  return (
    <>
      <Header />

      <div className={styles.main}>
        <Card className={styles["background-box"]}>
        <div className={`${styles["submit-container"]} ${localStorage.getItem("isShelter") === "true" ? "hide" : ''}`}>
              <input
                className={styles["submit-btn"]}
                value="Adopt"
                onClick={handleAdopt}
              />
            </div>
          <p className={styles["signup-text"]}>{petDetails ? petDetails.name : ""} Details</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["pfp-container"]}>
              <img src={petDetails ? BASE_URL + petDetails.photo : ''} alt="pfp pic" className={styles.pfp} />              
            </div>

            <div className={styles["login-box"]}>
              {/* <input type="file" accept=".jpg,.jpeg,.png" required/> */}

              <div className={styles["wrapper"]}>
              <p>Name: </p>
              <input
                type="text"
                value={petDetails ? petDetails.name : ""}
                {...register("name")}
                disabled
              />
              </div>
              
              <div className={styles["wrapper"]}>
              <p>Status: </p>
              <input
                type="text"
                value={petDetails ? petDetails.status : ""}
                {...register("status")}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>
              <p>Breed: </p>
              <input
                type="text"
                value={petDetails ? petDetails.breed : ""}
                {...register("breed")}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>
              <p>Age: </p>
              <input
                type="text"
                value={petDetails ? petDetails.age : ""}
                {...register("age")}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>
              <p>Age:</p>
              <input
                type="text"
                value={petDetails ? petDetails.gender : ""}
                {...register("gender")}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>
              <p>Size: </p>
              <input
                type="text"
                value={petDetails ? petDetails.size : ""}
                {...register("size")}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>
              <p>Color: </p>
              <input
                type="text"
                value={petDetails ? petDetails.color : ""}
                {...register("color")}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>        
              <p>Fee: </p>
              <input
                type="text"
                value={petDetails ? petDetails.fee : ""}
                {...register("fee")}
                disabled
              />
              </div>

            
              <div className={styles["mission-box"]}>
              
              <div className={styles["wrapper"]}>
              <p className={styles["box_header"]}>Description: </p>
              <textarea
                value={petDetails ? petDetails.description : ""}
                {...register("description")}
                disabled
              />
              </div>
            

              <div className={styles["wrapper"]}>
              <p className={styles["box_header"]}>Behavior: </p>
              <textarea
                value={petDetails ? petDetails.behavior : ""}
                {...register("behavior")}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>
              <p className={styles["box_header"]}>Medical History: </p>
              <textarea
                value={petDetails ? petDetails.medicalHistory : ""}
                {...register("medicalHistory")}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>
              <p className={styles["box_header"]}>Special Needs: </p>
              <textarea
                value={petDetails ? petDetails.specialNeeds : ""}
                {...register("specialNeeds")}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>
              <p className={styles["box_header"]}>Location: </p>
              <textarea
                value={petDetails ? petDetails.location : ""}
                {...register("location")}
                disabled
              />
              </div>
            </div>
            </div>
          </form>
        </Card>
      </div>

      <Footer />
    </>
  );
}
