'use client'

import { doctors } from "@/data/doctors";
import Image from "next/image";
import Button from "../common/Button";
import { handleLogin } from "@/utils/login";
import { useState } from "react";

export default function Psychiatrists() {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);

  const filteredDoctors = doctors?.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!availableOnly || doctor.available)
  );
  console.log("🕵️‍♂️ > file: Psychiatrists.jsx:17 > Psychiatrists > filteredDoctors:", filteredDoctors);
  return (
    <section className="w-full py-8">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6 text-center">Find Your Psychiatrist</h2>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 px-4 mx-10">
        <input
          type="text"
          className="border rounded-lg p-2 w-full sm:max-w-md"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
          <label className="mr-2 font-medium text-gray-600">Available Only</label>
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={() => setAvailableOnly(!availableOnly)}
            className="h-5 w-5 text-green-500 rounded"
          />
        </div>
      </div>

      {/* Doctor Categories */}
      {/* <h3 className="text-2xl font-semibold mb-4 px-4">Doctor Specialties</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 px-4 w-full">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Anxiety</button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg w-full">PTSD</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">Pediatric</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg w-full">Depression</button>
      </div> */}

      {
        filteredDoctors.length === 0 ?
          <div className="flex justify-center items-center gap-8 px-4 w-full">
            No Doctor
          </div> :
          <div className="flex flex-wrap justify-center items-center gap-8 px-4">
            {filteredDoctors?.map((doctor) => (
              <div key={doctor.id} className="theme-op-background border rounded-lg shadow-2xl px-6 py-8 max-w-sm">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="gap-y-3 mt-4">
                  <div className='mr-1 py-1 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-yellow-500 -py-1" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path></svg>
                    <span>{doctor.rating}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{doctor.name}</h3>
                    <div className="flex items-center">
                      <span
                        className={`${doctor.available ? '' : 'text-gray-500'} font-poppins ml-2 flex`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className={`${doctor.available ? 'text-green-500' : 'text-gray-500'} -py-1`} viewBox="0 0 24 24" fill="currentColor" role="presentation">
                          <path d="M12 2 C 6.48 2, 2 6.48, 2 12 C 2 17.52, 6.48 22, 12 22 C 17.52 22, 22 17.52, 22 12 C 22 6.48, 17.52 2, 12 2 z" />
                        </svg>
                        {doctor.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm min-h-20">{doctor.description}</p>
                  <div className='flex md:flex-col lg:flex-row gap-4'>
                    <Button title='Book an appointment' action={handleLogin} />
                    <button className='theme-background theme-op-color flex justify-center items-center max-sm:px-2 max-sm:py-1 px-4 py-2 rounded-md'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      }

      <div className="my-20 py-12 bg-white custom-background">
        <div className="container mx-auto px-6 text-center">
          <blockquote className="text-2xl italic font-semibold text-black leading-relaxed">
            "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
          </blockquote>
          <p className="mt-4 text-lg text-gray-600">— Noam Shpancer, Psychologist</p>
        </div>
      </div>

      {/* <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">What Our Patients Are Saying</h3>
          <div className="flex flex-col gap-6">
            <div className="flex items-start">
              <Image
                src="../assets/doctors/doctor1.jpg"
                width={25}
                height={25}
                alt="Patient Testimonial"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <p className="text-gray-700">"Dr. Sarah Kim was incredibly compassionate and professional. She helped me navigate my mental health journey with patience and expertise."</p>
            </div>
            <div className="flex items-start">
              <Image
                src="../assets/doctors/doctor1.jpg"
                width={25}
                height={25}
                alt="Patient Testimonial"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <p className="text-gray-700">"Booking an appointment was so easy, and Dr. Usman Yousuf truly listened to my concerns. Highly recommend!"</p>
            </div>
          </div>
        </div> */}


    </section>
  );
};


