import AppointmentModel from "@/models/Appointment"; 
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
  
    const { searchParams } = new URL(request.url);
    console.log("searchParams inside the backend code:", searchParams);
    const appointmentId = searchParams.get("id");
console.log(appointmentId);
    if (!appointmentId) {
      return NextResponse.json(
        { success: false, message: "Missing appointment ID" },
        { status: 400 }
      );
    }

    // Fetch the appointment details from MongoDB
    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      return NextResponse.json(
        { success: false, message: "Appointment not found" },
        { status: 404 }
      );
    }

    console.log("Appointment details fetched from MongoDB:", appointment);

    return NextResponse.json({ success: true, appointment }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointment details:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
