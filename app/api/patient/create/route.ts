

import { NextRequest, NextResponse } from "next/server";
import cloudinary from '@/lib/cloudinary';
import dbConnect from '@/lib/dbConnect';
import  Patient  from "@/models/Patient";


export  async function POST(request:Request, response:Response) {
  // Server-side
// console.log('Request Body:', req.json);

  // if (req.method === 'POST')
    //  {
    try {
      // const{file}=req.files.file;
      const {  ...patientData } =  await request.json();
      // const {  file } =  req.json();
     
       console.log("patient dtaa that is paasing is",patientData); 
      //  console.log("file that we are  paasing is",file); 
       
      
      // Ensure file is not undefined or null
      // if (!file) {
      //   return NextResponse.json({ success: false, error: 'No file uploaded' },{status:400});
      // }
      console.log("**************************************************************************************************************************************************************************************************")
console.log("upload ke pehle pauch gye h ")
      // Upload the file to Cloudinary
      // const uploadResponse = await cloudinary.uploader.upload(file, {
      //   folder: 'health/patientdocument',
      // });
// // 

      // console.log("uploaded response from cloudinary",uploadResponse);
      // Save the patient data along with the file URL in MongoDB
      await dbConnect();
      const newPatient = new Patient({
        ...patientData,
        // identificationDocumentUrl: uploadResponse.secure_url,
      });

      await newPatient.save();

      return NextResponse.json({ success: true, newPatient },{status:201});
    } catch (error) {
      console.error('Error uploading file:', error);
      console.log("yeha errro aa rha h pta nhai kyu")
      return NextResponse.json({ success: false, error: 'File upload failed' },{status:500});
    }
  } 
  
  // else {
  //   // Handle any other HTTP methods
  //   return NextResponse.json({ success: false, error: 'Method not allowed' },{status:405});
  // }

