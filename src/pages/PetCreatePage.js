import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../pagecss/petcreatepage.module.css";

import { useNavigate } from "react-router-dom";
import pfp from "../assets/profile.png";
var URL = process.env.REACT_APP_API_URL;

export default function PetCreatePage() {
  const schema = yup.object().shape({
    // profilePic: yup.mixed().required("Please enter a profile picture"),
    name: yup.string().required("Please enter a name"),
    description: yup.string().required("Please enter description"),
    medicalHistory: yup.string().required("Please enter medical history"),
    specialNeeds: yup.string().required("Please enter special needs"),
    behavior: yup.string().required("Please enter special needs"),
    location: yup.string().required("Please enter special needs"),
    species: yup.string().required("Please enter special needs"),
    age: yup.number().required("Please enter an age"),
    gender: yup.string().matches(/^[MF]$/, "Gender must be M or F").required("Please enter a gender"),
    breed: yup.string().required("Please enter a breed"),
    size: yup.string().matches(/^[01234]$/, "0 for smallest, 4 for largest").required("Please enter a size"),
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

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const { name, breed, age, gender, size, color, fee, description, medicalHistory, specialNeeds, behavior, species, location } = data;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('breed', breed);
    formData.append('age', parseInt(age));
    formData.append('gender', gender);
    formData.append('size', parseInt(size));
    formData.append('color', color);
    formData.append('fee', parseInt(fee));
    formData.append('description', description);
    formData.append('medicalHistory', medicalHistory);
    formData.append('specialNeeds', specialNeeds);
    formData.append('behavior', behavior);
    formData.append('species', species);
    formData.append('location', location);

    try {
      const response = await fetch(URL + 'pet/', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: formData,
      });
  
      if (!response.ok) {
        console.log(formData);
        throw new Error(response);
      }
  
      const responseData = await response.json();
      console.log(responseData);
      navigate("/pet_detail "); 
    } catch (error) {
      console.error('second demon:', error.message);
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
              <img src={pfp} alt="pfp pic" className={styles.pfp} />
            </div>

            <div className={styles["login-box"]}>
              <input type="file" accept=".jpg,.jpeg,.png" required/>

              <input
                type="text"
                placeholder="Name*"
                {...register("name")}
                required
              />
              <p>{errors.name?.message}</p>

              <input
                type="text"
                placeholder="Breed*"
                {...register("breed")}
                required
              />
              <p>{errors.breed?.message}</p>

              <input
                type="text"
                placeholder="Species*"
                {...register("species")}
                required
              />
              <p>{errors.species?.message}</p>

              <input
                type="text"
                placeholder="Age*"
                {...register("age")}
                required
              />
              <p>{errors.age?.message}</p>

              <input
                type="text"
                placeholder="Gender*"
                {...register("gender")}
                required
              />
              <p>{errors.gender?.message}</p>

              <input
                type="text"
                placeholder="Size*"
                {...register("size")}
                required
              />
              <p>{errors.size?.message}</p>

              <input
                type="text"
                placeholder="Color*"
                {...register("color")}
                required
              />
              <p>{errors.color?.message}</p>

              <input
                type="text"
                placeholder="Fee*"
                {...register("fee")}
                required
              />
              <p>{errors.fee?.message}</p>
            </div>

            <div className={styles["mission-box"]}>
              <textarea
                placeholder="Description*"
                {...register("description")}
                required
              />
              <p>{errors.description?.message}</p>

              <textarea
                placeholder="Behavior*"
                {...register("behavior")}
                required
              />
              <p>{errors.behavior?.message}</p>
              
              <textarea
                placeholder="Medical history*"
                {...register("medicalHistory")}
                required
              />
              <p>{errors.medicalHistory?.message}</p>

              <textarea
                placeholder="Special Needs*"
                {...register("specialNeeds")}
                required
              />
              <p>{errors.specialNeeds?.message}</p>

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
