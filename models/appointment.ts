import mongoose, { Document, Schema } from "mongoose";

// Define the Appointment interface extending Document
export interface Appointment extends Document {
  patient: mongoose.Types.ObjectId;
  primaryPhysician: string;
  schedule: Date;
  reason: string;
  status: "scheduled" | "completed" | "cancelled" | "created";
  note: string;
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
    enum: ["scheduled", "completed", "cancelled", "created"],
    default: "created",
  },
  note: {
    type: String,
    default: "",
  }
});

// Create the Appointment model
const AppointmentModel = mongoose.models.Appointment || mongoose.model<Appointment>('Appointment', AppointmentSchema);

export default AppointmentModel;
