import Button from "./Button";
import { Link } from "react-router-dom";

import styles from "../css/ShelterPetCard.module.css";

export default function ShelterPetCard(props) {
  return (
    <div>
      <div class="tile is-child">
        <div class="card is-hoverable">
          <div class="card-content">
            <div class="media">
              <div className={styles["pet_card"]}>
                <p class="title is-4">{props.petName}</p>
                <img src={props.pfp} className={styles.pet_img} />
                <p class="subtitle is-6">
                  {/* // TODO: needs / at the beginning of the link, see ShelterDashboardPage for example */}
                  <Link to={props.pet_update_page}>
                    <Button>Update</Button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
