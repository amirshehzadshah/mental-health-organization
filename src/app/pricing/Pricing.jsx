'use client';

import { plans } from "@/data/pricingPlans";
import NewsletterSubscribe from "../common/NewsLetterCard";
import Button from "../common/Button";
import { useRouter } from 'next/navigation';
import { useLoginState } from "@/context/Login";
import LoginRegisterModal from "../common/LoginRegisterModal";

export default function Pricing() {

  const { state, closeModal } = useLoginState();
  const router = useRouter();

  // Handler to navigate to the payment page with the selected plan
  const handleChoosePlan = (planId) => {
    router.push(`/pricing/payment?planId=${planId}`);
  };

  return (
    <section className="pricing w-full py-12">
      <div className="text-center mb-32">
        <h1 className="text-5xl font-poppins font-bold">Affordable Mental Health Plans</h1>
        <p className="mt-4 text-lg text-gray-500">
          Your mental well-being is our priority. Choose a plan that fits your needs and start your journey to better mental health today.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-32">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className={`theme-background border rounded-lg shadow-lg px-6 py-28 flex flex-col items-center ${index === 1 ? 'lg:transform lg:scale-[1.15]' : 'max-w-xs'
              }`}
          >
            <h3 className="theme-op-color text-2xl font-poppins font-bold mb-4">{plan.title}</h3>
            <p className="text-4xl text-gray-400 font-bold mb-8">
              ${plan.price} <span className="text-lg font-medium">/ month</span>
            </p>

            <ul className="text-left text-gray-500 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 4.293a1 1 0 00-1.414 0L9 10.586 5.707 7.293a1 1 0 00-1.414 1.414l4 4a 1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Button title="Choose Plan" action={() => handleChoosePlan(plan.id)} />
          </div>
        ))}
      </div>

      <section className="comparison-section text-center p-10 sm:p-16 md:p-20 lg:p-40 mt-12">
        <h2 className="text-3xl font-poppins font-bold mb-6">Compare Our Plans</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 font-poppins text-left">Features</th>
                {plans.map(plan => (
                  <th key={plan.id} className="px-4 py-2 font-poppins text-left">{plan.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans[2].features.map((feature, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{feature}</td>
                  {plans.map(plan => (
                    <td key={plan.id} className="border px-4 py-2 text-center">
                      {plan.features.includes(feature) ? "✔" : "✖"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <NewsletterSubscribe heading='Subscribe to Our Newsletter' desc='Stay updated with the latest mental health resources, tips, and exclusive offers.' />

      {state.isModalOpen &&
        <LoginRegisterModal
          isOpen={state}
          onClose={closeModal}
        />
      }

    </section>
  );
}
