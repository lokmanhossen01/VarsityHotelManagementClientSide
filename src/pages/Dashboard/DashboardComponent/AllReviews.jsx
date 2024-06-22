import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import { ImSpinner3 } from 'react-icons/im';
import { Rating } from '@smastrom/react-rating';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const AllReviews = () => {
  const axiosSec = useAxiosSec();
  const [viewBtn, setViewBtn] = useState(null);

  const toggle = (id) => {
    if (viewBtn === id) {
      setViewBtn(null);
    } else {
      setViewBtn(id);
    }
  };

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/reviews`);
      // console.log(data);
      return data;
    },
  });
  // console.log(data);

  // Delete review
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      console.log('idddd', id);
      const { data } = await axiosSec.delete(`/delete-review/${id}`);
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      toast.success('Your Review Deleted!');
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
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(id);
      }
    });
  };

  return (
    <div className="relative min-h-[500px] h-[calc(100vh-100px)]">
      <div>
        <h1 className="text-3xl text-slate-800 font-bold pb-4 pt-3">
          All Reviews
        </h1>
        {/* table part */}
        <div className="w-full mx-auto ">
          {/* Table Part */}
          <div className="w-full mx-auto">
            <div className="overflow-x-auto rounded-md">
              <table className="border rounded-md w-full min-w-[1000px]">
                <thead className="rounded-t-md">
                  <tr className="rounded-t-md font-semibold">
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-lefttext-slate-800 uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
                      <span className="flex items-center gap-20">
                        <span>Image</span>
                        <span>Meal Title</span>
                      </span>
                    </th>
                    <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                      Like
                    </th>
                    <th className="py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                      Total Review
                    </th>
                    <th className="py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                      Rating
                    </th>
                    <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                      Reviews
                    </th>
                    <th className="py-3 text-xs font-medium leading-4 tracking-wider text-center uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
                      Action
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
                          <h1>You have not review any meals yet!</h1>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody className="text-slate-700">
                    {data?.map((dta) => (
                      <tr key={dta._id} className="hover:bg-slate-200">
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 max-w-56">
                          <div className="flex items-center w-full">
                            <div
                              className="flex-shrink-0 w-24 h-20 rounded-md bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${
                                  dta?.image1 ||
                                  'https://i.ibb.co/M25xNSN/sdf.jpg'
                                })`,
                              }}
                            />

                            <div className="ml-4 min-w-44">
                              <div className="text-sm font-medium leading-5 w-full">
                                {dta?.postTitle}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 min-w-16 whitespace-no-wrap border-b border-gray-200 text-center">
                          <div className="text-sm leading-5 ">
                            <p>{dta?.postLike}</p>
                          </div>
                        </td>
                        <td className="text-center py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 ">
                            <p>{dta?.postReviewCount}</p>
                          </div>
                        </td>
                        <td className=" py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 flex justify-center">
                            <Rating
                              style={{ maxWidth: 100 }}
                              value={dta?.rating || 0}
                              readOnly
                            />
                          </div>
                        </td>

                        <td className="px-2 py-4 text-sm leading-5 max-w-56 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center justify-center gap-2 capitalize">
                            <p>{dta?.detail?.slice(0, 80)}.....</p>
                          </div>
                        </td>

                        <td className="text-center border-b border-gray-200 relative">
                          <button
                            onClick={() => toggle(dta._id)}
                            className={`text-xl text-indigo-600 hover:text-indigo-900`}
                          >
                            <BsThreeDotsVertical />
                          </button>

                          {viewBtn === dta._id && (
                            <div className="absolute z-20 top-auto bottom-auto right-[50px] w-36 border border-stone-600 rounded-md p-1 bg-white">
                              <div
                                className="-translate-x-9 -translate-y-1 absolute p-1 text-lg cursor-pointer rounded-full text-red-500 border-2 border-slate-500"
                                onClick={() => toggle(dta._id)}
                              >
                                <IoClose />
                              </div>

                              <Link to={`/meal/${dta.postId}`}>
                                <button className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md">
                                  View Meal
                                </button>
                              </Link>

                              <button
                                onClick={() => handleDelete(dta._id)}
                                className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md bg-red-500 text-white mt-2"
                              >
                                Delete
                              </button>
                            </div>
                          )}
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
    </div>
  );
};

export default AllReviews;
