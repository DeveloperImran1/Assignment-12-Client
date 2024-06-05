import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";

const Dashboard = () => {
    return (
        <div className=' lato relative min-h-screen md:flex'>
        {/* Sidebar */}
        <Sidebar />
  
        {/* Outlet --> Dynamic content */}
        <div className='flex-1 md:ml-64'>
          <div className='p-5'>
            <Outlet />
          </div>
        </div>
      </div>
    );
};

export default Dashboard;



