import Image from 'next/image';
import React from 'react';

export default function CompanyLogos ({ companies }) {
  return (
    <div className="flex justify-around items-center w-full py-8 max-sm:flex-col max-sm:gap-8">
      {companies.map((company, index) => (
        <div key={index} className="flex justify-around items-center mx-4">
          <Image src={company.logo} alt={company.name} className="h-auto" />
        </div>
      ))}
    </div>
  );
};