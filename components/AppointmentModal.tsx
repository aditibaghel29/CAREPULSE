// // "use client";

// // 

// // import { Button } from "@/components/ui/button";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { Appointment } from "@/types/appwrite.types";

// // import { AppointmentForm } from "./forms/AppointmentForm";

// // import "react-datepicker/dist/react-datepicker.css";

// // export const AppointmentModal = ({
// //   patientId,
// //   userId,
// //   appointment,
// //   type,
// // }: {
// //   patientId: string;
// //   userId: string;
// //   appointment?: Appointment;
// //   type: "schedule" | "cancel";
// //   title: string;
// //   description: string;
// // }) => {
// //   

// //   return (
// //     <Dialog open={open} onOpenChange={setOpen}>
// //       <DialogTrigger asChild>
// //         <Button
// //           variant="ghost"
// //           className={`capitalize ${type === "schedule" && "text-green-500"}`}
// //         >
// //           {type}
// //         </Button>
// //       </DialogTrigger>
// //       <DialogContent className="shad-dialog sm:max-w-md">
// //         <DialogHeader className="mb-4 space-y-3">
// //           <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
// //           <DialogDescription>
// //             Please fill in the following details to {type} appointment
// //           </DialogDescription>
// //         </DialogHeader>

// //         <AppointmentForm
// //           userId={userId}
// //           patientId={patientId}
// //           type={type}
// //           appointment={appointment}
// //           setOpen={setOpen}
// //         />
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// "use client"
// import React from 'react'

//   import { useState } from 'react';
//   import { Button } from './ui/button';
// const AppointModal = ({
//     type,
// patientId,
// userId,
// // appointment,

// }:{
//     // type:'schedule':'cancel',
//     patientId:string,
//     userId:string,
//     // appointment?:Appointment
// }) => {

//     const [open ,setOpen]=useState(false);
//   return (
    
//         <Dialog open={open} onOpenChange={setOpen}>
//     <DialogTrigger asChild>


//     </DialogTrigger>




//       {/* <AppointmentForm
//       userId={userId}
//       patientId={patientId}
//       typr={type}
//     appointment={appointment}
//     setOpen={setOpen}

//       /> */}
//     </DialogContent>
//   </Dialog>
 
//   )
// }

// export default AppointModal


"use client"
import React from 'react'
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';
import AppointmentForm from './forms/AppointmentForm';
const AppointmentModal = ({
    type,
    patientId,
    userId,
    // appointmentId
    
}:{
    type:'schedule' | 'cancel',
    patientId:string,
    userId:string,
    // appointmentId?:Appointment
}) => {
    const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
            <Button variant="ghost" className={`capitalize ${type ==='schedule' && 'text-green-500'}`}>
 {type}

        </Button>

    </DialogTrigger>
        <DialogContent className=' shad-dialog sm:max-w-md '>       <DialogHeader className=' mb-4 space-y-3 '>
        <DialogTitle>{type} Appointment</DialogTitle>


        <DialogDescription>
        Please fill in the following details to {type} an appointment
        </DialogDescription>
      </DialogHeader>

<AppointmentForm

// userid={userId}
// patientId={patientId}
// type={type}
// appointment={appointment}
// setOpen={setOpen}



/>



    </DialogContent>
  </Dialog>
  
  )
}

export default AppointmentModal