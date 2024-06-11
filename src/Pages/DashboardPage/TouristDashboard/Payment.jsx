import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SeactionTitle from '../../../Components/SeactionTitle';
import CheckOutForm from './CheckOutForm';
// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = ({ spot, refetch, closeModal }) => {
    return (
        <div>
            <SeactionTitle name="Payment" title="Give your card Info" ></SeactionTitle>
            <div className='flex justify-between items-center mb-7' >

                <img className='w-[200px] h-[103px] rounded-lg' src="https://i.ibb.co/dG8nDT8/Mastercard-Symbol.jpg" alt="" />
                <img className='w-[300px] h-[150px] object-cover' src="https://i.ibb.co/kJ3FNGr/visa-payment-card1873-removebg-preview-1.png" alt="" />
            </div>

            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm spot={spot} refetch={refetch} closeModal={closeModal} ></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;