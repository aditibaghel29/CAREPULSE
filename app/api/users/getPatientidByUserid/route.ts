// route.ts (for Next.js 13+ using the `app/` directory)
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Patient from '@/models/Patient';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const userid = searchParams.get('userid'); // Get the userid from the query parameters

  if (!userid) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    await dbConnect(); // Ensure DB connection
    const patient = await Patient.findOne({ userid }); 

    if (patient) {
      
      return NextResponse.json({ patient }); 
    } else {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to fetch patient:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
