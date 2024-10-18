import Image from "next/image";

export default function DetailDialog({name, image, description, close}) {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-20">
            <div className="bg-white rounded-lg shadow-lg max-w-md p-6 relative">
                <h3 className="text-2xl font-bold mb-4">{name}</h3>
                <Image
                    src={image}
                    alt={name}
                    // width={400}
                    // height={250}
                    className="rounded-md mb-4 w-full h-auto"
                    priority
                />
                <p className="text-gray-500 mb-4">{description}</p>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={close}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

