import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";

const Main = () => {
    return (
        <div className="lato" >
            <Navbar></Navbar>
            <div className='max-w-[98%] lg:max-w-[95%] mx-auto my-8'>
                <Outlet></Outlet>
            </div>

            <h1>Footer</h1>
        </div>
    );
};

export default Main;