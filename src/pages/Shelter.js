import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from '../pagecss/shelter.module.css'

import { Link } from "react-router-dom";

export default function ShelterPage() {
   return (
      <body>
         <Header/>

         <div className={styles.main}>

         </div>

         <Footer/>
      </body>
   );
}