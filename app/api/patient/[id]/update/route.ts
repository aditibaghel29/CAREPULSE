import dbConnect from "@/lib/dbConnect";
import Patient from "@/models/Patient";

import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { identificationDocument } = await request.json();
    console.log('Received identificationDocument:', request.body.identificationDocument);
    if (typeof identificationDocument !== 'string') {
        throw new Error('Invalid data type for identificationDocument');
      }
    await dbConnect();
    const updatedPatient = await Patient.findByIdAndUpdate(id, { identificationDocument }, { new: true });

    return NextResponse.json({ success: true, updatedPatient });
  } catch (error) {
    console.error('Error during patient update:', error);
    return NextResponse.json({ success: false, error: 'Patient update failed' }, { status: 500 });
  }
}
