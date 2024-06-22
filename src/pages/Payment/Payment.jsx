import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ChecoutFrom from './ChecoutFrom';
import { useParams } from 'react-router-dom';
import { MdDone } from 'react-icons/md';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API);
const Payment = () => {
  const { id } = useParams();
  console.log(id);
  let price = '';
  if (id === 'Silver') {
    price = 49;
  } else if (id === 'Gold') {
    price = 199;
  } else if (id === 'Platinum') {
    price = 399;
  }
  return (
    <div>
      <div
        className="h-60 bg-pClr"
        style={{
          backgroundImage: `url('https://i.ibb.co/09rvF5m/ffd.png')`,
        }}
      ></div>
      <div className="w-11/12 xl:w-10/12 mx-auto max-w-[1700px] flex flex-col md:flex-row gap-5 py-12">
        <div className="w-full md:w-1/2">
          {id === 'Silver' ? (
            <div className="hover:bg-white hover:bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 m-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Silver
                </span>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">
                  Basic Pack
                </h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">
                  ${price}
                </span>
                <span className="text-xl font-medium text-purple-200">/mo</span>
              </div>
              <ul className="space-y-4 text-purple-200 h-36">
                <li className="flex items-center">
                  <span className="text-green-400 text-2xl pr-2">
                    <MdDone />
                  </span>
                  <span>Limited number of food orders per month</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 text-2xl pr-2">
                    <MdDone />
                  </span>
                  <span>Access to basic hostel services</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 text-2xl pr-2">
                    <MdDone />
                  </span>
                  <span>Basic customer support</span>
                </li>
              </ul>
            </div>
          ) : id === 'Gold' ? (
            <div className="hover:bg-white hover:bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 m-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Gold
                </span>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">
                  Standard Pack
                </h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">
                  ${price}
                </span>
                <span className="text-xl font-medium text-purple-200">/mo</span>
              </div>
              <ul className="mb-8 space-y-4 text-purple-200 h-36">
                <li className="flex items-center">
                  <span className="text-green-400 text-2xl pr-2">
                    <MdDone />
                  </span>
                  <span>More food orders per month</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 text-2xl pr-2">
                    <MdDone />
                  </span>
                  <span>Access to advanced hostel services</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 text-2xl pr-2">
                    <MdDone />
                  </span>
                  <span>Priority customer support</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hover:bg-white hover:bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 m-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Platinum
                </span>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">
                  Premium Pack
                </h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">
                  ${price}
                </span>
                <span className="text-xl font-medium text-purple-200">/mo</span>
              </div>
              <ul className="mb-8 space-y-4 text-purple-200 h-36">
                <li className="flex items-center">
                  <span className="text-green-400 text-2xl pr-2">
                    <MdDone />
                  </span>
                  <span>Unlimited food orders</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 text-2xl pr-2">
                    <MdDone />
                  </span>
                  <span>Access to all hostel servicess</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 text-2xl pr-2">
                    <MdDone />
                  </span>
                  <span>Premium customer support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 text-2xl pr-2">
                    <MdDone />
                  </span>
                  <span> laundry service, gym access</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 text-center">
          <h1 className="text-3xl text-slate-100 font-bold text-center pt-12 mb-4 border-b-2 inline-block border-pClr px-3">
            Pay for the {id} Plan
          </h1>
          <div className="max-w-[550px] mx-auto pt-10 px-3 rounded-md border-slate-400 border-2 mb-10">
            <Elements stripe={stripePromise} className="">
              <ChecoutFrom price={price} badge={id} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
