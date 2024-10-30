import Image from 'next/image';
import logo from '../../assets/Mental-Health-Logo.png';
import { navigation } from '@/data/navigation';
import { classNames } from '@/utils/classNames';
import facebook from '../../assets/social/Facebook.png'
import instagram from '../../assets/social/Instagram.png'
import twitter from '../../assets/social/Twitter.png'



export default function Footer() {
  return (
    <footer className="footer w-full py-8">
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 space-y-10'>
        <div className='relative flex max-md:gap-4 max-sm:flex-col h-16 items-center justify-between'>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <a className="flex flex-shrink-0 items-center" href='/'>
              <Image src={logo} alt='logo' className="h-10 w-auto" />
              <p className="font-semibold font-poppins text-sm sm:text-lg md:text-2xl lg:text-4xl text-center max-w-32 sm:max-w-56 md:max-w-full">Mental Health Care</p>
            </a>
          </div>
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames('rounded-md pl-3 py-2 text-sm font-medium',)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className='relative flex gap-4 max-sm:flex-col h-16 items-center justify-between'>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center gap-5">
              <Image src={facebook} alt='facebook_logo' className="h-12 w-auto" />
              <Image src={instagram} alt='instagram_logo' className="h-10 w-auto" />
              <Image src={twitter} alt='twitter_logo' className="h-10 w-auto" />
            </div>
          </div>
          <div className="flex space-x-4">
            <p>© 2024, All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}