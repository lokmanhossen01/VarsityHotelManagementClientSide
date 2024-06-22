import { FaArrowLeft, FaFirstOrder, FaHome, FaUsersCog } from 'react-icons/fa';
import { LuGalleryHorizontalEnd, LuLogOut } from 'react-icons/lu';
import {
  MdAddChart,
  MdAdminPanelSettings,
  MdDashboardCustomize,
  MdPayments,
  MdReviews,
  MdUpcoming,
} from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Toaster } from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import useAdmin from '../../Hooks/useAdmin';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiFunctionAddFill } from 'react-icons/ri';
import { BiSolidDonateHeart } from 'react-icons/bi';
import { GiHotMeal } from 'react-icons/gi';

const Dashboard = () => {
  const admin = useAdmin();
  const [isMnu, setMenu] = useState(false);
  const { logOutAcc, userDta } = useAuth();
  const logout = () => {
    logOutAcc();
    Swal.fire({
      title: 'Logged Out',
      text: 'Your account has been successfully logged out.',
      icon: 'success',
    });
  };

  return (
    <div className="lg:flex lg:flex-row h-screen overflow-hidden relative">
      <Toaster />
      <aside
        className={`h-screen z-50 lg:h-auto absolute left-0 top-0 lg:static w-full sm:w-72 lg:w-64 bg-gray-800 text-white lg:flex flex-col items-center p-4 md:h-full overflow-y-auto ${
          isMnu
            ? 'translate-x-0 duration-700'
            : '-translate-x-[700px] lg:translate-x-0 duration-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <img className="max-h-16" src="/logo.png" alt="" />
          {isMnu && (
            <button
              onClick={() => setMenu(false)}
              className="text-2xl lg:hidden bg-slate-600 p-2 rounded-full"
            >
              <FaArrowLeft />
            </button>
          )}
        </div>
        <nav className="w-full">
          <div className="w-full h-[1px] bg-slate-500 mb-5 mt-7" />
          <ul className="list-none p-0 dashboardNav">
            {admin ? (
              <>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard'}
                    end
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <MdAdminPanelSettings />
                    Admin Profile
                  </NavLink>
                </li>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard/Manage-Users'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaUsersCog />
                    Manage Users
                  </NavLink>
                </li>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard/Add-Meal'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <RiFunctionAddFill />
                    Add New Meal
                  </NavLink>
                </li>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard/All-Meals'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <LuGalleryHorizontalEnd />
                    All Meals
                  </NavLink>
                </li>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard/All-Reviews'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <MdReviews />
                    All Reviews
                  </NavLink>
                </li>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard/Serve-Meals'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <BiSolidDonateHeart />
                    Serve Meals
                  </NavLink>
                </li>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard/Upcoming-Meals'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <MdUpcoming />
                    Upcoming Meals
                  </NavLink>
                </li>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard/all-payments'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <MdPayments />
                    All Payments
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    end
                    to={'/dashboard'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <MdDashboardCustomize />
                    My Profile
                  </NavLink>
                </li>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard/Requested-Mealss'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <FaFirstOrder />
                    Requested Meals
                  </NavLink>
                </li>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard/My-Reviews'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <MdAddChart />
                    My Reviews
                  </NavLink>
                </li>
                <li className="w-full mb-2" onClick={() => setMenu(false)}>
                  <NavLink
                    to={'/dashboard/Payment-History'}
                    className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
                  >
                    <MdPayments />
                    Payment History
                  </NavLink>
                </li>
              </>
            )}
            <div className="w-full h-[1px] bg-slate-500 my-5" />
            <li className="w-full mb-2" onClick={() => setMenu(false)}>
              <Link
                to={'/'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <FaHome />
                Home
              </Link>
            </li>
            <li className="w-full mb-2" onClick={() => setMenu(false)}>
              <Link
                to={'/meals'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <GiHotMeal />
                Meals
              </Link>
            </li>
            <li className="w-full mb-2" onClick={() => setMenu(false)}>
              <Link
                to={'/upcoming-meals'}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <MdUpcoming />
                Upcoming Meals
              </Link>
            </li>
            <li className="w-full mb-2" onClick={() => setMenu(false)}>
              <button
                onClick={logout}
                className="w-full px-4 py-2 hover:bg-gray-700 flex items-center gap-2"
              >
                <LuLogOut />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main
        id="dashboarMain"
        className="flex-grow h-full overflow-y-auto bg-gray-100 p-4"
      >
        <div className="flex items-center justify-between mb-3 bg-white px-2 py-1 rounded-md">
          <div className="flex items-center gap-2">
            <button onClick={() => setMenu(!isMnu)} className="text-3xl">
              <IoMenu />
            </button>
            {/* <button
              onClick={() => setMenu(false)}
              className="text-3xl hidden lg:block"
            >
              <IoMenu />
            </button> */}
            <input
              type="text"
              className="py-2 px-3 rounded-md border border-slate-400 outline-none focus:outline-none"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl rounded-full p-2 bg-slate-200">
              <IoMdNotificationsOutline />
            </span>
            <div className="relative cursor-pointer">
              <img
                className="h-12 w-12 rounded-full"
                src={
                  userDta.photoURL
                    ? userDta.photoURL
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                }
                alt=""
              />
              <div className="p-1 bg-green-500 absolute rounded-full bottom-0 right-0 border-2 border-slate-100"></div>
            </div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
