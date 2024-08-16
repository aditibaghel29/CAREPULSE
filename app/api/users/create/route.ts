import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  
  try {
    const { name, email, phone } = await request.json();


    console.log("Data received at API:", { name, email, phone }); 


    const existingUserByEmail = await UserModel.findOne({ email });  
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "User is already registered",
        },
        { status: 400 }
      );
    }

    const newUser = await UserModel.create({
      name,
      email,
      phone,  
    });


    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        newUser,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error while registering:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Registration failed",
      },
      { status: 500 }
    );
  }
}
