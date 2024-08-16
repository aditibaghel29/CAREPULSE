
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PatientForm from '@/components/forms/PatientForm';
import { useParams } from 'next/navigation';

const Page = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                setLoading(true);
                try {
                    const response = await fetch(`/api/users/get/${id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    if (data.success) {
                        setUser(data.user);
                    } else {
                        console.error("API response was not successful:", data.message);
                    }
                } catch (err) {
                    console.error("Error fetching user:", err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[560px] flex flex-col py-10">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="patient"
                        className="mb-12 h-10 w-fit"
                    />
                    {user ? <PatientForm user={user} /> : <p>User not found.</p>}
                    <p className="copyright py-12">© 2024 CarePulse</p>
                </div>
            </section>

            <Image
                src="/assets/images/register-img.png"
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[360px]"
            />
        </div>
    );
}

export default Page;




