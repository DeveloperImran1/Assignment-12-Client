import { NavLink } from "react-router-dom";

const SidebarButton = ({ path, icon: Icon, name, color, myTotalBooking, myTotalWishList }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5 rounded-lg  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
        }`
      }
    >
      <Icon className={`${color} w-5 h-5`} />

      <div className="relative" >
        <span className='mx-4 font-medium'>{name}</span>
        {
          myTotalBooking && <div className="badge badge-secondary">+{myTotalBooking}</div>
        }
        {
          myTotalWishList && <div className="badge badge-secondary">+{myTotalWishList}</div>
        }

      </div>

    </NavLink>
  );
};

export default SidebarButton;