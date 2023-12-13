import Button from "./Button";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "../css/ShelterPetCard.module.css";

export default function ShelterPetCard(props) {

  const { id } = useParams();

  const [petDetails, setPetDetails] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`${URL}pet/${props.id}/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
  
        const responseData = await response.json();
        // console.log(responseData)
        const tempData = {
          "id": responseData.id,
          "photos": [],
          "name": responseData.name,
          "status": responseData.status,
          "description": responseData.description,
          "behavior": responseData.behavior,
          "medicalHistory": responseData.medicalHistory,
          "specialNeeds": responseData.specialNeeds,
          "age": responseData.age,
          "breed": responseData.breed,
          "gender": responseData.gender,
          "size": responseData.size,
          "species": responseData.species,
          "color": responseData.color,
          "timestamp": responseData.timestamp,
          "location": responseData.location,
          "fee": responseData.fee,
          "shelter": responseData.shelter
        }
        setPetDetails(tempData); // Update the state with fetched details
      } catch (error) {
        console.error('Error fetching pet details:', error);
        // Handle error, e.g., redirect to an error page
      }
    };
  
    fetchPetDetails();
  }, [id]);

  return (
    <div>
      <div class="tile is-child">
        <div class="card is-hoverable">
          <div class="card-content">
            <div class="media">
              <div className={styles["pet_card"]}>
                <p class="title is-4">{props.petName}</p>
                <img src={props.pfp} className={styles.pet_img} />
                <p class="subtitle is-6">
                  {/* // TODO: needs / at the beginning of the link, see ShelterDashboardPage for example */}
                  <Link to={props.pet_update_page}>
                    <Button>Update</Button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
