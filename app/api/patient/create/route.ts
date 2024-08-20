

import { NextRequest, NextResponse } from "next/server";

import dbConnect from '@/lib/dbConnect';
import  Patient  from "@/models/Patient";
 export async function POST(request: Request) {
    try {
      const { ...patientData } = await request.json();
  
      
      await dbConnect();
      const newPatient = new Patient(patientData);
      await newPatient.save();
  
      return NextResponse.json({ success: true, newPatient });
    } catch (error) {
      console.error('Error during patient creation:', error);
      return NextResponse.json({ success: false, error: 'Patient creation failed' }, { status: 500 });
    }
  }
  