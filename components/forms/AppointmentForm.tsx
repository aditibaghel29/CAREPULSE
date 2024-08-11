"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { CreateAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";
import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import { FormFieldType } from "./PatientForm";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";

const AppointmentForm = ({ type, userid }: { userid: string; type: "create" | "cancel" | "schedule"; }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),  
      reason: "",
      note: "",
      cancellationReason: ""
    },
  });

  async function onSubmit(values: z.infer<typeof CreateAppointmentSchema>) {
    console.log("Form values:", values);
    console.log("Patient ID being submitted:", userid);
    setIsLoading(true);
    
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      case "create":
        status = "created";
        break;
      default:
        status = "pending";
    }
  
    try {
      if (type === "create" && userid) {
        const appointmentData = {
          patient: userid,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };
        console.log("Appointment data before passing to the backend:", appointmentData);
  
        const response = await axios.post(`/appointment/create`, appointmentData);
  
        if (response.data.success) {
          form.reset();
          toast.success("Appointment granted");
          router.replace(`/patient/${userid}/new-appointment/success?appointmentId=${response.data._id}`);
        } else {
          toast.error(response.data.message || "An error occurred");
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      if (axios.isAxiosError(error)) {
        console.log("Axios error details:", error.response);
        toast.error(error.response?.data.message || "appointment failed");
      } else {
        toast.error("Appointment failed");
      }
    } finally {
      setIsLoading(false);
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
      buttonLabel = "Create Appointment";  // Corrected typo
      break;
    default:
      buttonLabel = "Submit Appointment";  // Corrected typo
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className=" mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment in 1 minute</p>
        </section>

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
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm;
