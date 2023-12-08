import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from '../pagecss/petcreatepage.module.css'

import { Link } from "react-router-dom";

export default function PetCreatePage() {
   return (
      <body>
         <Header/>

         <div className={styles.main}>
            <div className={styles['left-wrapper']}>

            </div>

            <div className={styles.but}>

            </div>
         </div>

         <Footer/>
      </body>
   );
}