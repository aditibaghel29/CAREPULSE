"use client";
import AppointmentForm from "@/components/forms/AppointmentForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export function NewAppointment({ params: { id } }: { params: { id: string } }) 
{
  const [userid, setUserId] = useState<string | null>(null);
  const[loading,setLoading]=useState(true);


  useEffect(() => {
    const fetchUserId = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/patient/getUseridByPatientid?patientid=${id}`);
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userid);
        } else {
          console.error("Failed to fetch patient ID");
        }
      } catch (error) {
        console.error("Error fetching patient ID:", error);
      }finally {
        setLoading(false);
      }
    };

    if(id)
    {
        fetchUserId();
    }
  }, [id]);

   
  if (loading) {
    return <Loading />;
  }




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

        
{userid ? (
            <AppointmentForm 
              type="create"
              userid={userid}
              patientid={id}
            />
          ) : (
            <p>Loading patient data...</p>
          )}

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
