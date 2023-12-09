import "../css/main_style.css";
import styles1 from "../css/main_style.css";
import styles2 from "../css/pet_listing.css"
import styles3 from '../pagecss/searchpage.module.css'

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import cat from "../assets/cat.png";

var URL = process.env.REACT_APP_API_URL;

const styles = {...styles1,...styles2,...styles3};

export default function PetCard({children, props, className}) {
   const { id } = useParams();

  const [petDetails, setPetDetails] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`${URL}pet/${1}/`, {
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
      <div className='tile is-3 is-parent'>
      <div className='tile is-child'>
        <div className={`is-hoverable ${styles.card}`}>
          <div className='card-image'>
            <Link to='/pet_detail'>
              <figure className='image is-4by4'>
                <img src={cat} alt="Placeholder image"/>
              </figure>
            </Link>
          </div>

          <div className='card-content'>
            <div className='media'>
              <div className='media-content'>
                <p className='title is-4'>{petDetails ? petDetails.name : ""}</p>
                <p className='subtitle is-6'>
                  <Link to="/shelter">
                    Generic Animal Shelter
                  </Link>
                </p>
              </div>
            </div>

            <div className='content'>
                <div className=''>
                  <div>
                    Age: {petDetails ? petDetails.age : ""}
                  </div>
                  <div>
                     {petDetails ? petDetails.gender : ""}
                  </div>
                </div>
                <div>
                  Breed: {petDetails ? petDetails.breed : ""}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
   );
}