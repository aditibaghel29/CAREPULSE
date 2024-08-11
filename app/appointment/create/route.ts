import AppointmentModel from "@/models/Appointment"; // Ensure this path is correct
import { NextResponse } from "next/server";
// Example route handler
export async function POST(request: Request) {
  try {
    // Parse incoming JSON data
    const appointmentData = await request.json();
    console.log("Appointment data received in the backend:", appointmentData);

    // Validate and format data
    const newAppointment = new AppointmentModel({
      patient: appointmentData.patient, // Make sure this field exists in your schema
      primaryPhysician: appointmentData.primaryPhysician, // Ensure this field is correct
      schedule: new Date(appointmentData.schedule), // Convert string to Date object
      reason: appointmentData.reason,
      status: appointmentData.status, // Ensure this value is among the enum values
      note: appointmentData.note,
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
