import { useForm } from 'react-hook-form';
import { BsSendFill } from 'react-icons/bs';

const Contact = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="p-4 md:p-8 rounded-3xl border-2 mt-14 gap-10 flex flex-col md:flex-row">
      <div className="w-full md:w-2/5 relative">
        <h1 data-aos="fade-right" className="text-4xl font-bold">
          Send Us An Email
        </h1>
        <p data-aos="fade-down" className="text-slate-400 pt-8 text-justify">
          {`Need help? Contact us at email@example.com or call (+880) 1719 199967.
          We're here to assist you with your orders and inquiries.`}
        </p>
        <h1 className="text-2xl font-bold pt-6 pb-2">Our Address</h1>
        <p className="text-slate-400">Mirpur 10, Dhaka, Bangladesh</p>
        <h1 className="text-2xl font-bold pt-6 pb-2">Call Now</h1>
        <p className="text-slate-400">+8800 1719 199967</p>
        <p className="text-slate-400">+8800 1326 142663</p>
      </div>
      <div data-aos="fade-left" className="w-full md:w-3/5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            className="px-4 py-2 outline-none border rounded-md bg-transparent"
            type="text"
            placeholder="Your name"
            {...register('Your name', { required: true, maxLength: 80 })}
          />
          <input
            className="px-4 py-2 outline-none border rounded-md bg-transparent"
            type="text"
            placeholder="Your Email"
            {...register('Your Email', {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          <input
            className="px-4 py-2 outline-none border rounded-md bg-transparent"
            type="tel"
            placeholder="Mobile number"
            {...register('Mobile number', {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          <input
            className="px-4 py-2 outline-none border rounded-md bg-transparent"
            type="text"
            placeholder="Subject"
            {...register}
          />
          <textarea
            className="px-4 py-2 outline-none border rounded-md bg-transparent h-36"
            placeholder="Your Message"
            {...register('Your Message', { min: 10 })}
          />
          <button className="py-2 px-2 bg-firstColor rounded-md font-semibold hover:text-firstColor cursor-pointer active:scale-95 hover:bg-transparent border-2 border-firstColor text-white duration-150 flex items-center justify-center gap-2">
            Send <BsSendFill />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
