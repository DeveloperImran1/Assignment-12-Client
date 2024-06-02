import TouristProfile from "../../../Components/TouristProfile";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
    const {user}= useAuth();
    return (
        <div>
            <TouristProfile></TouristProfile>
        </div>
    );
};

export default MyProfile;