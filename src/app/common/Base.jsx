'use client'

import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { LoginProvider } from '@/context/Login';

function Base({ children }) {

    return (
        <LoginProvider>
            <div className="flex flex-col">
                <header className='flex justify-center items-center'>
                    <Header />
                </header>
                <main className='flex flex-col justify-center items-center flex-1'>
                    {children}
                </main>
                <footer className='flex justify-center items-center'>
                    <Footer />
                </footer>
            </div>
        </LoginProvider>
    )
}

export default Base