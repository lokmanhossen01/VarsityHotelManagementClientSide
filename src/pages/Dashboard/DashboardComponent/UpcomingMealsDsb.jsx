import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import { ImSpinner3 } from 'react-icons/im';
import { useState } from 'react';
import { IoTrashBin } from 'react-icons/io5';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { TbEdit } from 'react-icons/tb';
import UpcomingMealUpdate from './UpcomingMealUpdate';
import AddMeals from './AddMeals';

const UpcomingMealsDsb = () => {
  const axiosSec = useAxiosSec();
  const [modal, setModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [dtaFilter, setDtaFilter] = useState(null);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['upcoming-meals'],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/upcoming-meals`);
      // console.log(data);
      return data;
    },
  });
  // console.log(data);

  //   handleUpdate =====
  const handleUpdate = (id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const filterUpdate = data.find((dta) => dta._id === id);
    setDtaFilter(filterUpdate);
    setModal(true);
    // console.log(filterUpdate);
  };
  const handleUpcomingAdd = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAddModal(true);
    // console.log(filterUpdate);
  };

  // Delete review
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      // console.log('idddd', id);
      const { data } = await axiosSec.delete(`/delete-upcoming-meal/${id}`);
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      toast.success('Upcoming Meal Deleted!');
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

  // Post new review
  const { mutateAsync: publishAsync } = useMutation({
    mutationFn: async (datas) => {
      const { data } = await axiosSec.post('/post-meal', datas);
      console.log('==============>', data);
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Good Job!',
        text: 'Your meal has been successfully Published!',
        icon: 'success',
      });
    },
  });

  const handlePublish = async (dta) => {
    const id = dta._id;
    const datas = dta;
    delete datas._id;

    await publishAsync(datas);
    await mutateAsync(id);
    // console.log(datas);
    // console.log(id);
  };
  const handleNotPublish = () => {
    Swal.fire({
      title: 'Oppss Sorry !',
      text: "You won't be able to publish it until you get a minimum of 10 likes!",
      icon: 'warning',
    });
  };
  return (
    <div className="relative min-h-[500px] h-[800px]">
      {modal && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-slate-100 rounded-md z-30 p-3 md:p-6">
          <div className="mx-auto overflow-auto">
            <UpcomingMealUpdate
              dtaFilter={dtaFilter}
              refetch={refetch}
              modal={setModal}
            />
          </div>
        </div>
      )}
      {modal && (
        <div
          onClick={() => setModal(false)}
          className="w-full h-full absolute bg-[#0000003b] rounded-md"
        ></div>
      )}
      {addModal && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-slate-100 rounded-md z-30 p-3 md:p-6">
          <div className="mx-auto overflow-auto">
            <AddMeals refetch={refetch} modal={setAddModal} />
          </div>
        </div>
      )}
      {addModal && (
        <div
          onClick={() => setAddModal(false)}
          className="w-full h-full absolute bg-[#0000003b] rounded-md"
        ></div>
      )}

      <div>
        <div className="w-full flex items-center justify-between">
          <h1 className="text-3xl text-slate-800 font-bold pb-4 pt-3">
            Upcoming Meals
          </h1>
          <button
            onClick={handleUpcomingAdd}
            className="py-2 px-4 rounded-md bg-pClr text-white font-bold"
          >
            Add Upcoming Meal
          </button>
        </div>
        {/* table part */}
        <div className="w-full mx-auto ">
          {/* Table Part */}
          <div className="w-full mx-auto">
            <div className="overflow-x-auto rounded-md">
              <table className="border rounded-md w-full min-w-[850px]">
                <thead className="rounded-t-md">
                  <tr className="rounded-t-md font-semibold">
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-lefttext-slate-800 uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
                      <span className="flex items-center gap-20">
                        <span>Image</span>
                        <span>Meal Title</span>
                      </span>
                    </th>
                    <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                      Meal Type
                    </th>
                    <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-left text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                      Like
                    </th>
                    <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                      Distributor
                    </th>
                    <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                      Publish
                    </th>
                    <th className="py-3 text-xs font-medium leading-4 tracking-wider text-center uppercase border-b border-gray-200 bg-gray-50 text-slate-800">
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
                          <h1 className="font-bold">
                            You have not added any upcomig meals yet!
                          </h1>
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
                              className="flex-shrink-0 w-28 h-24 rounded-md bg-cover bg-center bg-no-repeat"
                              style={{
                                backgroundImage: `url(${
                                  dta?.mealImage ||
                                  'https://i.ibb.co/M25xNSN/sdf.jpg'
                                })`,
                              }}
                            />

                            <div className="ml-4 min-w-48">
                              <div className="text-sm font-medium leading-5 w-full">
                                {dta?.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 ">
                            <p className="capitalize">{dta?.mealType}</p>
                          </div>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 ">
                            <p>{dta?.likes}</p>
                          </div>
                        </td>

                        <td className="px-2 py-4 text-sm leading-5 max-w-56 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center justify-center gap-2 capitalize">
                            <p>{dta?.adminName}</p>
                          </div>
                        </td>

                        <td className="px-2 py-4 text-sm leading-5 max-w-56 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center justify-center gap-2 capitalize">
                            {dta?.likes < 10 ? (
                              <button
                                onClick={handleNotPublish}
                                className="py-2 px-5 rounded-md bg-green-500 text-white outline-none font-bold hover:scale-110 duration-300 active:scale-95"
                              >
                                Publish
                              </button>
                            ) : (
                              <button
                                disabled={dta?.likes < 10}
                                onClick={() => handlePublish(dta)}
                                className="py-2 px-5 rounded-md bg-green-500 text-white outline-none font-bold hover:scale-110 duration-300 active:scale-95"
                              >
                                Publish
                              </button>
                            )}
                          </div>
                        </td>

                        <td className="text-center border-b border-gray-200">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleUpdate(dta._id)}
                              className="font-semibold w-10 text-center text-2xl flex justify-center rounded-full px-2 py-1"
                            >
                              <TbEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(dta._id)}
                              className="font-semibold w-10 text-center text-2xl flex justify-center rounded-full px-2 py-1 text-red-500"
                            >
                              <IoTrashBin />
                            </button>
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
      </div>
    </div>
  );
};

export default UpcomingMealsDsb;
