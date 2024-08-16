import PatientModel from "@/models/Patient";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id: patientid } = params;

    console.log("patientid in API handler:", patientid);
    

    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&**************************************************########@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log("patientid in API handler:", patientid); // In the API handler

    if (!patientid) {
      return NextResponse.json(
        { success: false, message: "Missing patient ID" },
        { status: 400 }
      );
    }

    // Fetch the patient details from MongoDB
    const patient = await PatientModel.findById(patientid);

    if (!patient) {
      return NextResponse.json(
        { success: false, message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, patient }, { status: 200 });
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
