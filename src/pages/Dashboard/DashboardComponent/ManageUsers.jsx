import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { ImSpinner3 } from 'react-icons/im';
import toast from 'react-hot-toast';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import UsersBadgeFilter from '../../../utility/UsersBadgeFilter';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const ManageUsers = () => {
  const [viewBtn, setViewBtn] = useState(null);
  const axioss = useAxiosSec();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [filter, handleFilter] = useState('');

  // Pagination
  const [itemsPerPage, setItemperpage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: totalDta = {} } = useQuery({
    queryKey: ['totalDta', search, filter, itemsPerPage, currentPage],
    queryFn: async () => {
      const { data } = await axioss.get(`/total-users`);
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

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users', search, filter, itemsPerPage, currentPage],
    queryFn: async () => {
      const { data } = await axioss.get(
        `/users?search=${search}&filter=${filter}&perpage=${itemsPerPage}&currentpage=${currentPage}`
      );
      return data;
    },
  });

  const handleChange = (e) => {
    const data = parseInt(e.target.value);
    console.log(data);
    setItemperpage(data);
    setCurrentPage(0);
  };

  // Handle admin ======
  const { mutateAsync } = useMutation({
    mutationFn: async (dta) => {
      console.log(dta[0], dta[1]);
      const { data } = await axioss.patch(
        `/change-user-role?role=${dta[0]}&id=${dta[1]}`
      );
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries(['users']);
      console.log('Updated Role');
    },
  });
  const handleAddAdmin = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to admin ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Add Admin!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(['admin', id]);
        toggle(id);
        toast.success('Successfully Admin.');
      }
    });
  };
  const handleRemoveAdmin = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to remove admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove Admin!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(['user', id]);
        toast.success('Successfully Remove Admin');
        toggle(id);
      }
    });
  };
  if (isError || error) {
    Swal.fire({
      title: 'Network Error',
      text: `Check network, ${error.message}`,
    });
  }

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
    <div className="p-5">
      <h1 className="text-3xl text-slate-800 font-bold pb-4 pt-3">All Users</h1>

      <div className="w-full flex flex-col gap-2 md:gap-4 md:flex-row items-center justify-between pb-4">
        <div className="w-full md:w-auto">
          <UsersBadgeFilter handleFilter={handleFilter} />
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
              placeholder="Search username or email"
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
      <div className="flex flex-col">
        <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50 flex items-center gap-16">
                    <span></span>
                    <span>Name</span>
                  </th>
                  <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Email
                  </th>
                  <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Badge
                  </th>

                  <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Role
                  </th>
                  <th className="px-2 py-3 border-b border-gray-200 bg-gray-50"></th>
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
              ) : users?.length < 1 ? (
                <tbody>
                  <tr>
                    <td colSpan={5} className="">
                      <div className="text-slate-800 m-14 text-center border border-red-500 rounded-md p-5 max-w-[700px] text-3xl md:text-5xl mx-auto">
                        <h1>
                          No such users were found according to your search!
                        </h1>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="bg-white">
                  {users.map((dta) => (
                    <tr key={dta._id} className="hover:bg-slate-200">
                      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={dta?.userPhoto}
                              alt=""
                            />
                          </div>

                          <div className="ml-4">
                            <div className="text-sm font-medium leading-5 text-gray-900 min-w-32">
                              {dta?.userName}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-900">
                          {dta?.userEmail}
                        </div>
                      </td>

                      <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                        <span className="inline-flex px-2 text-sm font-medium rounded-full">
                          <span
                            className={`px-3 rounded-full font-medium ${
                              dta?.badge === 'Silver'
                                ? 'bg-lime-200 text-purple-800'
                                : dta?.badge === 'Gold'
                                ? 'bg-yellow-100 text-green-800'
                                : dta?.badge === 'Platinum'
                                ? 'bg-green-100 text-yellow-800'
                                : 'bg-violet-200 text-slate-600'
                            }`}
                          >
                            {dta?.badge || 'Bronze'}
                          </span>
                        </span>
                      </td>

                      <td className="px-2 text-center py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200 capitalize">
                        <span className="rounded-full px-3 bg-cyan-600 text-white">
                          {dta.superPower ? dta.superPower : dta.role}
                        </span>
                      </td>

                      <td className="px-2 pr-7 relative py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                        <button
                          disabled={dta.superPower}
                          onClick={() => toggle(dta._id)}
                          className={
                            dta.superPower
                              ? 'text-slate-300'
                              : `text-indigo-600 hover:text-indigo-900 text-xl`
                          }
                        >
                          <BsThreeDotsVertical />
                        </button>

                        {viewBtn === dta._id && (
                          <div className="absolute z-20 top-1/2 -translate-y-1/2 right-12 b border rounded-md border-slate-300 p-1 flex items-center gap-2">
                            <div
                              className="p-1 text-lg cursor-pointer rounded-full text-red-500 border-2 border-slate-500 bg-white"
                              onClick={() => toggle(dta._id)}
                            >
                              <IoClose />
                            </div>

                            {dta.role === 'admin' ? (
                              <button
                                onClick={() => handleRemoveAdmin(dta._id)}
                                className="font-bold py-2  w-36 bg-white shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md"
                              >
                                Remove Admin
                              </button>
                            ) : (
                              <button
                                onClick={() => handleAddAdmin(dta._id)}
                                className="font-bold py-2 w-28 bg-white shadow-md shadow-slate-400 hover:shadow-slate-600 rounded-md"
                              >
                                Add Admin
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}

              {!filter && (
                <tfoot>
                  {!search && (
                    <tr>
                      <td colSpan={5} className="py-3 px-3 ">
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
                  )}
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
