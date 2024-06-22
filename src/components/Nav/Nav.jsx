import { useState } from 'react';
import { CgMenuRightAlt } from 'react-icons/cg';
import { Link, NavLink } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import useAuth from '../../Hooks/useAuth';
import { IoNotifications } from 'react-icons/io5';

const Nav = () => {
  const [menu, setMenu] = useState(false);
  const { userDta, isLoading } = useAuth();
  // console.log(userDta);
  const isAdmin = false;
  // console.log(isAdmin);

  return (
    <div className=" flex justify-between items-center w-11/12 xl:w-10/12 mx-auto">
      <Link to={'/'} className="text-3xl font-bold w-32 ">
        <img className="max-h-14" src="logo.png" alt="" />
      </Link>
      <div className="hidden md:flex gap-5 items-center navigation">
        <NavLink className="py-2 px-5 rounded-md " to={'/'}>
          Home
        </NavLink>
        <NavLink className="py-2 px-5 rounded-md " font-medium to={'/meals'}>
          Meals
        </NavLink>
        {isAdmin ? (
          <NavLink
            className="py-2 px-5 rounded-md "
            font-medium
            to={'/Dashboard'}
          >
            Dashboard
          </NavLink>
        ) : (
          <NavLink
            className="py-2 px-5 rounded-md "
            font-medium
            to={'/upcoming-meals'}
          >
            Upcoming Meals
          </NavLink>
        )}
      </div>
      <div className="flex gap-2 sm:gap-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center relative pr-2 sm:pr-0 hover:-translate-y-1 duration-300">
            <button className="text-3xl">
              <IoNotifications />
            </button>

            <span className="absolute -top-3 -right-1.5 sm:-right-2.5 bg-pClr rounded-full px-1.5 font-semibold text-sm">
              10
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="py-2 w-[60px] h-[60px] flex items-center justify-center text-5xl text-white">
            <ImSpinner9 className="animate-spin" />
          </div>
        ) : userDta ? (
          <ProfileMenu />
        ) : (
          <NavLink to={'/login'}>
            <button className="py-2 px-3 sm:px-6 shadow-md shadow-slate-200 hover:shadow-slate-200 hover:shadow-lg hover:scale-110 duration-300 rounded text-slate-100 font-bold">
              Join Us
            </button>
          </NavLink>
        )}
        <button
          onClick={() => setMenu(!menu)}
          className="text-3xl sm:text-4xl md:hidden"
        >
          <CgMenuRightAlt />
        </button>
        {menu && (
          <div className="absolute top-12 w-44 rounded-md p-5 right-0 bg-slate-600 md:hidden flex flex-col gap-5 items-center navigation">
            <NavLink
              onClick={() => setMenu(!menu)}
              className="py-2 w-full text-center rounded-md shadow-md shadow-slate-200 text-white font-medium hover:shadow-lg hover:shadow-slate-200 hover:scale-110 duration-300"
              to={'/'}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setMenu(!menu)}
              className="py-2 w-full text-center rounded-md "
              font-medium
              to={'/meals'}
            >
              Meals
            </NavLink>
            <NavLink
              onClick={() => setMenu(!menu)}
              className="py-2 w-full text-center rounded-md "
              font-medium
              to={'/upcoming-meals'}
            >
              Upcoming Meals
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
