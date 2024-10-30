import { Suspense } from "react";
import Payment from "./Payment";

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Loading...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we fetch your data.
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        </div>
      </div>
    }>
      <Payment />
    </Suspense>
  )
}