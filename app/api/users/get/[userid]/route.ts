

import dbConnect from "@/lib/dbConnect";
import UserModel from "@models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userid: string } }) {
 
  await dbConnect();
  const { userid } = params;


  try {
    const user = await UserModel.findById(userid);
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
