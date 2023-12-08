import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from '../pagecss/searchpage.module.css'
import "bulma/css/bulma.min.css";
import { Link } from "react-router-dom";

import cat from "../assets/cat.png";

export default function SearchPage() {
  return (
    <body>
      <Header/>

      <div className={styles.main}>
        <div className={styles['search-container']}>
          <div className={styles['search-top']}> 
            <div className={styles['sort-container']}>
              <div className={`${styles.label} ${styles['sort-label']}`}>
                Sort by:
              </div>

              {/* control??? */}
              <div className={styles.control}>
                <div className={styles.select}>
                  <select>
                    <option>Size</option>
                    <option>Name</option>
                    <option>Age</option>
                  </select>
                </div>
              </div>
            </div>

            {/* search bar */}
            <div className={styles['search-bar']}>
              <p className={`${styles['search-bar-input']} ${styles.control}`}>
                <input className={styles.input} input="text" placeholder='Search an animal'/>
              </p>

              <p className={styles.control}>
                <Link to='/search'>
                  <button className={styles['is-secondary']}>
                    Search
                  </button>
                </Link>
              </p>
            </div>
          </div>

          <div className={styles['search-bottom']}>
            {/* breed filter */}
            <div className={styles.filter}>
              <div className={styles.label}>Breed</div>
              <div className={styles.control}>
                <div className={styles.select}>
                  <select>
                    <option>Search an animal</option>
                    <option>Labrador</option>
                  </select>
                </div>
              </div>
            </div>

            {/* age filter */}
            <div className={styles.filter}>
              <div className={styles.label}>Age</div>
              <div className={styles.control}>
                <div className={styles.select}>
                  <select>
                    <option>Search an animal</option>
                    <option>10+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* gender filter */}
            <div className={styles.filter}>
              <div className={styles.label}>Gender</div>
              <div className={styles.control}>
                <div className={styles.select}>
                  <select>
                    <option>Search an animal</option>
                    <option>Male</option>
                  </select>
                </div>
              </div>
            </div>

            {/* size filter */}
            <div className={styles.filter}>
              <div className={styles.label}>Size</div>
              <div className={styles.control}>
                <div className={styles.select}>
                  <select>
                    <option>Search an animal</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* color filter */}
            <div className={styles.filter}>
              <div className={styles.label}>Color</div>
              <div className={styles.control}>
                <div className={styles.select}>
                  <select>
                    <option>Search an animal</option>
                    <option>Black</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* pet list */}
        <div className='tile is-ancestor pet-list'>
          <div className='tile is-vertical is-12'>
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

            {/* next pet... */}
            
          </div>
          </div>
        </div>
      </div>

      <Footer/>
    </body>
  );
}

