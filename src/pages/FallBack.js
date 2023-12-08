import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from '../pagecss/fallbackpage.module.css'

import { Link } from "react-router-dom";

export default function FallBack() {
  return (
    <body>
      <Header/>
      
        <div>fallback</div>

      <Footer/>
    </body>
    );
}
