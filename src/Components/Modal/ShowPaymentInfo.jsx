import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SeactionTitle from "../SeactionTitle";
import { format } from "date-fns";


const ShowPaymentInfo = ({ closeModal, isOpen, setOpenModal, spot }) => {
    console.log(spot)

    const axiosSecure = useAxiosSecure();

    const { data: paymentData = {} } = useQuery({
        queryKey: ['paymentData', spot],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentInfo/${spot?._id}`)
            return res.data;
        }
    })
    console.log(paymentData)

    return (
        <div className="mx-auto w-fit bg-[#e3f5ff]">

            <div
                onClick={closeModal}
                className={`fixed z-[100] flex items-center justify-center ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}
            >
                <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute max-w-md rounded-lg bg-[#e3f5ff] p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${isOpen ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
                    <SeactionTitle name="Payment" title="My Payment Information" ></SeactionTitle>

                    <div className="space-y-[10px]" >
                        <img className="w-[100%] h-[150px] rounded-xl " src={spot?.spotPhoto?.[0]} alt="" />
                        <p className="text-[17px] font-semibold my-5" >Spot Title: {spot?.tripTitle} </p>
                        <p className="text-[17px] " >Cart Id: {paymentData?.cartIds} </p>
                        <p className="text-[17px] " >Transaction Id: {paymentData?.transactionId} </p>
                        <p className="text-[17px] " >Email: {paymentData?.email} </p>
                        <p className="text-[17px] " >Amount: {paymentData?.price} </p>
                        {
                            paymentData?.date && <p className="text-[17px] " >Date:  {format(new Date(paymentData?.date), 'P')} </p>
                        }

                    </div>
                    <button  onClick={closeModal} className="rounded-md w-full border mt-[18px] border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white">
                        Close
                    </button>

                </div>
            </div>
        </div>
    );
}
export default ShowPaymentInfo;

