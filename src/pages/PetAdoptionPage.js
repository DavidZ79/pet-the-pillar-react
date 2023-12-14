import Footer from "../components/Footer";
import Card from "../components/Card";
import Header from "../components/Header";

import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "../pagecss/petadoptionpage.module.css";
var API_URL = process.env.REACT_APP_API_URL;

export default function PetAdoption() {
  const schema = yup.object().shape({
    reasonOfAdopt: yup.string().required("Reason for adoption is required*"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { reasonOfAdopt } = data;
    const requestData = {
      reason: reasonOfAdopt,
      pet: parseInt(id),
    };
    try {
      const response = await fetch(API_URL + 'application/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error(response.status);
      }
  
      const responseData = await response.json();
      console.log(responseData);
      // navigate("/shelter_dashboard"); 
    } catch (error) {
      console.log(requestData)
      console.error('second demon:', error.message);
    }
  };

  return (
    <body>
      <Header />

      <div className={styles.main}>
        <Card className={styles['background-box']}>
          <p className={styles['application-text']}>Application</p>

          <form onSubmit={handleSubmit(onSubmit)}>
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
