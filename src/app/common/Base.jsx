'use client'

import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Base({ children }) {
    return (
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
    )
}

export default Base