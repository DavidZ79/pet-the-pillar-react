import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from "../components/Card";
import Chat from "../components/Chat";

import styles from '../pagecss/petapplication.module.css'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

export default function PetApplicationPage() {
   const navigate = useNavigate();
   const schema = yup.object().shape({
      reasonOfAdopt: yup.string().required("Reason for adoption is required*"),
    });
  
    const {
      register,
      handleSubmit,
    } = useForm({
      resolver: yupResolver(schema),
    });
   const { id } = useParams();

   const onSubmit = (data) => {
      console.log("submitted");
      console.log({ data });
      //form logic here
    };

    const [petDetails, setPetDetails] = useState(null);
    const [appDetails, setAppDetails] = useState(null);
    useEffect(() => {
      const fetchPetDetails = async (petId) => {
         try {
           const response = await fetch(`${API_URL}pet/${petId}/`, {
             method: 'GET',
             headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
             },
           });
     
           if (!response.ok) {
             throw new Error('Failed to fetch pet details');
           }
     
           const responseData = await response.json();
           const tempData = {
             "photo": responseData.photos[0]['image'],
             "name": responseData.name,
           }
           setPetDetails(tempData); // Update the state with fetched details
         } catch (error) {
           console.error('Error fetching pet details:', error);
           // Handle error, e.g., redirect to an error page
         }
       };

      const fetchAppDetails = async () => {
        try {
          const response = await fetch(`${API_URL}application/${id}/`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch pet details');
          }
    
          const responseData = await response.json();
          const tempData = {
            "pet": responseData.pet,
            "status": responseData.status,
            "reason": responseData.reason
          }
          setAppDetails(tempData); // Update the state with fetched details
          fetchPetDetails(tempData.pet);
        } catch (error) {
          console.error('Error fetching pet details:', error);
          // Handle error, e.g., redirect to an error page
        }
      };
    
      fetchAppDetails();
    }, [id]);

    const handleWithdraw = async () => {
      const formData = new FormData();
      formData.append('user', localStorage.getItem('userId'));
      formData.append('status', 'Withdrawn');
      try {
         const response = await fetch(`${API_URL}application/${id}/`, {
           method: 'PATCH',
           headers: {
             'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
           },
           body: formData,
         });
   
         if (!response.ok) {
           throw new Error('Failed to update app details');
         }
         navigate(`/`); 

       } catch (error) {
         console.error('second demon:', error.message);
       }   
    }
    const handleAccept = async () => {
      const formData = new FormData();
      formData.append('user', localStorage.getItem('userId'));
      formData.append('status', 'Accepted');
      try {
         const response = await fetch(`${API_URL}application/${id}/`, {
           method: 'PATCH',
           headers: {
             'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
           },
           body: formData,
         });
   
         if (!response.ok) {
           throw new Error('Failed to update app details');
         }
         navigate(`/`); 

       } catch (error) {
         console.error('second demon:', error.message);
       }     
    }
    const handleDecline = async () => {
      const formData = new FormData();
      formData.append('user', localStorage.getItem('userId'));
      formData.append('status', 'Declined');
      try {
         const response = await fetch(`${API_URL}application/${id}/`, {
           method: 'PATCH',
           headers: {
             'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
           },
           body: formData,
         });
   
         if (!response.ok) {
           throw new Error('Failed to update app details');
         }
         navigate(`/`); 

       } catch (error) {
         console.error('second demon:', error.message);
       }       
    }

   return (
      <>
        <Header />
  
        <div className={styles.main}>
          <Card className={styles["background-box"]}>
          {/* <div className={`${styles["submit-container"]} ${localStorage.getItem("isShelter") === "true" ? "hide" : ''}`}>
                <input
                  className={styles["submit-btn"]}
                  value="Adopt"
                  onClick={handleAdopt}
                />
              </div> */}

            <p className={styles["signup-text"]}>{petDetails ? petDetails.name : ""} Application</p>
  
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles["pfp-container"]}>
                <img src={petDetails ? BASE_URL + petDetails.photo : ''} alt="pfp pic" className={styles.pfp} />              
              </div>
  
              <div className={styles["login-box"]}>
              <div className={styles["wrapper"]}>
              <p>Status: </p>
              <input
                type="text"
                value={petDetails ? appDetails.status : ""}
                disabled
              />
              </div>

              <div className={styles["wrapper"]}>
              <p className={styles["box_header"]}>Reason: </p>
              <textarea
                value={petDetails ? appDetails.reason : ""}
                {...register("medicalHistory")}
                disabled
              />
              </div>

              <div className={`
    ${styles["submit-container"]} 
    ${localStorage.getItem("isShelter") === "true" || (appDetails && (appDetails.status !== "Pending" && appDetails.status !== "Accepted")) ? "hide" : ''}`}>
               <input
                className={styles["submit-btn"]}
                value="Withdraw"
                onClick={handleWithdraw}
              />
               </div>
               
               <div className={styles["wrapper2"]}>
               <div className={`
               ${styles["submit-container"]} 
               ${(localStorage.getItem("isShelter") === "false" || (appDetails && appDetails.status !== "Pending")) ? "hide" : ''}`}>
              <input
                className={styles["submit-btn"]}
                value="Accept"
                onClick={handleAccept}
              />
            </div>

            <div className={`
               ${styles["submit-container"]} 
               ${(localStorage.getItem("isShelter") === "false" || (appDetails && appDetails.status !== "Pending")) ? "hide" : ''}`}>
              <input
                className={styles["submit-btn"]}
                value="Decline"
                onClick={handleDecline}
              />
            </div>
            </div>
  
              </div>
            </form>
          </Card>

          <div className={styles["chat-card"]}>
          <Chat className={styles["chat"]}/>
            </div>
            
        </div>

        
  
        <Footer />
      </>
    );
}