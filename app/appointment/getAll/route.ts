import AppointmentModel from "@/models/Appointment";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(request: Request) {
  try {
    dbConnect();
    const appointments = await AppointmentModel.find().sort({createdAt:-1});
    // .lean(); // Optionally add lean() for better performance if you don't need full Mongoose documents


    if (!appointments || appointments.length === 0) {
      return NextResponse.json(
        { success: false, message: "No appointments found" },
        { status: 404 }
      );
    }
      

    // console.log(" all the appointmet that we are getting is  ",appointments);

    // Count the number of scheduled,pending, and canceled appointments
    const scheduledCount = appointments.filter(appointment => appointment.status === 'scheduled').length;
    const pendingCount = appointments.filter(appointment => appointment.status === 'pending').length;
    const cancelledCount = appointments.filter(appointment => appointment.status === 'cancelled').length;

    console.log("All appointments fetched from MongoDB:", appointments);
    console.log("count of scheduled appoitnm,ent",scheduledCount),
    console.log("count of pending appoitnm,ent",pendingCount),
    console.log("count of cancelled appoitnm,ent",cancelledCount);

    return NextResponse.json({
      success: true,
      appointments,
      counts: {
        scheduled: scheduledCount,
        pending: pendingCount,
        cancelled: cancelledCount
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching all appointment details:",  error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
