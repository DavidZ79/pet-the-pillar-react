import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";

import '../pagecss/signuppage.css';

import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <body>
      {/* header */}

      <div className="main">
        <Card>
          <p className="signup-text">Sign Up</p>

          <Link to="/signup_seeker">
            <Button className="signup-btn">
              As a Pet Seeker
            </Button>
          </Link>

          <Link to="/signup_shelter">
            <Button className="signup-btn">
              As a Pet Shelter
            </Button>
          </Link>
        </Card>
      </div>

      <Footer />
    </body>
  );
}
