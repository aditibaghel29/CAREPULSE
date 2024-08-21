
import { NextResponse, NextRequest } from "next/server";
import dbConnect from '@/lib/dbConnect';

import AppointmentModel from "@models/Appointment";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { appointmentId, appointment} = body; 

    // Connect to the database
    await dbConnect();

    console.log("Appointment ID inside update:", appointmentId);
    console.log("Appointment data inside update:", appointment);

   
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      appointmentId, 
      { $set: appointment }, 
      { new: true } 
    );


    if (!updatedAppointment) {
      return NextResponse.json({ success: false, message: 'Appointment not found' }, { status: 404 });
    }
    revalidatePath('/admin');
    
    // sms notification
    
    return NextResponse.json({ success: true, data: updatedAppointment }, { status: 200 });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ success: false, message: 'Error updating appointment' }, { status: 500 });
  }
}
