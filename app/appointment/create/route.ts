
import AppointmentModel from "@/models/Appointment";


import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
export async function POST(request: Request) {
  try {
    
    dbConnect();
    const appointmentData = await request.json();
    
    console.log("Appointment data received in the backend:", appointmentData);
    
    const newAppointment = new AppointmentModel({
      userid:appointmentData.userid,
      patientid: appointmentData.patientid, 
      primaryPhysician: appointmentData.primaryPhysician, 
      schedule: new Date(appointmentData.schedule), // Convert string to Date object
      reason: appointmentData.reason,
      status: appointmentData.status, 
      note: appointmentData.note,
      patientName:appointmentData.patientName
    });

    console.log("Data before saving into MongoDB:", newAppointment);

    // Save the new appointment to MongoDB
    await newAppointment.save();
    console.log("Appointment saved successfully.");

    return NextResponse.json({ success:true,newAppointment}, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ success:false }, { status: 500 });
  }
}
