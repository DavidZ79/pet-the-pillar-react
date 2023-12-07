import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";

import styles from "./shelter_dashboard_page.module.css";
import shelterpic from "./shelter_dashboard_images/shelter_management_front.jpg";

import { Link } from "react-router-dom";

export default function ShelterDashboardPage() {
  return (
    <>
      <div className={styles.main}>
        <div>
          <img
            src={shelterpic}
            alt="Shelter Image"
            className={styles.shelter_img_front}
          />
        </div>
        <div className={styles.cards_container}>
          <h1 className={styles.dashboard}>Shelter Management</h1>
          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.h1}>Update Pet Info</div>
              <p>Edit the information of your currently listed pets</p>
              <Link to="/signup_before">
                <Button>Update</Button>
              </Link>
            </div>
            <div className={styles.card}>
              <h2>Create New Listing</h2>
              <p>List another pet in this shelter for adoption</p>
              <Link to="/signup_before">
                <Button>Create</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
