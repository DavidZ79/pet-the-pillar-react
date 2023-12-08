import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import Header from "../components/Header";

import styles from "../pagecss/signuppage.module.css";

import { Link } from "react-router-dom";

export default function SignupBeforePage() {
  return (
    <>
      <Header/>

      <div className={styles.main}>
        <Card className={styles['background-box']}>
          <p className={styles['signup-text']}>Sign Up</p>

          <Link to="/signup_seeker">
            <Button className={styles['signup-btn']}>As a Pet Seeker</Button>
          </Link>

          <Link to="/signup_shelter">
            <Button className={styles['signup-btn']}>As a Pet Shelter</Button>
          </Link>
        </Card>
      </div>

      <Footer />
    </>
  );
}
