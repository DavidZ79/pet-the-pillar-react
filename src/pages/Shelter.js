import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

import 'bulma/css/bulma.min.css';
import styles from '../pagecss/shelter.module.css';

import pfp from '../assets/profile.png';
import cat from '../assets/cat.png';
import rat from '../assets/TheCourier.png';

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

var URL = process.env.REACT_APP_API_URL;

export default function ShelterPage() {
   const { id } = useParams();

   const [shelterDetail, setShelterDetails] = useState(null);

   useEffect(() => {
      const fetchShelterDetails = async () => {
        try {
          const response = await fetch(`${URL}account/shelter/${id}/`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch pet details');
          }
    
          const responseData = await response.json();
          console.log(responseData)
          const tempData = {
            "id": responseData.id,
            "username": responseData.username,
            "email": responseData.email,
            "phoneNumber": responseData.phoneNumber,
            "location": responseData.location,
            "missionStatement": responseData.missionStatement,
            "totalRating": responseData.totalRating,
            "numberOfRating": responseData.numberOfRating
         }
          setShelterDetails(tempData); // Update the state with fetched details
        } catch (error) {
          console.error('Error fetching pet details:', error);
          // Handle error, e.g., redirect to an error page
        }
      };
    
      fetchShelterDetails();
    }, [id]);

   return (
      <body>
         <Header/>

         <div className={styles.main}>
            <Card className={styles['background-box']}>
               <div className={styles['pfp-container']}>
                  <img src={pfp} alt='shelter pic' className={styles.pfp}/>
               </div>

               <p className={styles['shelter-name']}>
                  {shelterDetail ? shelterDetail.username : ""}
               </p>

               <div className={styles['rating-div']}>
                  <span className='rating-heading'>User rating:</span>
                  <span className={styles['rating-number']}>{shelterDetail ? shelterDetail.totalRating : ""}</span>
                  <span className={`fa fa-star ${styles.checked}`}></span>
                  <span className={`fa fa-star ${styles.checked}`}></span>
                  <span className={`fa fa-star ${styles.checked}`}></span>
                  <span className={`fa fa-star ${styles.checked}`}></span>
                  <span className="fa fa-star"></span>
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
                  {shelterDetail ? shelterDetail.location : ""}
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
                  {shelterDetail ? shelterDetail.email : ""}
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
                  {shelterDetail ? shelterDetail.phoneNumber : ""}
               </p>

               <p className={styles.mission}>Our Mission Statement:</p>
               <div className={styles['mission-text']}>
               {shelterDetail ? shelterDetail.missionStatement : ""}
               </div>
               
               <div className={styles['blog-container']}>
                  <Link to='/shelter_blog'>
                     <p className={styles.blog}>Head over to our Blog Page!</p>
                  </Link>
               </div>
            </Card>

            <div className={styles['available-section']}>
               <p className={styles.available}>Available:</p>
               <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>

               <div className='animal-list'>
                  <div className='tile is-ancestor pet-list'>
                     <div className='tile is-12'>

                     {/* pet 1 */}
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
                                    <p className='title is-4'>Sylas</p>
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
                                       Age: 15
                                    </div>
                                    <div>
                                       Male
                                    </div>
                                    </div>
                                    <div>
                                    Breed: Magical cat
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* pet 1 */}
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
                                    <p className='title is-4'>Sylas</p>
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
                                       Age: 15
                                    </div>
                                    <div>
                                       Male
                                    </div>
                                    </div>
                                    <div>
                                    Breed: Magical cat
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* next pet... */}
                     
                     </div>
                  </div>
                  
               </div>
            </div>

            <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>
            <div className={styles['adopted-section']}>
               <p className={styles.adopted}>Adopted:</p>
               <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>

               <div className='animal-list'>
                  <div className='tile is-ancestor pet-list'>
                     <div className='tile is-12'>

                     {/* pet 1 */}
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
                                    <p className='title is-4'>Sylas</p>
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
                                       Age: 15
                                    </div>
                                    <div>
                                       Male
                                    </div>
                                    </div>
                                    <div>
                                    Breed: Magical cat
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* pet 1 */}
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
                                    <p className='title is-4'>Sylas</p>
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
                                       Age: 15
                                    </div>
                                    <div>
                                       Male
                                    </div>
                                    </div>
                                    <div>
                                    Breed: Magical cat
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* next pet... */}
                     
                     </div>
                  </div>
               </div>
            </div>

            <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>
            <div className={styles['review-section']}>
               <p className={styles.review}>Review:</p>
               <hr className={`${styles['navbar-divider']} ${styles.spacer}`}/>

               <div className={styles['write-review']}>
                  <textarea></textarea>

                  <button type="submit" className={`${styles['is-secondary']} ${styles.button}`}>Submit Review</button>
               </div>

               {/* https://bulma.io/documentation/layout/media-object/ */}
               <article className={styles['media-box']}>
                  <figure className='media-left'>
                     <p className='image is-64x64'>
                        <img className='is-round' src={rat}/>
                     </p>
                  </figure>

                  <div className='media-content'>
                     <div className='content'>
                        <p className={styles['br-text']}>
                           <span className={styles['review-name']}>Barbara Middleton</span>
                           <br/>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
                           <br/>
                           <small><time>11:09 PM - 1 Jan 2016</time></small>
                        </p>
                     </div>

                     <article className='media'>
                        <figure className='media-left'>
                           <p className='image is-48x48'>
                              <img className='is-round' src={cat}/>
                           </p>
                        </figure>
                        
                        <div className='media-content'>
                           <div className='content'>
                              <p className={styles['br-text']}>
                                 <span className={`${styles['review-name']} ${styles['shelter-post']}`}>Salt Saint Moody</span>
                                 <br/>
                                 Donec sollicitudin urna eget eros malesuada sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam blandit nisl a nulla sagittis, a lobortis leo feugiat.
                                 <br/>
                                 <small><time>11:29 PM - 1 Jan 2016</time></small>
                              </p>
                           </div>

                        </div>
                     </article>

                     <article className='media'>
                        <figure className='media-left'>
                           <p className='image is-48x48'>
                              <img className='is-round' src={pfp}/>
                           </p>
                        </figure>

                        <div class="media-content">
                           <div class="content">
                              <p className={styles['br-text']}>
                                 <span className={styles['review-name']}>Kayli Eunice </span>
                                 <br/>
                                 Sed convallis scelerisque mauris, non pulvinar nunc mattis vel. Maecenas varius felis sit amet magna vestibulum euismod malesuada cursus libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus lacinia non nisl id feugiat.
                                 <br/>
                                 <small><time>11:39 PM - 1 Jan 2016</time></small>
                              </p>
                           </div>
                        </div>
                     </article>

                  </div>
                  



               </article>

            </div>



         </div>

         <Footer/>
      </body>
   );
}