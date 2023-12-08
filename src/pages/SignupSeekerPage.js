import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

import { Link } from "react-router-dom";

import styles from "../pagecss/signupseeker.module.css";

import pfp from "../assets/profile.png";

function SignupSeekerPage() {
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.number().typeError("Please enter your phone number"),
    // age: yup.number().positive().integer().min(18).required(),
    password: yup.string().required("Please enter your password"),
    profilePic: yup.mixed().notRequired(),
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

  const onSubmit = (data) => {
    console.log(data);
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
              
              <input type="text" placeholder="First Name*" {...register("firstName")} required/>
              <p>{errors.firstName?.message}</p>

              <input type="text" placeholder="Last Name*" {...register("lastName")} required/>
              <p>{errors.lastName?.message}</p>

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

            <div className={styles['submit-container']}>
              <Link to="/pet_application">
                <input type="submit" className={styles['submit-btn']} value="Sign up"/>
              </Link>
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

export default SignupSeekerPage;
