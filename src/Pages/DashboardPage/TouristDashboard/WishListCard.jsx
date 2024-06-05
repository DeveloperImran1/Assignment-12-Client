import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { MdArrowOutward } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useMyTotalWishList from "../../../hooks/useMyTotalWishList";

const WishListCard = ({ wishList, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const {refetch: wishListRefetch} = useMyTotalWishList()

    const handleRemove = (id)=> {
        axiosSecure.delete(`/deleteWishList/${id}`)
        .then(res => {
            console.log(res.data)
            if(res.data.deletedCount){
                refetch()
                wishListRefetch()
                toast.success('Successfully Removed in Wishlist!')
            }
        })
    }


    return (
        <div>

    

            <div className=" space-y-4 flex flex-col relative  p-3 shadow-lg  w-[300px] mx-auto group transition border-2 rounded-xl hover:scale-105 border-primary hover:border-secondary border-opacity-30 hover:no-underline focus:no-underline ">
                <div className="relative">
                    <img alt="card navigate ui" className="w-full h-[180px] object-cover  rounded-xl " src={wishList?.spot?.spotPhoto?.[0] || 'https://i.ibb.co/HNBKkP9/get-best-photos-in-halong-seaplane1.jpg' } />
                    <div className="bg-blue-400 absolute text-[20px] font-normal text-center left-0 top-0 px-2  rounded-r-full ">{wishList?.spot?.tourType}</div>
                </div>
                <div className="grid gap-2 justify-start text-start">
                    <h1 className="text-[20px] font-semibold text-[#131313] ">{wishList?.spot?.tripTitle}</h1>
                
                </div>
                <div className=" flex text-[20px] text-[#131313CC] font-semibold justify-between w-full">
                        <p>$ {wishList?.spot?.price}</p>
                      <Link to={`/spot/${wishList?.spot?._id}`} className="bg-[#4a00ff] p-2 rounded-md" >
                      <MdArrowOutward size={22} className="text-[#ff00d3] font-bold" ></MdArrowOutward>
                      </Link>
                    </div>
                <div onClick={()=> handleRemove(wishList?._id)}
                    className='bg-primary p-3 ml-5 rounded-full absolute  -top-5 -right-5 hover:bg-secondary group   cursor-pointer hover:scale-105 '>
                    <MdDeleteForever size={20} className='text-secondary group hover:text-primary' />
                </div> 



            </div>
        </div>
    );
};

export default WishListCard;