import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import styles from "../pagecss/loginpage.module.css";
var URL = process.env.REACT_APP_API_URL;

export default function LoginPage() {
  const [loginError, setLoginError] = useState(null);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Please enter your password"),
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
    const { email, password} = data;
    const requestData = {
      password,
      email,
    };
    console.log(requestData);
    try {
      const response = await fetch(URL + 'account/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error(response.status);
      }
  
      const responseData = await response.json();
      localStorage.setItem('accessToken', responseData.access_token);
      localStorage.setItem('userId', responseData.user_id);
      localStorage.setItem('isShelter', responseData.is_shelter);
      if (localStorage.getItem('isShelter')) {
        navigate('/shelter_dashboard');
      }
      else {
        navigate('/search');
      }
      setLoginError(null);

    } catch (error) {
      console.error('second demon:', error.message);
      setLoginError('Invalid credentials. Please try again.');
    }
  };


  return (
    <>

      <Header/>

        <div className={styles.main}>
          <Card className={styles['background-box']}>
            <p className={styles['login-text']}>Log In</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles['login-box']}>
                <input type="text" placeholder="Email*" {...register("email")} />
                <p>{errors.email?.message}</p>
              </div>

              <div className={styles['login-box']}>
                <input type="password" placeholder="Password*" {...register("password")}/>
                <p>{errors.password?.message}</p>
              </div>

              {loginError && (
                <div className={styles['login-error']}>
                  {loginError}
                </div>
              )}

              <div className={styles['submit-container']}>
                <input type="submit" className={styles['submit-btn']} value="login"/>
              </div>

              <div className={styles['top-margin']}>
                <div className={styles['info-container']}>
                  <p>Need an account?</p>
                  <Link className={styles['left-margin']} to="/signup_before">Sign up</Link>
                </div>
              </div>
            </form>
          </Card>
        </div>

      <Footer/>
      
    </>
  );
}
