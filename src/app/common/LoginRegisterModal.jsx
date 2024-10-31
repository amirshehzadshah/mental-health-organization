'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SubmissionButton from './SubmissionButton';

export default function LoginRegisterModal({ isOpen, onClose }) {

    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: !isLogin ? Yup.string().required('Name is required') : Yup.string(),
            email: Yup.string()
            .email('Invalid email address')
            .matches(
                /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|live|yahoo|protonmail|icloud|yandex|zoho|gmx|tutanota|rediffmail|mail|fastmail|qq|163)\.com|(yandex|mail)\.ru|(gmx|web)\.de|(laposte)\.net|(laposte|orange)\.fr$/,
                'Temporary accounts are not allowed'
            )
            .required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            if (isLogin) {
                handleLogin(values);
            } else {
                handleRegister(values);
                resetForm();
            }
        },
    });

    const generateLoginKey = () => {
        return Math.random().toString().slice(2, 18); // Generates a random 16-digit number
    };

    const handleLogin = (values) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const storedUser = users.find(user => user.email === values.email && user.password === values.password);
        
        if (storedUser) {
            console.log('Logged in:', values);
            const loginKey = generateLoginKey();
            sessionStorage.setItem('loginKey', loginKey);
            onClose();
        } else {
            setErrorMessage('Invalid credentials');
        }
    };

    const handleRegister = (values) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const emailExists = users.some(user => user.email === values.email);
        const usernameExists = users.some(user => user.name === values.name);

        if (emailExists) {
            setErrorMessage('Email address already exists');
            return;
        }

        if (usernameExists) {
            setErrorMessage('Username already exists');
            return;
        }

        users.push({
            name: values.name,
            email: values.email,
            password: values.password,
        });

        localStorage.setItem('users', JSON.stringify(users));
        console.log('Registered:', values);
        setIsLogin(!isLogin);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-black text-2xl font-poppins font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
                {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
                <form onSubmit={formik.handleSubmit}>
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500">Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className="mt-1 p-2 w-full rounded-md border shadow-sm text-black"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                            ) : null}
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="mt-1 p-2 w-full rounded-md border shadow-sm text-black"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-500">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="mt-1 p-2 w-full rounded-md border shadow-sm text-black"
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="flex justify-between items-center">
                        <SubmissionButton title={isLogin ? 'Login' : 'Register'} type='submit' />
                        <button
                            type="button"
                            className="text-sm text-indigo-500 hover:underline"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setErrorMessage('');
                            }}
                        >
                            {isLogin ? 'Create an account' : 'Already have an account? Log in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
