import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import { ImSpinner3 } from 'react-icons/im';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import UpdateMeal from './UpdateMeal';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import FilterLikeReview from '../../../utility/FilterLikeReview';

const AllMeals = () => {
  const axiosSec = useAxiosSec();
  const [viewBtn, setViewBtn] = useState(null);
  const [modal, setModal] = useState(false);
  const [dtaFilter, setDtaFilter] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, handleFilter] = useState('');
  // Pagination
  const [itemsPerPage, setItemperpage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: totalDta = {} } = useQuery({
    queryKey: ['totalmeals', filter, search, itemsPerPage, currentPage],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/total-meals`);
      return data;
    },
  });
  console.log(totalDta?.count);
  const count = totalDta?.count || 0;
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];
  // console.log(pages);

  const toggle = (id) => {
    if (viewBtn === id) {
      setViewBtn(null);
    } else {
      setViewBtn(id);
    }
  };

  let {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['meals', filter, search, itemsPerPage, currentPage],
    queryFn: async () => {
      const { data } = await axiosSec.get(
        `/all-meals?search=${search}&filter=${filter}&perpage=${itemsPerPage}&currentpage=${currentPage}`
      );
      // console.log(data);
      return data;
    },
  });
  // // console.log(data);
  // if (filter === 'like') {
  //   const likeFilter = data.sort((a, b) => {
  //     const datA = a.likes;
  //     const datB = b.likes;
  //     return datB - datA;
  //   });
  //   data = likeFilter;
  // } else if (filter === 'review') {
  //   const likeFilter = data.sort((a, b) => {
  //     const datA = a.likes;
  //     const datB = b.likes;
  //     return datB - datA;
  //   });
  //   data = likeFilter;
  // }

  const handleChange = (e) => {
    const data = parseInt(e.target.value);
    console.log(data);
    setItemperpage(data);
    setCurrentPage(0);
  };

  //   handleUpdate =====
  const handleUpdate = (id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setViewBtn(null);
    const filterUpdate = data.find((dta) => dta._id === id);
    setDtaFilter(filterUpdate);
    setModal(true);
    // console.log(filterUpdate);
  };

  // Delete review
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      // console.log('idddd', id);
      const { data } = await axiosSec.delete(`/delete-meal/${id}`);
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      toast.success('Your Meal Deleted!');
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

  const handleSearchClick = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
  };

  return (
    <div className="relative min-h-[500px] h-[800px]">
      {modal && (
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full h-full bg-slate-100 rounded-md z-30 p-3 md:p-6">
          <div className="mx-auto overflow-auto">
            <UpdateMeal
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

      <div>
        <h1 className="text-3xl text-slate-800 font-bold pb-4 pt-3">
          All Meals
        </h1>
        <div className="w-full flex flex-col gap-2 md:gap-4 md:flex-row items-center justify-between pb-4">
          <div className="w-full md:w-auto">
            <FilterLikeReview handleFilter={handleFilter} />
          </div>
          <div className="w-full md:w-auto">
            <form
              onSubmit={handleSearchClick}
              className="w-full md:w-auto relative"
            >
              <input
                onChange={handleSearch}
                type="text"
                name="search"
                placeholder="Search meals"
                className="rounded px-4 py-[7px] w-full md:w-80 max-w-full md:max-w-80 text-slate-600 focus:outline-none pr-20 border border-slate-400"
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 right-2 rounded-md bg-pClr text-slate-50 px-2 font-semibold"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        {/* table part */}
        <div className="w-full mx-auto ">
          {/* Table Part */}
          <div className="w-full mx-auto">
            <div className="overflow-x-auto rounded-md">
              <table className="border rounded-md w-full mb-14 min-w-[850px]">
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
                      Reviews
                    </th>
                    <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-center text-slate-800 uppercase border-b border-gray-200 bg-gray-50">
                      Distributor
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
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 flex justify-center">
                            <p>{dta?.review}</p>
                          </div>
                        </td>

                        <td className="px-2 py-4 text-sm leading-5 max-w-56 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center justify-center gap-2 capitalize">
                            <p>{dta?.adminName}</p>
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

                              <Link to={`/meal/${dta._id}`}>
                                <button className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md">
                                  View Meal
                                </button>
                              </Link>

                              <button
                                onClick={() => handleUpdate(dta._id)}
                                className="py-2 w-full shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md updateItem"
                              >
                                Edit Meal
                              </button>
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

                {!search && (
                  <tfoot>
                    <tr>
                      <td colSpan={6} className="py-3 px-3 ">
                        <div className="flex items-center justify-between">
                          <div className="bg-slate-400 flex items-center rounded-md px-2 gap-2">
                            <p className="">Items Per Page:</p>
                            <select
                              onChange={handleChange}
                              className="bg-transparent rounded-md focus:outline-none py-2 cursor-pointer"
                            >
                              <option selected={itemsPerPage === 5} value="5">
                                5
                              </option>
                              <option selected={itemsPerPage === 10} value="10">
                                10
                              </option>
                              <option selected={itemsPerPage === 20} value="20">
                                20
                              </option>
                              <option selected={itemsPerPage === 50} value="50">
                                50
                              </option>
                              <option
                                selected={itemsPerPage === 100}
                                value="100"
                              >
                                100
                              </option>
                            </select>
                          </div>

                          <div className="flex items-center justify-end">
                            <button
                              disabled={currentPage < 1}
                              onClick={() => setCurrentPage(currentPage - 1)}
                              className="py-2 px-4 bg-slate-400 border text-2xl rounded-l-md active:text-white active:bg-slate-800 hover:bg-slate-600 hover:text-white"
                            >
                              <MdKeyboardArrowLeft />
                            </button>
                            {pages.map((page) => (
                              <button
                                onClick={() => setCurrentPage(page)}
                                key={page}
                                className={`py-2 px-3 border active:text-white active:bg-slate-800 hover:bg-slate-600 hover:text-white ${
                                  currentPage === page
                                    ? 'bg-slate-800 text-white'
                                    : 'bg-slate-400'
                                }`}
                              >
                                {page + 1}
                              </button>
                            ))}
                            <button
                              disabled={currentPage > pages?.length - 2}
                              onClick={() => setCurrentPage(currentPage + 1)}
                              className="py-2 px-4 bg-slate-400 border text-2xl rounded-r-md active:text-white active:bg-slate-800 hover:bg-slate-600 hover:text-white"
                            >
                              <MdKeyboardArrowRight />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMeals;
