import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
    const {user}= useAuth();
    return (
        <div>
            <p className="" >My profile page</p>
        </div>
    );
};

export default MyProfile;