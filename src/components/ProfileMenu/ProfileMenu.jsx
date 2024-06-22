import { NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { GoPlus } from 'react-icons/go';
import { LuLogOut } from 'react-icons/lu';
import Swal from 'sweetalert2';
import { CgProfile } from 'react-icons/cg';

const ProfileMenu = () => {
  const { userDta, logOutAcc } = useAuth();
  const logout = () => {
    logOutAcc();
    Swal.fire({
      title: 'Logged Out',
      text: 'Your account has been successfully logged out.',
      icon: 'success',
    });
  };
  return (
    <div className="group relative cursor-pointer">
      <div className="flex items-center justify-between w-full text-center text-white duration-200">
        <div className="relative group">
          <img
            className="size-[60px] bg-slate-500 object-cover rounded-full border-4 border-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)]"
            src={
              userDta.photoURL
                ? userDta.photoURL
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            alt="avatar navigate ui"
          />
          <span className="size-5 bg-white p-[2px] shadow-[0px_2px_8px_0px_rgba(99,99,99,0.4)]  group-hover:-rotate-180 duration-500 absolute rounded-full -bottom-2 left-[50%] -translate-x-1/2 text-red-800">
            <GoPlus />
          </span>
        </div>
      </div>
      <div className="invisible right-0 absolute z-50 flex min-w-48 flex-col bg-gray-500 shadow-4xl group-hover:visible text-center">
        <div>
          <h1 className="py-2 text-xl font-semibold bg-slate-800 text-white px-3">
            {userDta.displayName ? userDta.displayName : 'User Name'}
          </h1>
        </div>
        <NavLink
          to={'/dashboard'}
          className="font-semibold border-b py-3 tracking-widest flex items-center justify-center gap-1 hover:shadow hover:shadow-slate-200"
        >
          <span className="text-2xl">
            <CgProfile />
          </span>
          My Dashboard
        </NavLink>
        <button
          onClick={logout}
          className="hover:bg-[#c52323] font-semibold border-b bg-sClr py-3 tracking-widest flex items-center justify-center gap-3 hover:shadow hover:shadow-slate-200"
        >
          <span className="text-2xl">
            <LuLogOut />
          </span>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
