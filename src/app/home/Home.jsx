'use client'

import Button from '../common/Button';
import { handleLogin } from '@/utils/login';
import heroImage from '../../assets/Hero-Image.png'
import Image from 'next/image';
import CompanyLogos from '../common/CompanyLogos';
import { companies } from '@/data/companies';
import { doctors } from '@/data/doctors';
import Link from 'next/link';
import NewsletterSubscribe from '../common/NewsLetterCard';

export default function Home() {

    const featuredDoctors = doctors?.filter((doctor) => doctor.featured && doctor.available).slice(0, 3);

    return (
        <section className="home w-full min-h-[calc(100vh-236px)] py-8">
            <div className='flex flex-grow justify-center items-center mt-14 mb-32'>
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-4 gap-y-16 px-4 max-md:text-center sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                    <div className='pl-2'>
                        <h2 className="text-4xl font-semibold font-poppins tracking-tight sm:text-6xl">Everyone Deserve to be Happy.</h2>
                        <p className="mt-6 mb-16 text-gray-500 text-lg">
                            Mental care is company oriented towards Mental Fitness , with the combined power of neuroscience, psychoacoustics CBT, and technology.
                        </p>
                        <div className='flex gap-8 max-md:justify-center'>
                            <Button title='Sign In' action={handleLogin} />
                            <Button title='Contact Us' action={handleLogin} />
                        </div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Image
                            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                            src={heroImage}
                            className="rounded-lg w-full border border-red-600"
                        />
                    </div>
                </div>
            </div>
            <div className='relative flex flex-col justify-center items-center'>
                <div className='absolute inset-0 h-1/2 bg-center bg-cover bg-no-repeat before:absolute before:-z-0 before:inset-0 before:opacity-90 before:theme-background theme-background bg-blend-color-dodge overflow-hidden' />
                <div className="container mx-auto z-10">
                    <CompanyLogos companies={companies} />
                    <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
                        {featuredDoctors?.map((doctor) => (
                            <div key={doctor.id} className="theme-op-background border rounded-lg shadow-2xl px-6 py-8">
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

                    <div className="mt-20 ml-6 flex">
                        <Link href="/psychiatrists" className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            View all Psychiatrists
                        </Link>
                    </div>
                </div>
            </div>
            <NewsletterSubscribe />
        </section>
    );
}