import "../css/main_style.css";
import styles1 from "../css/main_style.css";
import styles2 from "../css/pet_listing.css"
import styles3 from '../pagecss/searchpage.module.css'

import { Link } from "react-router-dom";
import React, { useState } from "react";
import cat from "../assets/cat.png";

var API_URL = process.env.REACT_APP_API_URL;
var BASE_URL = API_URL.slice(0, -5);

const styles = {...styles1,...styles2,...styles3};

export default function AppCard({props}) {

  const [appDetails, setAppDetails] = useState(null);
  const [petDetails, setPetDetails] = useState(null);

  React.useEffect(() => {
    const fetchAppDetails = async () => {
      try {
        const response = await fetch(`${API_URL}application/${props.id}/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch app details');
        }
  
        const responseData = await response.json();
        // console.log(responseData)
        const tempData = {
          "pet": responseData.pet,
          "status": responseData.status,
          "timestamp": responseData.timestamp,
          "last_updated": responseData.last_updated
        }
        console.log(tempData)
        setAppDetails(tempData); // Update the state with fetched details
        fetchPetDetails(tempData.pet)
      } catch (error) {
        console.error('Error fetching pet details:', error);
        // Handle error, e.g., redirect to an error page
      }
    };

    const fetchPetDetails = async (pet) => {
      try {
        const response = await fetch(API_URL + `pet/${pet}/`, {
          method: 'GET',
          headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
  
        const responseData = await response.json();
        // console.log(responseData)
        const tempData = {
          "photo": responseData.photos[0]['image'],
          "name": responseData.name
        }
        setPetDetails(tempData); 
      } catch (error) {
        console.error('Error fetching pet details:', error);
        // Handle error, e.g., redirect to an error page
      }
    };
  
    fetchAppDetails();
  }, []);

   return (
      <div className='tile is-3 is-parent fixer'>
      <div className='tile is-child'>
        <div className={`is-hoverable ${styles.card}`}>
          <div className={`card-image card ${styles.cardImage}`}>
            <Link to={`/pet_application/${props.id}`}>
              <figure className={`image is-4by4 ${styles.cardImage}`}>
                <img className={`${styles.cardImage}`} src={petDetails ? BASE_URL + petDetails.photo : cat} alt="Placeholder pic"/>
              </figure>
            </Link>
          </div>

          <div className='card-content'>
            <div className='media'>
              <div className='media-content'>
                <p className='title is-4'>{petDetails ? petDetails.name : ""}</p>
              </div>
            </div>

            <div className='content'>
                <div className=''>
                  <div>
                    Status: {appDetails ? appDetails.status : ""}
                  </div>
                  <div>
                     Updated: {appDetails ? appDetails.gender : ""}
                     <time>{new Date(appDetails?.last_updated).toLocaleString()}</time>
                  </div>
                </div>
                <div>
                  Created: {appDetails ? appDetails.breed : ""}
                  <time>{new Date(appDetails?.timestamp).toLocaleString()}</time>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
   );
}