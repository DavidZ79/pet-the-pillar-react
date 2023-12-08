import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../pagecss/petdetailpage.module.css";

import { useNavigate } from "react-router-dom";
import pfp from "../assets/farloom.png";

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
                placeholder="Farloom"
                {...register("name")}
                disabled
              />

              <input
                type="text"
                placeholder="Adopted"
                {...register("status")}
                disabled
              />

              <input
                type="text"
                placeholder="Doge"
                {...register("breed")}
                disabled
              />

              <input
                type="text"
                placeholder="not 15"
                {...register("age")}
                disabled
              />

              <input
                type="text"
                placeholder="Male"
                {...register("gender")}
                disabled
              />

              <input
                type="text"
                placeholder="Small"
                {...register("size")}
                disabled
              />

              <input
                type="text"
                placeholder="White"
                {...register("color")}
                disabled
              />

              <input
                type="text"
                placeholder="469"
                {...register("fee")}
                disabled
              />
            </div>

            <div className={styles["mission-box"]}>
              <textarea
                placeholder="balalalalalala list of descriptions"
                {...register("description")}
                disabled
              />

              <textarea
                placeholder="not vaxxed"
                {...register("medicalHistory")}
                disabled
              />

              <textarea
                placeholder="balalalalalalala list of special needs"
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
