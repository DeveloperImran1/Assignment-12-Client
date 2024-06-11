
import Payment from '../../Pages/DashboardPage/TouristDashboard/Payment';


import { useState } from 'react';
import SeactionTitle from '../SeactionTitle';

const Modal1 = ({ closeModal, isOpen, setOpenModal, spot, refetch }) => {

    return (
      <div className="mx-auto w-fit bg-[#e3f5ff]">

        <div
          onClick={closeModal} 
          className={`fixed z-[100] flex items-center justify-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
        >
          <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute max-w-md rounded-lg bg-[#e3f5ff] p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${isOpen ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>      

            <Payment spot={spot} refetch={refetch} closeModal={closeModal}></Payment>


        
          </div>
        </div>
      </div>
  );
}
export default Modal1;

