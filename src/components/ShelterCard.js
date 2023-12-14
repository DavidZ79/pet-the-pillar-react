import Button from "./Button";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "../css/ShelterCard.module.css";

export default function ShelterCard(props) {


  return (
    <>
        <div className={styles.sheltercard}>
            <h2>{props.name}</h2>
            <img src={props.image} alt="Shelter" />
            <Button className="shelter-btn" >View Shelter</Button>
        </div>
    </>
  );
}
