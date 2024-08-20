import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Patient from '@/models/Patient';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const patientid = searchParams.get('patientid');

  if (!patientid) {
    return NextResponse.json({ error: "Patient ID is required" }, { status: 400 });
  }

  try {
    await dbConnect(); // Ensure DB connection
    const patient = await Patient.findById(patientid); // Fetch the patient by patient ID

    if (patient) {
      console.log("Patient found:", patient);
        
       console.log(patient.userid);
       
      return NextResponse.json({ userid: patient.userid }); // Return the userid
    } else {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to fetch patient ID:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
