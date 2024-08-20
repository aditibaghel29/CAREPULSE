"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { StatCard } from "@/components/StatCard";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";

interface Counts {
  scheduled: number;
  pending: number;
  cancelled: number;
}

const AdminPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [count, setCount] = useState<Counts>({
    scheduled: 0,
    pending: 0,
    cancelled: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/appointment/getAll");
        setAppointments(response.data.appointments);
        setCount(response.data.counts);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);


  console.log("all the appointmnets that we  aree psssing  to the  data table are",appointments)

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/logo-full.svg"
              height={32}
              width={162}
              alt="logo"
              className="h-8 w-fit"
            />
          </Link>
          <p className="text-16-semibold">Admin Dashboard</p>
        </header>

        <main className="admin-main items-center justify-center">
          <section className="w-full space-y-4 text-center">
            <h1 className="header text-5xl">Loading...</h1>
            <p className="text-dark-700 text-3xl">Fetching appointment data...</p>
          </section>
        </main>
      </div>
    );
  }

  console.log("Appointments  that are passed to DataTable are-:", appointments);
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={count.scheduled}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={count.pending}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={count.cancelled}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        {/* <DataTable columns={columns} data={appointments} setAppointments={setAppointments}/> */}
        <DataTable columns={columns} data={appointments} />
      </main>
    </div>
  );
};

export default AdminPage;
