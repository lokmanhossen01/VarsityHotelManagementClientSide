import { useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import { ImSpinner3 } from 'react-icons/im';

const AllPayments = () => {
  const axiosSec = useAxiosSec();
  const { data = [], isLoading } = useQuery({
    queryKey: ['all-payments'],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/all-payments`);
      // console.log(data);
      return data;
    },
  });
  return (
    <div>
      <h1 className="text-3xl text-slate-800 font-bold pb-4 pt-3">
        All Payments
      </h1>
      {/* Table Part */}
      <div className="w-full mx-auto">
        <div className="overflow-x-auto rounded-md">
          <table className="border rounded-md w-full min-w-[850px]">
            <thead className="rounded-t-md">
              <tr className="rounded-t-md font-semibold">
                <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-lefttext-slate-800 uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
                  <span className="flex items-center gap-20">
                    <span>User Name</span>
                  </span>
                </th>
                <th className="px-2 py-4 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                  User Email
                </th>
                <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                  ammount
                </th>
                <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                  transactionId
                </th>
                <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                  badge
                </th>
              </tr>
            </thead>

            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan={5} className="">
                    <div className="text-slate-800 m-14 text-center w-[60px] h-[60px] flex items-center justify-center text-8xl mx-auto">
                      <ImSpinner3 className="animate-spin" />
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : data?.length < 1 ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="">
                    <div className="text-slate-800 m-14 text-center border border-red-500 rounded-md p-5 max-w-[700px] text-3xl md:text-5xl mx-auto">
                      <h1>No one has made any payment yet!</h1>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-slate-700">
                {data?.map((dta) => (
                  <tr key={dta._id} className="hover:bg-slate-200">
                    <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200 max-w-56">
                      <div className="flex items-center w-full">
                        <div className="min-w-48">
                          <div className="text-sm font-medium leading-5 w-full capitalize">
                            {dta?.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 ">
                        <p className="">{dta?.email}</p>
                      </div>
                    </td>
                    <td className="px-2 py-7 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-center">
                        <p>${dta?.ammount}</p>
                      </div>
                    </td>
                    <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="leading-5 flex justify-center">
                        <p>{dta?.transactionId}</p>
                      </div>
                    </td>

                    <td className="px-2 py-4 text-sm leading-5 max-w-56 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center justify-center gap-2 capitalize">
                        <span
                          className={`px-3 rounded-full font-medium ${
                            dta?.badge === 'Silver'
                              ? 'bg-purple-100 text-purple-800'
                              : dta?.badge === 'Gold'
                              ? 'bg-yellow-100 text-green-800'
                              : 'bg-green-100 text-yellow-800'
                          }`}
                        >
                          {dta?.badge}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllPayments;
