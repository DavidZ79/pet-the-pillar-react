import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import PetCard from '../components/PetCard';
import ReviewCard from '../components/ReviewCard';

import 'bulma/css/bulma.min.css';
import styles from '../pagecss/shelter.module.css';

import pfp from '../assets/profile.png';
import cat from '../assets/cat.png';
import rat from '../assets/TheCourier.png';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";


var API_URL = process.env.REACT_APP_API_URL;

export default function ShelterPage() {
   const { id } = useParams();

   const [shelterDetail, setShelterDetails] = useState(null);
   const [availablePets, setAvailablePets] = useState(null);
   const [adoptedPets, setAdoptedPets] = useState(null);
   const [availablePageNumber, setAvailablePageNumber] = useState(1);
   const [adoptedPageNumber, setAdoptedPageNumber] = useState(1);
   const [starRating, setStarRating] = useState(0);
   const [rootReviewList, setRootReviewList] = useState([]);


   async function fetchShelterDetails () {
      try {
        const response = await fetch(`${API_URL}account/shelter/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch shelter details');
        }
  
        const responseData = await response.json();
      //   console.log(responseData)
        const tempData = {
          "id": responseData.id,
          "username": responseData.username,
          "email": responseData.email,
          "phoneNumber": responseData.phoneNumber,
          "location": responseData.location,
          "missionStatement": responseData.missionStatement,
          "totalRating": responseData.totalRating,
          "numberOfRating": responseData.numberOfRating,
          "picture": responseData.picture,
       }
        setShelterDetails(tempData); // Update the state with fetched details
      //   console.log(responseData)
        return responseData
      } catch (error) {
      //   console.error('Error fetching pet details:', error);
        // Handle error, e.g., redirect to an error page
      }
    };

    async function initReviewData() {
      if (rootReviewList.length === 0) {
        const tempData = await fetchRootReviews();
        setRootReviewList(tempData); // Update the state with fetched details
      }
    }

    const fetchRootReviews = async (url = null) => {
      try {
        const response = await fetch(url ?? `${API_URL}comment/review/${id}/list/0/`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch review details');
        }
  
        const responseData = await response.json();
      //   console.log(responseData)
        const tempData = {
          "next": responseData.next,
          "count": responseData.count,
          "previous": responseData.previous,
          "results": responseData.results
       }
      //   console.log(responseData)
        return tempData.results;
      } catch (error) {
      //   console.error('Error fetching pet details:', error);
        // Handle error, e.g., redirect to an error page
      }
    };

    async function fetchPetList (status, url = "") {
      const data = shelterDetail ?? (await fetchShelterDetails());
      try {
         var realURL = ""
         if (url === "") {
            realURL = `${API_URL}pet/list/?shelter_username=${data.username}&status=${status}&page=1`
            console.log("URL:", realURL)
         } else {
            realURL = url
            console.log("URL2:", realURL)
         }
         const response = await fetch(realURL, {
           method: 'GET',
           headers: {
             'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
           },
         });
   
         if (!response.ok) {
           throw new Error('Failed to fetch pet details');
         }
   
         const responseData = await response.json();
         console.log("AAAAAAAAAAAAAAAA")
         console.log(responseData)
         // console.log("GOT ", realURL)

         if (status === "Available") {
            setAvailablePets(responseData)
         } else if (status === "Adopted") {
            setAdoptedPets(responseData)

         }
         
       } catch (error) {
         // console.error('Error fetching pet details:', error);
         // Handle error, e.g., redirect to an error page
       }
   };

   async function fetchRating() {
      const url = `${API_URL}comment/rating/${id}/`;
      try {
         const response = await fetch(url, {
            method: 'GET',
            headers: {
               'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
             },
         });

         if (!response.ok) {
            setStarRating(0);
            throw new Error('Rating does not exist');
         }

         const responseData = await response.json();
         setStarRating(parseInt(responseData.rating));
         console.log("RATING:", responseData)
         return responseData
      } catch (error) {
         console.error('Error fetching rating details:', error)
      }
   }

   async function updateRating(rating) {
      console.log(JSON.stringify({'rating': rating,
            'user': 1,
         }));
      const url = `${API_URL}comment/rating/${id}/`;
      if (starRating === 0) {
         try {
            const response = await fetch(url, {
               method: 'POST',
               headers: {
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
               },
               body: JSON.stringify({
                  'rating': rating,
                  'user': 1,
               }),
            });

            if (!response.ok) {
               setStarRating(0);
               throw new Error('Rating could not be created');
            }

            const responseData = await response.json();
            setStarRating(parseInt(responseData.rating));
            fetchShelterDetails() // Make sure rating is updated on the shelter part
            console.log("UPDATED RATING:", responseData)
            return responseData
         } catch (error) {
            console.error('Error creating rating details:', error)
            console.log(JSON.stringify({'rating': rating,
            'user': 1,
         }));
         }
      } else {
            try {
            const response = await fetch(url, {
               method: 'PATCH',
               headers: {
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
               },
               body: JSON.stringify({
                  'rating': rating,
               }),
            });

            if (!response.ok) {
               setStarRating(0);
               throw new Error('Rating does not exist');
            }

            const responseData = await response.json();
            setStarRating(parseInt(responseData.rating));
            fetchShelterDetails() // Make sure rating is updated on the shelter part
            console.log("UPDATED RATING:", responseData)
            return responseData
         } catch (error) {
            console.error('Error fetching rating details:', error)
         }
      }
   }
   const [textareaValue, setTextareaValue] = useState('');

   const handleTextareaChange = (event) => {
      setTextareaValue(event.target.value);
    };

   const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Here you can use textareaValue in your POST request
      console.log('Submitting:', textareaValue);
  
      // Example POST request
      const response = await fetch(API_URL + `comment/review/${id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          // Additional headers if needed
        },
        body: JSON.stringify({ content: textareaValue, user: 1 }),
      });
      const data = await response.json();
      console.log(data);
      const tempData = await fetchRootReviews();
      setRootReviewList(tempData);
    };

   function Stars({rating, update = false}) {
      const roundedRating = Math.floor(rating);
      var result = [];
      
      for (let i = 0; i < 5; i++) {
         result.push(<FontAwesomeIcon key={i} onClick={() => update ? updateRating(i+1) : null} className = {`${i < roundedRating ? styles.checked : ''}`} icon={faStar} />)
      }
      
      return result
   };

   useEffect(() => {
      fetchShelterDetails();
      fetchPetList("Available");
      console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
      fetchPetList("Adopted");
      initReviewData();
      fetchRating();
      
      setAvailablePageNumber(1)
      setAdoptedPageNumber(1)

    }, []);

   return (
      <body>
         <Header/>

         <div className={styles.main}>
            <Card className={styles['background-box']}>
               <div className={styles['pfp-container']}>
                  <img src={shelterDetail ? shelterDetail.picture : pfp} alt='shelter pic' className={styles.pfp}/>
               </div>

               <p className={styles['shelter-name']}>
                  {shelterDetail ? shelterDetail.username : ""}
               </p>

               <div className={styles['rating-div']}>
                  <span className='rating-heading'>User rating:</span>
                  <span className={styles['rating-number']}>{shelterDetail && shelterDetail.numberOfRating !== 0 ? (shelterDetail.totalRating / shelterDetail.numberOfRating).toFixed(1) : "NAN"}</span>
                  <Stars rating={shelterDetail ? (shelterDetail.numberOfRating !== 0 ? (shelterDetail.totalRating / shelterDetail.numberOfRating).toFixed(1) : 0) : 0}/>
               </div>

               <p className={styles.location}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="1em"
                     viewBox="0 0 384 512"
                  >
                     {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com/ License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                     <path
                     d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                     />
                  </svg>
                  {shelterDetail ? ` ${shelterDetail.location ?? ''}` : ''}
               </p>

               <p className={styles.email}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="1em"
                     viewBox="0 0 512 512"
                  >
                     {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com/ License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                     <path
                     d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
                     />
                  </svg>
                  {shelterDetail ? ` ${shelterDetail.email ?? ''}` : ''}
               </p>

               <p className={styles.contact}>
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="1em"
                     viewBox="0 0 512 512"
                  >
                     {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com/ License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                     <path
                     d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                     />
                  </svg>
                  {shelterDetail ? ` ${shelterDetail.phoneNumber ?? ''}` : ''}
               </p>

               <p className={styles.mission}>Our Mission Statement:</p>
               <div className={styles['mission-text']}>
               {shelterDetail ? shelterDetail.missionStatement ?? '' : ""}
               </div>
               
               <div className={styles['blog-container']}>
                  <Link to={`/shelter_blog/${id}`}>
                     <p className={styles.blog}>Head over to our Blog Page!</p>
                  </Link>
               </div>
            </Card>
            <div className={styles['available-section']}>
               <p className={styles.available}>Available:</p>
               <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>
               
               <div className={`${styles['animal-list']}`}>
                  <div className='tile is-ancestor pet-list'>
                     <div className='tile is-vertical is-12' >

                     <div className='tile is-12'>

                     {/* pet 1 */}
                     
                     {availablePets && availablePets.results && availablePets.results.map((petResult, index) => (
                        <PetCard key={petResult.id} props={petResult} />
                        ))}

                     {/* next pet... */}
                     
                     </div>
                     </div>
                  </div>
                  
               </div>

               <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>

               
               <nav class="pagination" role="navigation" aria-label="pagination">
               <button 
               class={`button is-secondary ${availablePets !== null && availablePets.previous !== null ? "" : "invisible"}`}
               onClick={() => {
                  if (availablePets !== null && availablePets.previous !== null) {
                     setAvailablePets(fetchPetList("Available", availablePets.previous));
                     setAvailablePageNumber(availablePageNumber - 1);
                  }
               }}
               >
                  Previous</button>
                  <a class="pagination-link is-current">{availablePageNumber}</a>
               <button class={`button is-secondary ${availablePets !== null && availablePets.next !== null ? "" : "invisible"}`} 
               onClick={ () => {
                     if (availablePets !== null && availablePets.next !== null) {
                        setAvailablePets(fetchPetList("Available", availablePets.next));
                        setAvailablePageNumber(availablePageNumber + 1);
                     }
                  
               }}
               >Next page</button>
               </nav>

            </div>
            
            <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>


               <div className={styles['adopted-section']}>
               <p className={styles.adopted}>Adopted:</p>
               <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>
               
               

               <div className='animal-list'>
                  <div className='tile is-ancestor '>
                     <div className='tile is-12 pet-list'>

                     {adoptedPets && adoptedPets.results && adoptedPets.results.map((petResult, index) => (
                        <PetCard key={petResult.id} props={petResult} />
                     ))}
                     
                     </div>
                  </div>
               </div>
               
               <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>

               <nav class="pagination" role="navigation" aria-label="pagination">
               <button class={`button is-secondary ${adoptedPets !== null && adoptedPets.previous !== null ? "" : "invisible"}`}
               onClick={ () => {
                  if (adoptedPets !== null && adoptedPets.previous !== null) {
                     setAdoptedPets(fetchPetList("Adopted", adoptedPets.previous));
                     setAdoptedPageNumber(adoptedPageNumber - 1);
                  }
               }}
               >Previous</button>
               <a class="pagination-link is-current">{adoptedPageNumber}</a>
               <button class={`button is-secondary ${adoptedPets !== null && adoptedPets.next !== null ? "" : "invisible"}`}
               onClick={ () => {
                  if (adoptedPets !== null && adoptedPets.next !== null) {
                     setAdoptedPets(fetchPetList("Adopted", adoptedPets.next));
                     setAdoptedPageNumber(adoptedPageNumber - 1);
                  }
               }}
               >Next page</button>
               </nav>
               </div>
               <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>
            
            <div className={styles['review-section']}>
               <p className={styles.review}>Review:</p>
               <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>

               <div className={styles['write-review']}>
                  <div className={`${styles['your-rating']}`}>
                  <div>Your rating:</div>
                  <div><Stars rating={starRating} update={true}></Stars></div>
                  </div>

                  <form className={`${styles['form']}`} onSubmit={handleSubmit}>
      <textarea
        value={textareaValue}
        onChange={handleTextareaChange}
      ></textarea>

      <button type="submit" className={`${styles['is-secondary']} ${styles.button} ${styles.secret3}`}>
        Submit Review
      </button>
    </form>

               {/* https://bulma.io/documentation/layout/media-object/ */}
</div>

               {rootReviewList && rootReviewList.map((appResult, index) => (
                <ReviewCard key={appResult.id} props={appResult} />
              ))}

            </div>



         </div>

         <Footer/>
      </body>
   );
}