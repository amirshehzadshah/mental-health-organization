'use client'

import Image from "next/image";
import Button from "../common/Button";
import { recentResearch } from "@/data/recentResearch";
import NewsletterSubscribe from "../common/NewsLetterCard";
import { useState } from "react";
import { sciencePosts } from "@/data/sciencePosts";
import DetailDialog from "../common/DetailDialog";

export default function Science() {

  const [isOpen, setIsOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState({});

  const openDialog = (topic) => {
    setActiveTopic(topic);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <section className="science w-full py-12">
      <h1 className="text-5xl font-poppins font-bold mb-20 text-center">Science and Innovation</h1>

      <div className="px-4 mx-10">
        {
          sciencePosts.map((post, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center mb-12 gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2">
                <Image
                  src={post.image}
                  alt={post.name}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-poppins font-bold mb-4">{post.name}</h2>
                <p className="text-lg text-gray-500 text-justify mb-4">{post.desc}</p>
                <Button title='Read More' action={() => openDialog(post)} />
              </div>
            </div>
          ))
        }
      </div>

      <div className="relative flex flex-col px-16 py-8">
        <div className='absolute -z-10 inset-0 h-1/2 bg-center bg-cover bg-no-repeat before:absolute before:-z-10 before:inset-0 before:opacity-90 before:theme-background theme-background bg-blend-color-dodge overflow-hidden' />
        <h2 className="text-4xl font-poppins font-bold mb-6 theme-op-color">Recent Research</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            recentResearch.map((item, index) => (
              <div key={index} className="border rounded-lg shadow-lg p-6 theme-op-background">
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
                    <Button title='Learn More' action={() => openDialog(item)} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {isOpen && (
        <DetailDialog name={activeTopic.name} image={activeTopic.image} description={activeTopic.description} close={() => closeDialog()} />
      )}

      <div className="px-4 mx-10">
        <h2 className="text-4xl font-bold my-6">Science Explained</h2>
        <div className="w-full h-72 bg-black mb-12">
          <iframe
            className="size-full rounded-lg"
            src="https://www.youtube-nocookie.com/embed/9UukcdU258A?si=aHkYIjqriu1QX30g"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <NewsletterSubscribe heading='Want to Stay Updated?' desc='Subscribe to our newsletter to receive the latest science updates, research findings, and innovations.' />
    </section>
  );
}