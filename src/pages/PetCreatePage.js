import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../pagecss/petcreatepage.module.css";

import { useNavigate } from "react-router-dom";
import pfp from "../assets/profile.png";

export default function PetCreatePage() {
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
                placeholder="Status*"
                {...register("status")}
                required
              />
              <p>{errors.status?.message}</p>

              <input
                type="text"
                placeholder="Breed*"
                {...register("breed")}
                required
              />
              <p>{errors.breed?.message}</p>

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
