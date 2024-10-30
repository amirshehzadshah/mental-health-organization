import { handleForm } from '@/utils/handleForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SubmissionButton from './SubmissionButton';

export default function AppointmentForm({ selectedDoctor, close}) {

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        date: Yup.date().required('Please select a date'),
        comments: Yup.string().optional(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            date: '',
            comments: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const data = [selectedDoctor, values];
            handleForm(data)
            resetForm();
            close()
        },
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-black text-2xl font-poppins font-bold mb-4">Book an Appointment with {selectedDoctor.name}</h2>
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
                        <label className="block text-sm font-medium text-gray-500">Email</label>
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
                        <label className="block text-sm font-medium text-gray-500">Preferred Appointment Date</label>
                        <input
                            type="date"
                            name="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.date}
                            className="mt-1 p-2 w-full rounded-md border shadow-sm text-black"
                        />
                        {formik.touched.date && formik.errors.date ? (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.date}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500">Comments</label>
                        <textarea
                            name="comments"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.comments}
                            className="mt-1 p-2 w-full rounded-md border shadow-sm text-black"
                            rows="3"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={close}
                            className="px-4 py-2 bg-gray-300 text-gray-500 rounded-md"
                        >
                            Cancel
                        </button>
                        <SubmissionButton title='Submit' type='submit' />
                    </div>
                </form>
            </div>
        </div>
    )
}

