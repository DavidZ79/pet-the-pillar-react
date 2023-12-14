import Header from "../components/Header";
import Footer from "../components/Footer";
import ShelterCard from "../components/ShelterCard";

import styles from "../pagecss/shelterlistpage.module.css";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ShelterListPage() {
  const { id } = useParams();
  const [shelterList, setShelterList] = useState([]);

  useEffect(() => {
    const fetchShelterList = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/account/all/shelter/`, {
          method: 'GET',
          headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch pet details');
        }
  
        const responseData = await response.json();
        const tempData = {
          "count": responseData.count,
          "next": responseData.next,
          "previous": responseData.previous,
          "results": responseData.results
        }
        setShelterList(tempData); // Update the state with fetched details
      } catch (error) {
        console.error('Error fetching pet details:', error);
        // Handle error, e.g., redirect to an error page
      }
    };
  
    fetchShelterList();
  }, [id]);

  return (
    <>
      <Header />
        <div className={styles.main}>
          <p className={styles.title}>
            List of all shelters
          </p>

          <div className={styles.card_container}>
            {shelterList.results &&
              shelterList.results.map((shelterResult, index) => (
                <ShelterCard key={shelterResult.id} props={shelterResult} />
              ))}
          </div>
          
        </div>

      <Footer />
    </>
  );
}
