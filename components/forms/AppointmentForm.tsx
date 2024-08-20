"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState, useEffect } from "react";
import {
  
  getAppointmentSchema,
} from "@/lib/validation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import { FormFieldType } from "./PatientForm";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { Appointment } from "../../types/appwrite.types";

const AppointmentForm = ({
  type,
  userid,
  patientid,
  appointment,
  setOpen,
 
}: {
  userid: string;
  patientid: string;
  type: "create" | "cancel" | "schedule";
  setOpen?: (open: boolean) => void;
  appointment?:Appointment;

}) => {

  console.log(userid
    ,patientid,type)
 
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [patientName, setPatientName] = useState<string>("");


  const AppointmentFormValidation = getAppointmentSchema(type);

  console.log("appointment is before the from we want to llllllnow on which appointmnet we arev working may be ",appointment);

  const form = useForm<z.infer<typeof   AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),


  
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: appointment?.cancellationReason ?? undefined,
      patientid: "",
      userid: "",
      patientName: "",
    },

  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/patient/${patientid}`);
        if (response.data.success) {
          setPatientName(response.data.patient.name);
          form.setValue("patientName", response.data.patient.name); // Update form with patient name
        } else {
          toast.error("Failed to fetch patient details");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
        toast.error("Failed to fetch patient details");
      }
      finally
      {
        setLoading(false);
      }
    };

 

    if (patientid) {
      fetchPatientDetails();
    }
  }, [patientid, form]);

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    console.log("Form Submitted", values);
    console.log("submitting")
    setLoading(true);
    let status;

    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
   setLoading(true);
      if (type === "create" && patientid) {
        const appointmentData = {
          userid: userid,
          patientid: patientid,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason,
          note: values.note,
          status,
          patientName,
          cancellationReason: values.cancellationReason ?? null, 
        };

        const response = await axios.post(
          `/appointment/create`,
          appointmentData
        );
        if (response.data.success) {
          form.reset();
          toast.success("Appointment request confirmed.");
          router.replace(
            `/patient/${patientid}/new-appointment/success?appointmentId=${response.data.newAppointment._id}`
          );
        } else {
          toast.error(response.data.message || "An error occurred");
        }
      } else {
       
        const appointmentToUpdate = {
          userid,
          appointmentId: appointment?._id!,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status:status as Status,
            cancellationReason: values.cancellationReason ?? null, 
            reason: values.reason,
          },
          type,
        };

        console.log("appoitmnet to update is ", appointmentToUpdate);
        const updatedAppointment = await axios.post(
          `/appointment/update`,
          appointmentToUpdate
        );
        console.log(
          "Appointment updated successfully: dekh kya update hoke aa rha",
          updatedAppointment.data
        );
        if (updatedAppointment.data.success) {
          setOpen && setOpen(false);
          form.reset();
          toast.success("Appointment updated successfully.");
         
        } else {
          toast.error(
            updatedAppointment.data.message ||
              "An error occurred while updating the appointment"
          );
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Appointment failed");
      } else {
        toast.error("Appointment failed");
      }
    } finally {
      setLoading(false);
    }
  }

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    default:
      buttonLabel = "Submit Appointment";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
   
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">
              Schedule your first appointment in 1 minute
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="dd/MM/yyyy  -  h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Appointment reason"
                placeholder="Reason for appointment"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes"
                placeholder="Prefer afternoon appointments, if possible"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={Loading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
