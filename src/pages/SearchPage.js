import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

import styles from '../pagecss/searchpage.module.css'

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
            </div>


          </div>
        </div>







      </div>

      <Footer/>
    </body>
  );
}

