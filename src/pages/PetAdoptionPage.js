import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import Header from "../components/Header";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../pagecss/petadoptionpage.module.css";

export default function PetAdoption() {
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required*"),
    LastName: yup.string().required("Last name is required*"),
    email: yup.string().email().required("Email is required*"),
    phone: yup.number().typeError("Phone number is required*"),
    homeSize: yup.number().required("House size is required*"),
    numChild: yup.number().required("Number of children is required*"),
    reasonOfAdopt: yup.string().required("Reason for adoption is required*"),
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
      <Header />

      <div className={styles.main}>
        <Card className={styles['background-box']}>
          <p className={styles['application-text']}>Application</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles['app-box']}>
              <input
                type="text"
                placeholder="First Name*"
                {...register("firstName")}
              />
              <p>{errors.firstName?.message}</p>
            </div>

            <div className={styles['app-box']}>
              <input
                type="text"
                placeholder="Last Name*"
                {...register("lastName")}
              />
              <p>{errors.LastName?.message}</p>
            </div>

            <div className={styles['app-box']}>
              <input type="email" placeholder="Email*" {...register("email")} />
              <p>{errors.email?.message}</p>
            </div>

            <div className={styles['app-box']}>
              <input
                type="text"
                placeholder="Phone number*"
                {...register("phone")}
              />
              <p>{errors.phone?.message}</p>
            </div>

            <div className={styles['app-box']}>
              <input
                type="text"
                placeholder="Home Size*"
                {...register("homeSize")}
              />
              <p>{errors.homeSize?.message}</p>
            </div>

            <div className={styles['app-box']}>
              <input
                type="text"
                placeholder="Number of Children*"
                {...register("numChild")}
              />
              <p>{errors.numChild?.message}</p>
            </div>

            <div className={styles['app-box']}>
              <textarea
                type="text"
                placeholder="Reason of Adoption*"
                {...register("reasonOfAdopt")}
              />
              <p>{errors.reasonOfAdopt?.message}</p>
            </div>

            <div className={styles['submit-container']}>
              <input
                type="submit"
                className={styles['submit-btn']}
                value="Submit"
                required
              />
            </div>
          </form>
        </Card>
      </div>

      <Footer />
    </body>
  );
}
