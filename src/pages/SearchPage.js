import Header from '../components/Header';
import Footer from '../components/Footer';

import styles1 from "../css/main_style.css";
import styles2 from "../css/pet_listing.css"
import styles3 from '../pagecss/searchpage.module.css'
import { Link } from "react-router-dom";

import cat from "../assets/cat.png";
import PetCard from '../components/PetCard';

const styles = {...styles1,...styles2,...styles3};

export default function SearchPage() {
  return (
    <body>
      <Header/>

      <div className={`${styles.main}`}>
        <div className={`search-container ${styles['search-container']}`}>
          <div className={`search-top ${styles['search-top']}`}> 
            <div className={`sort-container ${styles['sort-container']}`}>
              <div className={`label sort-label ${styles['sort-label']}`}>
                Sort by:
              </div>

              {/* control??? */}
              <div className={`control`}>
                <div className={`select `}>
                  <select>
                    <option>Size</option>
                    <option>Name</option>
                    <option>Age</option>
                  </select>
                </div>
              </div>
            </div>

            {/* search bar */}
            <div className={`search-bar ${styles['search-bar']}`}>
              <p className={`${styles['search-bar-input']} control search-bar-input`}>
                <input className={`${styles.input} input`} input="text" placeholder='Search an animal'/>
              </p>

              <p className={`control`}>
                <Link to='/search'>
                  <button className={`button is-secondary ${styles['is-secondary']}`}>
                    Search
                  </button>
                </Link>
              </p>
            </div>
          </div>

          <div className={`search-bottom ${styles['search-bottom']}`}>
            {/* breed filter */}
            <div className={`filter`}>
              <div className={`label`}>Breed</div>
              <div className={`control`}>
                <div className={`select`}>
                  <select>
                    <option>Search an animal</option>
                    <option>Labrador</option>
                  </select>
                </div>
              </div>
            </div>

            {/* age filter */}
            <div className={`filter`}>
              <div className={`label`}>Age</div>
              <div className={`control`}>
                <div className={`select`}>
                  <select>
                    <option>Search an animal</option>
                    <option>10+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* gender filter */}
            <div className={`filter`}>
              <div className={`label`}>Gender</div>
              <div className={`control`}>
                <div className={`select`}>
                  <select>
                    <option>Search an animal</option>
                    <option>Male</option>
                  </select>
                </div>
              </div>
            </div>

            {/* size filter */}
            <div className={`filter`}>
              <div className={`label`}>Size</div>
              <div className={`control`}>
                <div className={`select`}>
                  <select>
                    <option>Search an animal</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* color filter */}
            <div className={`filter`}>
              <div className={`label`}>Color</div>
              <div className={`control`}>
                <div className={`select`}>
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
        <div className={` tile is-ancestor pet-list`}>
          <div className='tile is-vertical is-12'>
          <div className='tile is-12'>

            {/* pet 1 */}
            <PetCard/>

            {/* next pet... */}
            
          </div>
          </div>
        </div>
      </div>

      <Footer/>
    </body>
  );
}

