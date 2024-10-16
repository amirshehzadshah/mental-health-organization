'use client'

import { benefits } from "@/data/keyBenefits";
import Image from "next/image";
import Innovative_Wellness_Environment from '../../assets/Benefits/Innovative_Wellness_Environment.jpg';
import Lottie from "lottie-react";
import NewsletterSubscribe from "../common/NewsLetterCard";
import { detailedBenefits } from "@/data/detailedBenefits";
import { steps } from "@/data/steps";
import Anchor from "../common/Link";

export default function Benefits() {
  return (
    <section className="benefits py-12">

      <div className="text-center mb-12">
        <div className="pb-10">
        <h1 className="text-5xl font-poppins font-bold">Unlock the Power of Our Platform</h1>
        <p className="mt-4 text-lg text-gray-500">
          Discover how our solution can benefit you in ways you never imagined.
        </p>
        <div className="my-8">
          <Anchor title='Get Started Today' action='/pricing' />
        </div>
        </div>
        <div className="mt-8">
          <Image
            src={Innovative_Wellness_Environment}
            alt="Hero Image"
            width={1200}
            height={600}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>
      </div>

      <div className="text-center my-20">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-gray-500 mb-8">Explore the key benefits that set us apart.</p>

        <div className="flex flex-wrap justify-center gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="theme-background border rounded-lg shadow-lg p-6 max-w-xs flex flex-col items-center">
              <Lottie animationData={benefit.icon} loop={true} className="mb-4 size-16" />
              <h3 className="theme-op-color text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mx-6 sm:mx-20 my-20">
        {
          detailedBenefits.map((item) => (
            <div key={item.id} className="border rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))
        }
      </div>

      <div className="relative flex flex-col text-center mb-12 py-16">
        <div className='absolute inset-0 h-2/3 bg-center bg-cover bg-no-repeat before:absolute before:-z-0 before:inset-0 before:opacity-90 before:theme-background theme-background bg-blend-color-dodge overflow-hidden' />
        <h2 className="theme-op-color text-3xl font-bold mb-4 z-10">How It Works</h2>
        <p className="text-gray-500 mb-16 z-10">
          Discover how easy it is to get started with our platform.
        </p>
        <div className="flex flex-wrap justify-center gap-8 z-10">
          {
            steps.map((item) => (
              <div key={item.id} className="theme-op-background border rounded-lg shadow-lg p-6 max-w-xs">
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))
          }
        </div>
      </div>

      <NewsletterSubscribe heading='Stay Updated with Our Newsletter' desc='Subscribe to our newsletter and never miss out on our latest updates and offers.' />
    </section>
  );
}
