

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRoleCollect from "../hooks/useRoleCollect";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return <div className="flex justify-center items-center flex-col min-h-[calc(100vh-116px)]">
            <ScaleLoader size={100} color='#F92FD3' ></ScaleLoader>
        </div>
    }

    if (user) {
        return children;
    }
    toast.error("Please Before Login now!")
    return  <Navigate to="/login" state={location.pathname} ></Navigate>
};

export default PrivateRoute;