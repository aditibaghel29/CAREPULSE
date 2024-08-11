"use client";
import AppointmentForm from "@/components/forms/AppointmentForm";
import Image from "next/image";
import { useParams, useSearchParams } from 'next/navigation';

export function NewAppointment({ params: { userid } }: { params: { userid: string } }) {
    // const {patientid}=useSearchParams();
  console.log("Patient ID inside the new appointment page:", userid);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm 
            type="create"
            userid={userid}
          />

          <p className="copyright mt-10 py-12">
            © 2024 CarePulse
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}

export default NewAppointment;
