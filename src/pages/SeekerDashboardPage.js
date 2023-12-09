import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Chat from "../components/Chat";

import styles from "../pagecss/seekerdashboardpage.module.css";

export default function SeekerDashboardPage() {
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.number().typeError("Please enter your phone number"),
    homeSize: yup.number().typeError("Please enter your home size"),
    numberOfChildren: yup
      .number()
      .typeError("Please enter your number of children"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const onSubmit = (data) => {
    console.log({ data });
    //form logic here
    setShowConfirmation(true); // show confirmation message when user clicks submit
  };

  return (
    <body>
      <Header />
      <div className={styles["title"]}>Dashboard</div>
      <div className={styles.main}>
        <Card className={styles["background-box"]}>
          <p className={styles["signup-text"]}>Application</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["login-box"]}>
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
                type="number"
                placeholder="Home Size*"
                {...register("homeSize")}
                required
              />
              <p>{errors.phone?.message}</p>

              <input
                type="number"
                placeholder="Number of Children*"
                {...register("numberOfChildren")}
                required
              />
              <p>{errors.phone?.message}</p>
            </div>

            {/* submit button and message */}

            <div className={styles["submit-container"]}>
              <input
                type="submit"
                className={styles["submit-btn"]}
                value="Submit"
              />
            </div>

            <div className={styles["top-margin"]}></div>

            {showConfirmation && (
              <div className={styles["confirmation-container"]}>
                <p className={styles["confirmation-text"]}>
                  Thank you your application!
                </p>
              </div>
            )}

            <div className={styles["top-margin"]}></div>
          </form>
        </Card>

        {/* chat box */}

        <div className={styles["chat-card"]}>
          <Chat className={styles["chat"]}/>
        </div>
      </div>

      <Footer />
    </body>
  );
}
