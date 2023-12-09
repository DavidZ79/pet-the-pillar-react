import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

import { Link, useNavigate } from "react-router-dom";

import styles from "../pagecss/signupseeker.module.css";

import pfp from "../assets/profile.png";
var URL = process.env.REACT_APP_API_URL;

function SignupSeekerPage() {
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.number().typeError("Please enter your phone number"),
    password: yup.string().required("Please enter your password"),
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
    const requestData = {
      username: `${firstName} ${lastName}`,
      password,
      email,
      phoneNumber: phone,
      location, 
      preference,
    };
    try {
      const response = await fetch(URL + 'account/register/seeker/', {
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
      console.log(responseData);
      navigate("/shelter_dashboard"); 
    } catch (error) {
      console.error('second demon:', error.message);
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
              <img src={pfp} alt="pfp pic" className={styles.pfp} />
            </div>

            <div className={styles["login-box"]}>
              <input type="file" accept=".jpg,.jpeg,.png" />

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
