/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "Male" | "Female" | "Other";
  declare type Status = "pending" | "scheduled" | "cancelled";
  
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }
  declare interface User extends CreateUserParams {
    // $id: string;
    _id: string;

  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    userid: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies?: string;
    currentMedication?: string;
    familyMedicalHistory?: string;
    pastMedicalHistory?: string;
    identificationType?: string;
    identificationNumber?: string;
    identificationDocument?: string ; 
    privacyConsent: boolean;
  
  }
  
  declare type CreateAppointmentParams = {
    primaryPhysician: string;
    schedule: Date;
    reason: string;
    note: string ;
    userId: string;
    patientId: string;
    status: Status;
    cancellationReason:string |null
  };
  
  declare type UpdateAppointmentParams = {
    appointmentId: string;
    userId: string;
    appointment: Appointment;
    type: string;
  };


  