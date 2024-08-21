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
import {Appointment} from '../../types/appwrite.types'


export type TableColumnData = {
  _id:string
  ID: string;
  patientName: string;
  status: Status;
  schedule: Date;
  primaryPhysician: string;
  patientid: string;
  userid: string;
  appointment: Appointment;
  reason:string
};

export const columns:

ColumnDef<TableColumnData>[] = [


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
        // <div className=" flex items-center gap-3">
        //   <Image
        //     src={doctor?.image!}
        //     alt={doctor.name!}
        //     width={100}
        //     height={100}
        //     className=" size-8 "
        //   />
        //   <p className=" wqhitespace-nowrap ">Dr.{doctor?.name}</p>
        // </div>
        <div className=" flex items-center gap-3">
        {doctor ? (
          <>
            <Image
              src={doctor.image}
              alt={`Dr. ${doctor.name}`}
              width={100}
              height={100}
              className=" size-8 "
            />
            <p className=" wqhitespace-nowrap ">Dr. {doctor.name}</p>
          </>
        ) : (
          <p>Doctor not found</p>
        )}
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
      console.log(data);
      
      return (
        <div className=" flex gap-1 ">
          <AppointmentModal
            type="schedule"
            patientId={data.patientid}
            userId={data.userid}
            appointment={data}
           />

          <AppointmentModal
            type="cancel"
            patientId={data.patientid}
            userId={data.userid}
            appointment={data}
           
          />
        </div>
      );
    },
  },
];
