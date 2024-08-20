

import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Patient interface extending Document
// export interface Patient extends Document {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   birthDate: Date;
//   gender: "Male" | "Female" | "Other";
//   address: string;
//   occupation: string;
//   emergencyContactName: string;
//   emergencyContactNumber: string;
//   primaryPhysician: string;
//   insuranceProvider: string;
//   insurancePolicyNumber: string;
//   allergies?: string;
//   currentMedication?: string;
//   familyMedicalHistory?: string;
//   pastMedicalHistory?: string;
//   identificationType?: string;
//   identificationNumber?: string;
//   identificationDocument?: string;
// //   identificationDocument?: File[];
//   treatmentConsent: boolean;
//   disclosureConsent: boolean;
//   privacyConsent: boolean;
//   userid:string;
// }

// Define the Patient schema
const PatientSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    // unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+\d{10,15}$/, 'Invalid phone number'],
  },
  birthDate: {
    type: Date,
    required: [true, "Birth date is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["Male", "Female", "Other"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: 5,
    maxlength: 500,
  },
  occupation: {
    type: String,
    required: [true, "Occupation is required"],
    minlength: 2,
    maxlength: 500,
  },
  emergencyContactName: {
    type: String,
    required: [true, "Emergency contact name is required"],
    minlength: 2,
    maxlength: 50,
  },
  emergencyContactNumber: {
    type: String,
    required: [true, "Emergency contact number is required"],
    match: [/^\+\d{10,15}$/, 'Invalid phone number'],
  },
  primaryPhysician: {
    type: String,
    required: [true, "Primary physician is required"],
    minlength: 2,
  },
  insuranceProvider: {
    type: String,
    required: [true, "Insurance provider is required"],
    minlength: 2,
    maxlength: 50,
  },
  insurancePolicyNumber: {
    type: String,
    required: [true, "Insurance policy number is required"],
    minlength: 2,
    maxlength: 50,
  },
  allergies: {
    type: String,
    default: '',
  },
  currentMedication: {
    type: String,
    default: '',
  },
  familyMedicalHistory: {
    type: String,
    default: '',
  },
  pastMedicalHistory: {
    type: String,
    default: '',
  },
  identificationType: {
    type: String,
    default: '',
  },
  identificationNumber: {
    type: String,
    default: '',
  },
  identificationDocument: {
    type: String,
    default:'',
  },
  treatmentConsent: {
    type: Boolean,
    required: [true, "Treatment consent is required"],
    default: false,
  },
  disclosureConsent: {
    type: Boolean,
    required: [true, "Disclosure consent is required"],
    default: false,
  },
  privacyConsent: {
    type: Boolean,
    required: [true, "Privacy consent is required"],
    default: false,
  },
  userid:{
   
      type:String,
      required: [true, "User id  chaiye h"],
  
  }
  
}, {
  timestamps: true,
});

// const PatientModel = mongoose.models.Patient || mongoose.model<Patient>('Patient', PatientSchema);
const PatientModel = mongoose.models.Patient || mongoose.model<RegisterUserParams >('Patient', PatientSchema);


export default PatientModel;