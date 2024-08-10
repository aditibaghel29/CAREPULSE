import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:{params:{userid:string}}) {
  await dbConnect();
  const { userid } = params; // Fetching userid from dynamic route

  console.log("User ID inside the backend part is", userid);

  try {
    
    const user = await UserModel.findById(userid);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
