"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/app/lib/utils";
import AppointmentModal from "../AppointmentModal";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export interface AppointmentType {
//   _id: string;
//   note?: string;
//   patientName: string;
//   patient: string;
//   primaryPhysician: string;
//   reason: string;
//   schedule: string;
//   status: string;
//   cancellationReason: string;
// }
export type TableColumnData = {
  id: string;
  patientName: string;
  status: Status;
  schedule: string;
  primaryPhysician: string;
  patientid: string;
  userid: string;
  // appointmment: AppointmentType;
};

export const columns:

ColumnDef<TableColumnData>[] = [

// export const columns = (
//   setAppointments: React.Dispatch<React.SetStateAction<TableColumnData[]>>
// ): ColumnDef<TableColumnData>[] => [
  {
    header: "ID",
    cell: ({ row }) => <p className=" text-14-medium ">{row.index + 1}</p>,
  },

  {
    accessorKey: "patientName",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className=" text-14-medium ">{appointment.patientName}</p>;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className=" min-w-[115px] ">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },

  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px] ">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );

      return (
        <div className=" flex items-center gap-3">
          <Image
            src={doctor?.image!}
            alt={doctor.name!}
            width={100}
            height={100}
            className=" size-8 "
          />
          <p className=" wqhitespace-nowrap ">Dr.{doctor?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    header: () => <div className=" pl-4 ">Actions</div>,

    cell: ({ row: { original: data } }) => {
      console.log("Patient ID inside the columns component:", data.patientid);
      console.log("User ID inside the columns componen:", data.userid);
      console.log(
        "data that we are passsing inside the columns component",
        data
      );
      return (
        <div className=" flex gap-1 ">
          <AppointmentModal
            type="schedule"
            patientId={data.patientid}
            userId={data.userid}
            appointment={data}
            // setAppointments={setAppointments}
          />

          <AppointmentModal
            type="cancel"
            patientId={data.patientid}
            userId={data.userid}
            appointment={data}
            // setAppointments={setAppointments}
          />
        </div>
      );
    },
  },
];
