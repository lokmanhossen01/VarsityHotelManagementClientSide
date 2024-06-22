import { FaRegEdit } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';

const AdminProfile = () => {
  const { userDta } = useAuth();
  return (
    <div>
      <div className="bg-white w-full rounded-md h-64 md:h-72 mt-6">
        <div
          className="rounded-t-md h-4/6 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/s9StCs7/cvr-min.png')`,
          }}
        ></div>
        <div className="flex items-center justify-between px-1 sm:px-4 h-1/3">
          <div className="flex relative gap-2">
            <div
              className="bg-center bg-cover rounded-md h-20 md:h-28 w-20 md:w-28 absolute bottom-0 left-0 bg-slate-400 border-4 border-white"
              style={{ backgroundImage: `url(${userDta?.photoURL})` }}
            />
            <div className="w-20 md:w-28" />
            <div>
              <h1 className="text-slate-800 font-bold text-xl md:text-2xl capitalize">
                {userDta?.displayName}
              </h1>
              <h3 className="text-slate-400 text-sm md:text-base">
                {userDta?.email}
              </h3>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 md:gap-4">
            <div className="flex items-center">
              <div
                className="flex flex-col items-center border-r-2
              pr-2 md:pr-4"
              >
                <h1 className="text-xl md:text-3xl font-bold text-slate-800">
                  43
                </h1>
                <span className="text-slate-400 text-sm md:text-base">
                  Meals Added
                </span>
              </div>
              <div
                className="hidden sm:flex flex-col items-center border-r-2
               px-2 md:px-4"
              >
                <h1 className="text-xl md:text-3xl font-bold text-slate-800">
                  243
                </h1>
                <span className="text-slate-400 text-sm md:text-base">
                  Views
                </span>
              </div>
            </div>
            <button className="hidden sm:block py-1.5 px-3 md:px-5 rounded-md bg-pClr text-white font-bold">
              Edit Profile
            </button>
            <button className="sm:hidden text-xl">
              <FaRegEdit />
            </button>
          </div>
        </div>
        <div className='border py-9 mt-5 rounded-md'>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
