import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import useAuth from '../../../Hooks/useAuth';
import { ImCancelCircle, ImSpinner3 } from 'react-icons/im';
import { Rating } from '@smastrom/react-rating';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const RequestedMeals = () => {
  const { userDta } = useAuth();
  const axiosSec = useAxiosSec();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['request-meals'],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/request-meals/${userDta.email}`);
      console.log(data);
      return data;
    },
  });
  // console.log(data);

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      console.log('idddd', id);
      const { data } = await axiosSec.delete(`/cancel-req/${id}`);
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      toast.success('Meal Request Cancel!');
    },
  });

  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(id);
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-slate-800 font-bold pb-4 pt-3">
        My Requested Meals
      </h1>
      {/* table part */}
      <div className="w-full mx-auto ">
        {/* Table Part */}
        <div className="w-full mx-auto">
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full border rounded-md">
              <thead className="rounded-t-md">
                <tr className="rounded-t-md font-semibold">
                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-lefttext-slate-800 uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
                    <span className="flex items-center gap-20">
                      <span>Image</span>
                      <span>Meal Title</span>
                    </span>
                  </th>
                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                    Ingredients
                  </th>

                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                    Like
                  </th>
                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                    Reviews
                  </th>
                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                    Status
                  </th>

                  <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-left  uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
                    Action
                  </th>
                </tr>
              </thead>

              {isLoading ? (
                <tbody>
                  <tr>
                    <td colSpan={6} className="">
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
                        <h1>You have not requested any meals yet!</h1>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="text-slate-700">
                  {data?.map((dta) => (
                    <tr key={dta._id} className="hover:bg-slate-200">
                      <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 max-w-[450px]">
                        <div className="flex items-center">
                          <div
                            className="flex-shrink-0 w-24 h-20 rounded-md bg-cover bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${
                                dta?.mealImage ||
                                'https://i.ibb.co/M25xNSN/sdf.jpg'
                              })`,
                            }}
                          />

                          <div className="ml-4 w-full">
                            <div className="text-sm font-medium leading-5 w-full">
                              {dta?.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 min-w-40 max-w-72">
                        <div className="text-sm leading-5 ">
                          <p>
                            {dta?.ingredients?.map((d, i) => (
                              <span key={i}>{d}, </span>
                            ))}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 ">
                          <p>{dta?.likes}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 ">
                          <Rating
                            style={{ maxWidth: 100 }}
                            value={dta?.rating || 0}
                            readOnly
                          />
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm leading-5  whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center justify-center gap-2 capitalize">
                          <div
                            className={
                              dta.status === 'pending'
                                ? 'h-3 w-3 rounded-full bg-[#F97316]'
                                : dta.status === 'processing'
                                ? 'h-3 w-3 rounded-full bg-yellow-400'
                                : 'h-3 w-3 rounded-full bg-[#10B981]'
                            }
                          ></div>
                          {dta?.status}
                        </div>
                      </td>

                      <td className="text-center border-b border-gray-200">
                        <button
                          onClick={() => handleDelete(dta._id)}
                          className="text-2xl text-red-500 hover:scale-125 duration-300"
                        >
                          <ImCancelCircle />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedMeals;
