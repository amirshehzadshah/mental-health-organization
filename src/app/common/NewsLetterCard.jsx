import { handleForm } from '@/utils/handleForm';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function NewsletterSubscribe({ heading, desc }) {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .matches(
                    /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|live|yahoo|protonmail|icloud|yandex|zoho|gmx|tutanota|rediffmail|mail|fastmail|qq|163)\.com|(yandex|mail)\.ru|(gmx|web)\.de|(laposte)\.net|(laposte|orange)\.fr$/,
                    'Temporary accounts are not allowed'
                )
                .required('Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            handleForm(values)
            resetForm()
        },
    });

    return (
        <div className="bg-white bg-cover flex flex-col items-center text-white text-center py-10 custom-background shadow-lg">
            <h2 className="text-4xl text-black font-semibold font-poppins text-center mb-4">
                {heading}
            </h2>
            {
                desc && (
                    <p className="text-lg mb-6 text-gray-500">
                        {desc}
                    </p>
                )
            }
            <div className="w-full max-w-[560px] p-6">
                <form onSubmit={formik.handleSubmit} className="flex items-start max-md:items-center space-x-2 max-md:flex-col max-md:gap-2">
                    <div className="flex flex-col flex-grow items-start">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your Email here."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none theme-background theme-op-color ${formik.touched.email && formik.errors.email
                                ? 'border-red-500 focus:ring-red-300'
                                : 'focus:ring-blue-300'
                                }`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
