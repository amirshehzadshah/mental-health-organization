'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { plans } from '@/data/pricingPlans';
import SubmissionButton from '@/app/common/SubmissionButton';
import Lottie from 'lottie-react';
import paymentSuccessful from '../../../assets/Payment-Animation/successfully.json'
import { useLoginState } from '@/context/Login';
import LoginRegisterModal from '@/app/common/LoginRegisterModal';
import Button from '@/app/common/Button';

export default function Payment() {

    const { state, openModal, closeModal } = useLoginState();
    const searchParams = useSearchParams();
    const planId = searchParams.get('planId');
    const router = useRouter();

    const { isLoggedIn } = state;

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const filteredPlan = plans?.filter((plan) => plan.id == planId);

    // Get current month and year
    const getCurrentMonthAndYear = () => {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear() % 100;
        return { currentMonth, currentYear };
    };

    const validationSchema = Yup.object({
        cardHolder: Yup.string().required('Cardholder name is required'),
        cardNumber: Yup.string()
            .matches(/^[0-9\s]{19}$/, 'Card number must be 16 digits')
            .required('Card number is required'),
        expiryDate: Yup.string()
            .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date must be MM/YY format')
            .test('is-future-date', 'Expiry date cannot be in the past or current month', function (value) {
                if (!value) return false;
                const [month, year] = value.split('/').map(Number);
                const { currentMonth, currentYear } = getCurrentMonthAndYear();

                // Check if the year is in the past
                if (year < currentYear) return false;
                // If it's the current year, check if the month is in the past
                if (year === currentYear && month <= currentMonth) return false;
                return true;
            })
            .required('Expiry date is required'),
        cvc: Yup.string()
            .matches(/^[0-9]{3}$/, 'CVC must be 3 digits')
            .required('CVC is required'),
    });

    const formik = useFormik({
        initialValues: {
            cardHolder: '',
            cardNumber: '',
            expiryDate: '',
            cvc: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form values:', values);
            setShowSuccessPopup(true);

            // After a delay, redirect back to pricing page
            setTimeout(() => {
                setShowSuccessPopup(false);
                router.push('/pricing');
            }, 2500);
        },
    });

    // Format card number: Add space after every 4 digits
    const formatCardNumber = (value) => {
        return value
            .replace(/\s+/g, '') // Remove all spaces
            .replace(/(\d{4})/g, '$1 ') // Add space after every 4 digits
            .trim(); // Trim any trailing space
    };

    // Format expiry date: Automatically add "/" after MM
    const formatExpiryDate = (value) => {
        return value
            .replace(
                /^([0-9]{2})([0-9]{0,2})$/,
                (match, p1, p2) => `${p1}/${p2}` // Insert '/' after first 2 digits (MM)
            )
            .slice(0, 5); // Limit to 5 characters (MM/YY)
    };

    if (isLoggedIn === false) {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center py-12">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-lg text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
              Please Sign In
              </h2>
              <p className="mt-2 text-sm text-gray-600">
              It looks like you haven't signed in yet. Please sign in to proceed.
              </p>
              <Button title='Sign In' action={openModal} />
            </div>
          </div>
        );
      }
    if (!planId) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center py-12">
                <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-lg text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Please Choose a Plan
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        It looks like you haven't selected a plan yet. Please choose a plan to proceed with payment.
                    </p>
                    <Button title='Go To Pricing' action={() => router.push('/pricing')} />
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen flex flex-col items-center justify-center py-12">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
                <div>
                    <h2 className="text-center text-black text-2xl font-poppins font-bold mb-4">
                        Complete Your Payment
                    </h2>
                    <p className="mt-2 text-center text-md text-gray-600">
                        You are purchasing plan: <span className="font-bold text-green-600">{filteredPlan.map((item) => item.title)}</span>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="rounded-md shadow-sm">

                        <div className="mb-4">
                            <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-500">
                                Cardholder Name
                            </label>
                            <input
                                id="cardHolder"
                                name="cardHolder"
                                type="text"
                                className={`mt-1 p-2 w-full rounded-md border shadow-sm text-black`}
                                value={formik.values.cardHolder}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.cardHolder && formik.touched.cardHolder && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.cardHolder}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-500">
                                Card Number
                            </label>
                            <input
                                id="cardNumber"
                                name="cardNumber"
                                type="text"
                                className={`mt-1 p-2 w-full rounded-md border shadow-sm text-black`}
                                placeholder="**** **** **** ****"
                                maxLength="19" // 16 digits + 3 spaces
                                value={formik.values.cardNumber}
                                onChange={(e) => {
                                    formik.setFieldValue(
                                        'cardNumber',
                                        formatCardNumber(e.target.value)
                                    );
                                }}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.cardNumber && formik.touched.cardNumber && (
                                <p className="text-red-500 text-xs mt-1">{formik.errors.cardNumber}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-500">
                                    Expiry Date
                                </label>
                                <input
                                    id="expiryDate"
                                    name="expiryDate"
                                    type="text"
                                    className={`mt-1 p-2 w-full rounded-md border shadow-sm text-black`}
                                    placeholder="MM/YY"
                                    maxLength="5" // MM/YY format is 5 characters
                                    value={formik.values.expiryDate}
                                    onChange={(e) => {
                                        formik.setFieldValue(
                                            'expiryDate',
                                            formatExpiryDate(e.target.value)
                                        );
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.expiryDate && formik.touched.expiryDate && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.expiryDate}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="cvc" className="block text-sm font-medium text-gray-500">
                                    CVC
                                </label>
                                <input
                                    id="cvc"
                                    name="cvc"
                                    type="text"
                                    className={`mt-1 p-2 w-full rounded-md border shadow-sm text-black`}
                                    placeholder="***"
                                    maxLength="3"
                                    value={formik.values.cvc}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.cvc && formik.touched.cvc && (
                                    <p className="text-red-500 text-xs mt-1">{formik.errors.cvc}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <SubmissionButton title='Pay Now' type='submit' />
                    </div>
                </form>

                {showSuccessPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                        <div className="flex flex-col justify-center items-center bg-white rounded-lg p-6 shadow-lg">
                            <h3 className="text-black text-2xl font-poppins font-bold mb-4">Payment Successful!</h3>
                            <Lottie animationData={paymentSuccessful} loop={true} className="mb-4 size-24" />
                            <p className="text-gray-600">Thank you for your payment.</p>
                        </div>
                    </div>
                )}
            </div>

            {state.isModalOpen &&
                <LoginRegisterModal
                    isOpen={state}
                    onClose={closeModal}
                />
            }

        </section>
    );
}
