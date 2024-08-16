// pages/api/users/get/[userid].ts

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userid: string } }) {
  console.log("GET request received with userid:", params.userid);
  await dbConnect();
console.log("Database connected successfully");

  const { userid } = params;
  console.log("User ID inside users get user", userid);

  try {
    const user = await UserModel.findById(userid);
     
    console.log("****************************")
    console.log("User that we are getting is ", user);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      user
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
