import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";

import styles from "../pagecss/updateseekerpage.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import pfp from "../assets/profile.png";

export default function UpdateSeekerPage() {
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

  const navigate = useNavigate()
  const onSubmit = (data) => {
   navigate("/pet_application");
    console.log(data);
  };

  return (
    <body>
      <Header />

         <div className={styles.main}>
            <Card className={styles['background-box']}>
               <p className={styles['signup-text']}>Seeker Account Update</p>

               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles['pfp-container']}>
                     <img src={pfp} alt="pfp pic" className={styles.pfp}/>
                  </div>

                  <div className={styles.pfpsection}>
                     <h6>Profile Picture:</h6>
                     <input type='file' accept=".jpg,.jpeg,.png"/>
                  </div>

                  <div className={styles['login-box']}> 
                     <input type="text" placeholder="First Name*" {...register("firstName")}/>
                     <input type="text" placeholder="Last Name*" {...register("lastName")} />
                  </div>

                  <div className={styles['login-box']}> 
                     <input type="text" placeholder="Email*" {...register("email")} />
                     <input
                        type="number"
                        placeholder="Phone Number*"
                        {...register("phone")}
                     />
                  </div>

                  <div className={styles['login-box']}> 
                     <input
                        type="password"
                        placeholder="Password*"
                        {...register("password")}
                     />
                     <input
                        type="password"
                        placeholder="Confirm Password*"
                        {...register("confirmPassword")}
                     />
                  </div>

                  <div className={styles['login-box']}> 
                     <input
                        type="text"
                        placeholder="Location*"
                        {...register("location")}
                     />
                     <input
                        type="text"
                        placeholder="Preference*"
                        {...register("preference")}
                     />
                  </div>

                  <div className={styles['submit-container']}>
                        <input type="submit" className={styles['submit-btn']} value="Update"/>
                  </div>
               </form>
            </Card>
         </div>

      <Footer />
    </body>
  );
}
