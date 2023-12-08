import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { Link, useNavigate } from "react-router-dom";

import styles from "../pagecss/signupshelter.module.css";

import pfp from "../assets/profile.png";

export default function SignupShelterPage() {
  const schema = yup.object().shape({
    shelterName: yup.string().required("Shelter name is required"),
    location: yup.string().required("location is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.number().typeError("Please enter your phone number"),
    // age: yup.number().positive().integer().min(18).required(),
    password: yup.string().required("Please enter your password"),
    profilePic: yup.mixed().notRequired(),
    missionStatement: yup.string().required("Mission Statement is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required("Passwords don't match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()
  const onSubmit = (data) => {
    navigate('/shelter_dashboard')
    console.log({data})
    //form logic here
  };

  return (
    <body>
      <Header/>
        <div className={styles.main}>
          <Card className={styles['background-box']}>
            <p className={styles['signup-text']}>Sign Up</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles['pfp-container']}>
                <img src={pfp} alt="pfp pic" className={styles.pfp}/>
              </div>

              <div className={styles['login-box']}>
                <input type='file' accept=".jpg,.jpeg,.png"/>

                <input type="text" placeholder="Shelter name*" {...register("shelterName")} required/>
                <p>{errors.shelterName?.message}</p>

                <input type="text" placeholder="Location*" {...register("location")} required/>
                <p>{errors.location?.message}</p>

                <input type="text" placeholder="Email*" {...register("email")} required/>
                <p>{errors.email?.message}</p>

                <input
                  type="number"
                  placeholder="Phone Number*"
                  {...register("phone")}
                  required
                />
                <p>{errors.phone?.message}</p>

                <input
                  type="password"
                  placeholder="Password*"
                  {...register("password")}
                  required
                />
                <p>{errors.password?.message}</p>
                <input
                  type="password"
                  placeholder="Confirm Password*"
                  {...register("confirmPassword")}
                  required
                />
                <p>{errors.confirmPassword?.message}</p>

              </div>

              <div className={styles['mission-box']}>
                <textarea placeholder="Mission Statement*" {...register("missionStatement")} required/>
                <p>{errors.missionStatement?.message}</p>
              </div>

              <div className={styles['submit-container']}>
                  <input type="submit" className={styles['submit-btn']} value="Sign up"/>
              </div>

              <div className={styles['top-margin']}>
                <div className={styles['info-container']}>
                  <p>Already have an account?</p>
                  <Link to='/login' className={styles['left-margin']}>Login</Link>
                </div>

                <div className={styles['info-container']}>
                  <p>* Required</p>
                </div>
              </div>

            </form>
          </Card>
        </div>
      <Footer/>
    </body>
  );
}
