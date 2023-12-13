import Header from "../components/Header";
import Footer from "../components/Footer";
import ShelterCard from "../components/ShelterCard";

import styles from "../pagecss/shelterlistpage.module.css";

export default function ShelterListPage() {
  return (
    <>
      <Header />

      <div className={styles.body}>
        <div className={styles.title}>Shelters</div>
        <div className={styles.card_container}>
            <ShelterCard name="Shelter a" />
            <ShelterCard name="Shelter a" />
            <ShelterCard name="Shelter a" />
            <ShelterCard name="Shelter a" />
            <ShelterCard name="Shelter a" />
            <ShelterCard name="Shelter a" />
            <ShelterCard name="Shelter a" />

        </div>
      </div>

      <Footer />
    </>
  );
}
