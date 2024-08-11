"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import RegisterForm from '@/components/forms/RegisterForm'
import { useParams } from 'next/navigation'; 
import { useState,useEffect } from 'react';
const Page = () => {
        
    const { userid } = useParams(); // Fetch the user ID from the URL
console.log("userid inside page/userid/register i ",userid)
    const [loading, setLoading] = useState(true);
    
    const [user, setUser] = useState(null);
   




    useEffect(() => {
        if (userid) {
          const fetchUser = async () => {
            try {
              const response = await fetch(`/api/users/get/${userid}`);
              if (!response.ok) {
                throw new Error("Failed to fetch user");
              }
              const data = await 
              response.json();
              console.log(data)
              setUser(data); // Store the fetched user data
            
            } catch (err) {
              console.log(err);
            } finally {
              setLoading(false);
            }
          };

          fetchUser(); // Call the function to fetch the user data
        }
      }, [userid]);
  return (
    <div className="flex h-screen max-h-screen">
    {/* to  do OTP verification / passkey model  */}
 
       <section className="remove-scrollbar container ">
         <div className="sub-container max-w-[560px] flex flex-col py-10">
           <Image
             src="/assets/icons/logo-full.svg"
             height={1000}
             width={1000}
             alt="patient"
             className="mb-12 h-10 w-fit"
           />
 
           {/* <PatientForm /> */}
           <RegisterForm user={user}/>
 
           
             <p className=" copyright py-12">
               © 2024 CarePulse
             </p>
            
         </div>
       </section>
 
       <Image
              src="/assets/images/register-img.png"
 
         height={1000}
         width={1000}
         alt="patient"
         className="side-img max-w-[360px] "
       />
     </div>
  )
}

export default Page;