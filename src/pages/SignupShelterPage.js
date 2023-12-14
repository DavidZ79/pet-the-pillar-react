import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { Link, useNavigate } from "react-router-dom";

import styles from "../pagecss/signupshelter.module.css";

import pfp from "../assets/profile.png";
var API_URL = process.env.REACT_APP_API_URL;

export default function SignupShelterPage() {

  const [signupError, setSignupError] = useState(null);

  const schema = yup.object().shape({
    shelterName: yup.string().required("Shelter name is required"),
    location: yup.string().required("location is required"),
    email: yup.string().matches(/^[!#$%^&*a-zA-Z0-9_+-]+(\.[!#$%^&*a-zA-Z0-9_+-]+)*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Email is invalid").required("Email is required"),
    phone: yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
    password: yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, "Password must be at least 8 characters long and contain at least one number, one uppercase, one lowercase, and one special character").required("Please enter your password"),
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

  useEffect(() => {
    // check if user is already logged in
    if (localStorage.getItem("isShelter") === "true" || !(localStorage.getItem("userId") == 0)) {
      navigate("/fallback");
    }
  }, []);

  const onSubmit = async (data) => {
    const { shelterName, email, phone, password, location, missionStatement} = data;
    const formData = new FormData();
    formData.append('username', shelterName);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('phoneNumber', phone);
    formData.append('location', location);
    formData.append('missionStatement', missionStatement);
    if (selectedImage) {
      formData.append('picture', document.querySelector('input[type="file"]').files[0]);
    }
    try {
      const response = await fetch(API_URL + 'account/register/shelter/', {
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
      localStorage.setItem('isShelter', true);
      localStorage.setItem('userId', responseData.id);

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
      if (responseData2.isShelter) {
        navigate('/shelter_dashboard');
      }
      else {
        navigate('/');
      }
      console.log(responseData2);
      setSignupError(null);

      localStorage.setItem('accessToken', responseData2.access_token);


      navigate("/shelter_dashboard"); 
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
    <>
      <Header/>
        <div className={styles.main}>
          <Card className={styles['background-box']}>
            <p className={styles['signup-text']}>Sign Up</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles['pfp-container']}>
              <img src={selectedImage || pfp} alt="pfp pic" className={styles.pfp} />
              </div>

              <div className={styles['login-box']}>
              <input type="file" accept=".jpg,.jpeg,.png" onChange={handleImageChange}/>

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

              {signupError && (
                <div className={styles['signup-error']}>
                  {signupError}
                </div>
              )}

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
    </>
  );
}
