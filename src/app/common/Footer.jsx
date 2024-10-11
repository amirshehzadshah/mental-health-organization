import { useEffect, useState } from 'react';
import Image from 'next/image';
import logoLight from '../../assets/Mental-Health-Logo-light.png'; // Import light mode logo
import logoDark from '../../assets/Mental-Health-Logo-dark.png'; // Import dark mode logo
import { navigation } from '@/data/navigation';
import { classNames } from '@/utils/classNames';
import facebook from '../../assets/social/facebook.png'
import instagram from '../../assets/social/instagram.png'
import twitter from '../../assets/social/twitter.png'



export default function Footer() {

  const [logo, setLogo] = useState(logoLight);

  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial logo based on current theme
    const setInitialLogo = (e) => {
      setLogo(e.matches == 'true' ? logoLight : logoDark);
    };

    // Set initial logo on mount
    setInitialLogo(prefersDarkScheme);

    // Listen for changes in theme
    prefersDarkScheme.addEventListener('change', setInitialLogo);

    // Cleanup listener on component unmount
    return () => {
      prefersDarkScheme.removeEventListener('change', setInitialLogo);
    };
  }, []);

  return (
    <footer className="footer w-full">
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 space-y-10'>
        <div className='relative flex max-sm:flex-col h-16 items-center justify-between'>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Image src={logo} alt='logo' className="h-10 w-auto" />
              <p className="font-semibold text-sm sm:text-lg md:text-2xl lg:text-4xl text-center max-w-32 sm:max-w-56 md:max-w-full">Mental Health Care</p>
            </div>
          </div>
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  // item.current ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium',
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className='relative flex max-sm:flex-col h-16 items-center justify-between'>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center gap-5">
              <Image src={facebook} alt='logo' className="h-10 w-auto" />
              <Image src={instagram} alt='logo' className="h-10 w-auto" />
              <Image src={twitter} alt='logo' className="h-10 w-auto" />
            </div>
          </div>
          <div className="flex space-x-4">
            <p>© 2024 Next.js App. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}