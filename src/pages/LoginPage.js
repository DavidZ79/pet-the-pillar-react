import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Link } from "react-router-dom";
import styles from "../pagecss/loginpage.module.css";

export default function LoginPage() {
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

  const onSubmit = (data) => {
    console.log(data);
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
