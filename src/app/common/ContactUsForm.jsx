import { handleForm } from '@/utils/handleForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SubmissionButton from './SubmissionButton';

export default function ContactUsForm({ close }) {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            message: Yup.string().required('Message is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            handleForm(values)
            resetForm();
            close();
        },
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl text-black font-poppins font-bold mb-4">Contact Us</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500">Your Name</label>
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
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500">Your Message</label>
                        <textarea
                            name="message"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.message}
                            className="mt-1 p-2 w-full rounded-md border shadow-sm text-black"
                            rows="4"
                        />
                        {formik.touched.message && formik.errors.message ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.message}</div>
                        ) : null}
                    </div>
                    <div className="flex justify-end">
                        <SubmissionButton title='Submit' type='submit' />
                        <button
                            type="button"
                            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            onClick={() => close()}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

