import Slider from "../Componet/Slider";
import HomeAboutUS from "../Componet/Homeaboutus";
import Example from "../Componet/Registration";
import HomeChooseUs from "../Componet/HomecooeUs";
import { useAuth } from "../contexts/AuthContext"; // Import the Auth context
import '../css files/Home.css'
function Home() {
  const auth = useAuth(); // Get the auth state

  return (
    <>
      <Slider />
      <HomeAboutUS />
      {/* Only show Example if the user is not authenticated as a student or recruiter */}
      {!auth.isAuthenticated && !auth.isRecruiterAuthenticated && <Example />}
      <HomeChooseUs />
    </>
  );
}

export default Home;
