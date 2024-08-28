"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Script from 'next/script';
 import toast from 'react-hot-toast';

declare global{
  interface Window{
    Razorpay:any;
  }
}
 const PaymentButton = () => {
  const Amount=500;
  const [loading, setLoading] = useState(false);
  const handlePayment = async () => {
    setLoading(true);

    try {
      // Step 1: Create order on the backend
      const response = await axios.post('/payments/create-order');
      const data=response.data.order;
      console.log("data inside the checkout page is after making a request to create-order route",data);
      // Step 2: Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: data.amount,
        currency: data.currency,
      
        name: 'Appointment Booking',
        description: 'Test transaction for Booking Appointment',
        order_id: data.id,
        handler: function (response:any)  {
          // Handle payment success
          console.log("response in checkout",response);
          toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Step 3: Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment:', error);
    } finally{

      setLoading(false);
    }

  };

  return (
 

  <>
  <Script src="https://checkout.razorpay.com/v1/checkout.js" />
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Make a Payment</h1>
      <p className="text-center text-lg text-gray-600 mb-4">Amount to pay: <span className="font-bold text-black">₹{Amount}</span></p>
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        {loading ? 'Processing...' : 'Pay with Razorpay'}
      </button>
      <p className="text-center text-sm text-gray-500 mt-4">Powered by <span className="text-blue-600">Razorpay</span></p>
    </div>
  </div>
</>
  );
};

export default PaymentButton;
