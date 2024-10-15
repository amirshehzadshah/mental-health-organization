'use client'

import Image from "next/image";
import neuroscience from '../../assets/Neuroscience.jpg'
import AI_healthcare from '../../assets/AI_healthcare.jpg'
import GeneEditing from '../../assets/GeneEditing.jpg'
import MarsMission_astronauts from '../../assets/MarsMission_astronauts.jpg'
import Button from "../common/Button";
import { handleLogin } from "@/utils/login";
import { recentResearch } from "@/data/recentResearch";

export default function Science() {
  return (
    <section className="science w-full py-12">
      <h1 className="text-4xl font-poppins font-bold mb-8 text-center">Science and Innovation</h1>

      <div className="px-4 mx-10">
        <div className="flex flex-col md:flex-row items-center mb-12 gap-6">
          <div className="md:w-1/2">
            <Image
              src={neuroscience}
              alt="Science innovation"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-poppins font-bold mb-4">Latest Breakthrough in Neuroscience</h2>
            <p className="text-lg text-gray-600 text-justify mb-4">
              Neuroscientists have recently discovered a new mechanism in the brain that
              affects memory and learning. This discovery could help in understanding
              conditions like Alzheimer's disease and provide new treatment possibilities.
            </p>
            <Button title='Read More' action={handleLogin} />
          </div>
        </div>
      </div>

      {/* Recent Research Section */}
      <div className="relative flex flex-col px-16 py-8">
        <div className='absolute inset-0 h-1/2 bg-center bg-cover bg-no-repeat before:absolute before:-z-0 before:inset-0 before:opacity-90 before:theme-background theme-background bg-blend-color-dodge overflow-hidden' />
        <h2 className="text-3xl font-poppins font-bold mb-6 z-10 theme-op-color">Recent Research</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10">
          {
            recentResearch.map((item) => (
              <div className="border rounded-lg shadow-lg p-6 theme-op-background">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between min-h-60">
                  <h3 className="text-xl font-poppins font-bold mt-4">{item.name}</h3>
                  <p className="text-gray-500 text-justify text-sm">
                    {item.description}
                  </p>
                  <div>
                    <Button title='Learn More' action={handleLogin} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="px-4 mx-10">
      <h2 className="text-3xl font-bold my-6">Science Explained</h2>
      <div className="w-full h-72 bg-black mb-12">
        <iframe
          className="size-full"
          src="https://www.youtube-nocookie.com/embed/9UukcdU258A?si=aHkYIjqriu1QX30g"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white text-white text-center py-10 custom-background shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-black">Want to Stay Updated?</h2>
        <p className="text-lg mb-6 text-gray-500">
          Subscribe to our newsletter to receive the latest science updates, research findings, and innovations.
        </p>
        <button className="px-8 py-4 bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-gray-200">
          Subscribe Now
        </button>
      </div>
    </section>
  );
}