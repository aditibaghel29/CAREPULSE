import mongoose, { Document, Schema } from "mongoose";

// Define the Appointment interface extending Document
export interface Appointment extends Document {
  user: mongoose.Types.ObjectId;
  patient: mongoose.Types.ObjectId;
  primaryPhysician: string;
  schedule: Date;
  reason: string;
  status: "scheduled" | "cancelled"|"pending";
  note: string;
  patientName:string;
}

// Define the Appointment schema
const AppointmentSchema: Schema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  primaryPhysician: {
    type: String,
    required: true,
  },
  schedule: {
    type: Date,
    required: [true, "Appointment date is required"],
  },
  reason: {
    type: String,
    required: [true, "Reason for appointment is required"],
  },
  status: {
    type: String,
    enum: ["scheduled", "cancelled", "pending"],
    default: "created",
  },
  note: {
    type: String,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patientName:{
    type:String,
    required: true,
  }
});

// Create the Appointment model
const AppointmentModel = mongoose.models.Appointment || mongoose.model<Appointment>('Appointment', AppointmentSchema);

export default AppointmentModel;
