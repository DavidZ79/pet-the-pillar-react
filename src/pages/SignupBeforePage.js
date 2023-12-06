import { Link } from "react-router-dom";

function SignupBeforePage() {
  return (
    <div>
      <div>Are you a seeker or a shelter?</div>
      <Link to="/signup_seeker"><button>seeker</button></Link>  {/* or replace button with custom Button component */}
      <div> </div>
      <Link to="/signup_shelter">shelter</Link>
    </div>
  );
}

export default SignupBeforePage;
