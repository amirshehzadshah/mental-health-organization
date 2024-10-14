import { useFormik } from 'formik';
import * as Yup from 'yup';
import { handleNewsletterSubscribe } from '@/utils/NewsletterSubscribe';

export default function NewsletterSubscribe() {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .matches(
                    /^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|live|yahoo|protonmail|icloud|yandex|zoho|gmx|tutanota|rediffmail|mail|fastmail|qq|163)\.com|(yandex|mail)\.ru|(gmx|web)\.de|(laposte)\.net|(laposte|orange)\.fr$/,
                    'Temporary accounts are allowed'
                )
                .required('Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            handleNewsletterSubscribe(values)
            resetForm()
        },
    });

    return (
        <div className="relative w-full flex justify-center items-center my-16 py-20">
            <div className='absolute bg-white inset-0 bg-center bg-cover bg-no-repeat before:absolute before:-z-10 before:inset-0 before:opacity-90 before:custom-background custom-background overflow-hidden' />
            <div className="w-full max-w-[560px] p-6 z-0">
                <h2 className="text-4xl text-black font-semibold font-poppins text-center mb-4">
                    Subscribe to Our Newsletter
                </h2>
                <form onSubmit={formik.handleSubmit} className="flex items-start max-md:items-center space-x-2 max-md:flex-col max-md:gap-2">
                    <div className="flex-grow">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your Email here."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${formik.touched.email && formik.errors.email
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
