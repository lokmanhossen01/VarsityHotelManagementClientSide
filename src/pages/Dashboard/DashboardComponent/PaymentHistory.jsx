import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import usePayment from '../../../Hooks/usePayment';

const PaymentHistory = () => {
  const { userDta } = useAuth();
  const axiosSec = useAxiosSec();
  const isPay = usePayment();
  const { data: ddaata = [] } = useQuery({
    queryKey: ['payment', userDta.email],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/paymentss/${userDta.email}`);
      // console.log(data);
      return data;
    },
  });
  const data = ddaata[0];
  console.log(data);
  if (!isPay) {
    return (
      <div className="text-slate-800 m-14 text-center border-2 font-semibold border-red-500 rounded-md p-5 max-w-[700px] text-3xl md:text-5xl mx-auto">
        <h1>You have not purchased a subscription yet!</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="overflow-x-auto rounded-md">
        <table className="border border-slate-400 rounded-md min-h-8 mt-11 min-w-[700px] w-full ">
          <tr>
            <td className="min-w-80 py-4 px-4">Payment Name: </td>
            <td className="min-w-80 py-4 px-4">{data?.name}</td>
          </tr>
          <tr>
            <td className="min-w-80 py-4 px-4">Payment email: </td>
            <td className="min-w-80 py-4 px-4">{data?.email}</td>
          </tr>
          <tr>
            <td className="min-w-80 py-4 px-4">Payment ammount: </td>
            <td className="min-w-80 py-4 px-4">{data?.ammount}</td>
          </tr>

          <tr>
            <td className="min-w-80 py-4 px-4">Payment transactionId: </td>
            <td className="min-w-80 py-4 px-4">{data?.transactionId}</td>
          </tr>
          <tr>
            <td className="min-w-80 py-4 px-4">Your badge: </td>
            <td className="min-w-80 py-4 px-4">
              {' '}
              <span
                className={`px-3 rounded-full font-medium ${
                  data?.badge === 'Silver'
                    ? 'bg-purple-100 text-purple-800'
                    : data?.badge === 'Gold'
                    ? 'bg-yellow-100 text-green-800'
                    : 'bg-green-100 text-yellow-800'
                }`}
              >
                {data?.badge}
              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
