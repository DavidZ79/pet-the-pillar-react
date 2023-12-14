import { Link } from "react-router-dom";
import Button from "../components/Button";

import Footer from "../components/Footer";
// import Card from '../components/Card';
// import Button from '../components/Button';
import "../pagecss/landingpage.css";
import Header from "../components/Header";

import banner_pic from "../landing_page_images/banner_pic.png";
import red_cloth_dog from "../landing_page_images/red-cloth-dog.jpg";
import shelter_dog from "../landing_page_images/shelter-dog.jpg";

export default function LandingPage() {
  return (
    <>
      <Header />
      <div class="main">
        <div class="banner">
          <div class="LHScontainer">
            <div class="LHSbanner">
              <h1 id="find">Find a Friend Today!</h1>
              <h2 id="browse">Browse Pets in your area</h2>
            </div>
          </div>
          <div class="RHScontainer">
            <img id="banner_img" src={banner_pic} alt="Dog and Cat" />
          </div>
        </div>

        <div class="body">
          <h1 id="why">Why PetPals?</h1>
          <div class="card_pair">
            <div class="card">
              <h2>Meet a pet</h2>
              <h4>
                A pet can change your life! Sometimes, all we need is a friend
                by our side to keep us company.
              </h4>
              <Link to="/signup_before">
                <Button className="btn">Sign Up</Button>
              </Link>
            </div>
            <div class="card">
              <h2>Lend a hand</h2>
              <h4>
                Many pet shelters are reaching capacity, and require assistance
                from the community for love and support!
              </h4>
              <Link to="/shelter_list">
                <Button className="btn">Shelter List</Button>
              </Link>
            </div>
          </div>
        </div>

        <div class="bottom">
          <div class="bot_container_1">
            <img class="bot-dogs" src={red_cloth_dog} alt="Red Cloth" />
            <div class="text-container_1">
              <h2>Saving Lives</h2>
              <h4>
                One of the most significant benefits of pet adoption is that it
                saves the lives of animals that might otherwise be euthanized
                due to overcrowded shelters or limited resources. By adopting a
                pet, you are giving an animal a second chance at life and
                providing them with a loving and caring home.
              </h4>
            </div>
          </div>
          <div class="bot_container_2">
            <div class="text-container_2">
              <h2>Variety of Pets</h2>
              <h4>
                You can find a wide variety of pets available for adoption,
                including dogs, cats, rabbits, birds, reptiles, and more. Many
                different breeds and mixed-breed animals are also available, so
                you can often find a pet that suits your lifestyle and
                preferences.
              </h4>
            </div>
            <img class="bot-dogs" src={shelter_dog} alt="Shelter Dog" />
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
