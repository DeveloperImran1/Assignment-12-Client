// CheckOutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckOutForm = ({ spot, refetch, closeModal }) => {
    const stripe = useStripe();
    const elements = useElements()
    const [error, setError] = useState('')
    const [transactionId, setTransactionId] = useState('')

    // CheckOutForm.jsx
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState('')
    const axiosSecure = useAxiosSecure();
    const totalPrice = spot?.packagePrice;
    console.log(totalPrice)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('Payment error', error)
            setError(error.message)
        }
        else {
            console.log('Payment method', paymentMethod)
            setError('')
        }


        // payment er main kaj 
        // CheckOutForm.jsx er handleSubmit() er moddhe
        //  confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log("Confirm error")
        }
        else {
            console.log('Payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('Transiction id', paymentIntent.id)
                setTransactionId(paymentIntent.id)

                // payment successfully hole payment er all information gulo DB te add korbo
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),  // utc date convert. use moment js to 
                    cartIds: spot?._id,
                    //    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                console.log(payment)

                const res = await axiosSecure.post('/payments', payment)
                console.log("Payment saved", res.data)
                toast.success('Successfully Payment!')
                refetch()
                console.log(refetch)

                event.target.reset()
                closeModal()

            }
        }



    }
    return (
        <div className="" >

            <form onSubmit={handleSubmit}>
                <CardElement
                    className="w-full bg-white p-2 rounded-md"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            }
                        }
                    }}

                > </CardElement>
                <div className="flex justify-between items-center" >

                    <button type="submit" disabled={!stripe} className="me-2 my-5 rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-[6px] text-white">
                        Pay
                    </button>
                    <button onClick={closeModal} className="rounded-md border  bottom-9 border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white">
                        Close
                    </button>
                </div>
                <p className="text-red-500" >{error}</p>

                {
                    transactionId && <p className="text-green-500" >Your Transaction Id: {transactionId}</p>
                }

            </form>
        </div>
    );
};

export default CheckOutForm;