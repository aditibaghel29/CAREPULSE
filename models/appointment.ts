import mongoose, { Document, Schema } from "mongoose";



const AppointmentSchema: Schema = new mongoose.Schema({
  patientid: {
    type: String,

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
  userid: {
    type: String,

    
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  cancellationReason: {
    type: String,
  },
});

// Create the Appointment model
const AppointmentModel =
  mongoose.models.Appointment ||
  mongoose.model<CreateAppointmentParams>("Appointment", AppointmentSchema);

export default AppointmentModel;
