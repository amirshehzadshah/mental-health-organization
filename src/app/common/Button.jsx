import React from 'react'

export default function Button({ title, action }) {
    return (
        <button
            onClick={action}
            className="relative max-sm:px-2 max-sm:py-1 px-8 py-2 rounded-md border-button overflow-hidden">
            <div className="absolute inset-0 border-2 border-transparent rounded-md bg-clip-padding image-button"></div>
            <span className="relative text-black">{title}</span>
        </button>


    )
}

