import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";

import styles from "../pagecss/fallback.module.css";

export default function FallBack() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // prev page
  };

  return (
    <body>
      <Header />

      <div className={styles.container}>
        <h1>Page Not Found</h1>
        <h4>Sorry, the page you are looking for doesn't exist.</h4>
        <Button onClick={goBack}>
          Go Back
        </Button>
      </div>

      <Footer />
    </body>
  );
}
