import { useForm } from "react-hook-form";
import { useState } from 'react';

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { Link, useNavigate } from "react-router-dom";

import styles from "../pagecss/signupseeker.module.css";

import pfp from "../assets/profile.png";
var API_URL = process.env.REACT_APP_API_URL;

function SignupSeekerPage() {

  const [signupError, setSignupError] = useState(null);

  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().matches(/^[!#$%^&*a-zA-Z0-9_+-]+(\.[!#$%^&*a-zA-Z0-9_+-]+)*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Email is invalid").required("Email is required"),
    phone: yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
    password: yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, "Password must be at least 8 characters long and contain at least one number, one uppercase, one lowercase, and one special character").required("Please enter your password"),
    profilePic: yup.mixed().notRequired(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required("Passwords don't match"),
    preference: yup.string().required("Please select your preference"),
    location: yup.string().required("Please enter your location"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { firstName, lastName, email, phone, password, location, preference } = data;
    const formData = new FormData();
    formData.append('username', `${firstName} ${lastName}`);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('phoneNumber', phone);
    formData.append('location', location);
    formData.append('preference', preference);
    if (selectedImage) {
      formData.append('picture', document.querySelector('input[type="file"]').files[0]);
    }
    try {
      const response = await fetch(API_URL + 'account/register/seeker/', {
        method: 'POST',
        headers: {
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(response.status);
      }
  
      const responseData = await response.json();
      console.log(responseData);
      
      //login stuff, sry this is incredibly unclean
      const requestData2 = {
        password,
        email,
      }
      const response2 = await fetch(API_URL + 'account/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData2),
      });
  
      if (!response2.ok) {
        throw new Error(response2.status);
      }
  
      const responseData2 = await response2.json();
      localStorage.setItem('accessToken', responseData2.access_token);
      localStorage.setItem('isShelter', false);
      localStorage.setItem('userId', responseData.id);
      navigate('/');
      setSignupError(null);
    } catch (error) {
      console.error('second demon:', error.message);
      setSignupError('Invalid email or username. Please try again.');
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
    <body>
      <Header />

      <div className={styles.main}>
        <Card className={styles["background-box"]}>
          <p className={styles["signup-text"]}>Sign Up</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["pfp-container"]}>
            <img src={selectedImage || pfp} alt="pfp pic" className={styles.pfp} />
            </div>

            <div className={styles["login-box"]}>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={handleImageChange}/>

              <input
                type="text"
                placeholder="First Name*"
                {...register("firstName")}
                required
              />
              <p>{errors.firstName?.message}</p>

              <input
                type="text"
                placeholder="Last Name*"
                {...register("lastName")}
                required
              />
              <p>{errors.lastName?.message}</p>

              <input
                type="text"
                placeholder="Email*"
                {...register("email")}
                required
              />
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

              <input
                type="text"
                placeholder="Preference*"
                {...register("preference")}
                required
              />
              <p>{errors.preference?.message}</p>

              <input
                type="text"
                placeholder="Location*"
                {...register("location")}
                required
              />
              <p>{errors.location?.message}</p>
            </div>

            {signupError && (
                <div className={styles['signup-error']}>
                  {signupError}
                </div>
              )}

            <div className={styles["submit-container"]}>
              <input
                type="submit"
                className={styles["submit-btn"]}
                value="Sign up"
              />
            </div>

            <div className={styles["top-margin"]}>
              <div className={styles["info-container"]}>
                <p>Already have an account?</p>
                <Link to="/login" className={styles["left-margin"]}>
                  Login
                </Link>
              </div>

              <div className={styles["info-container"]}>
                <p>* Required</p>
              </div>
            </div>
          </form>
        </Card>
      </div>

      <Footer />
    </body>
  );
}

export default SignupSeekerPage;
