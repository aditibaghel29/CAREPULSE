
import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export  async function POST(req: NextRequest, res: NextResponse) {
  

    try {
      const options = {
        amount: 500*100,
        currency: 'INR',
        receipt: `receipt_order_${Date.now()}`,
      };

    const order = await razorpay.orders.create(options);
    console.log("order that we are getting is",order);

     return NextResponse.json({order},{status:200})
    } 
    
      catch (error) {
      console.error('Error creating Razorpay order:', error);
      return NextResponse.json({
error:"error creating order"
      },
    {status:500})
    }
  } 

