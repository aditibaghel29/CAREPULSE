// lib/actions/patient.actions.ts


import UserModel from "@models/User";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

export async function createUser(userData: { name: string; email: string; phone: string }){
  try {
    console.log("user data ki value function ke ander",userData);
    const response = await axios.post("/api/users/create", userData);
    console.log("api se jo response aya h",response);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}




// export async function getUser(userId: string) {
//   try {
//     const user = await UserModel.findById(userId);  // Use `findById` instead of `findOne` for better performance and clarity
//     if (!user) {
//       throw new Error("User not found");
//     }

//   return user;
    
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw error;
//   }
// }

