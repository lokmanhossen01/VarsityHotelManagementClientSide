import { FaRegEdit } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../../Hooks/useAxiosSec';

const ProfileUSer = () => {
  const { userDta } = useAuth();
  const axiosSec = useAxiosSec();
  const { data: ddaata = [] } = useQuery({
    queryKey: ['payment', userDta.email],
    queryFn: async () => {
      const { data } = await axiosSec.get(`/paymentss/${userDta.email}`);
      // console.log(data);
      return data;
    },
  });
  const badgeName = ddaata[0]?.badge || 'Not Pay';
  return (
    <div>
      <div className="bg-white w-full rounded-md h-64 md:h-72 mt-6 min-w-[800px] overflow-x-auto">
        <div
          className="rounded-t-md h-4/6 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/m5bNcBZ/dsfeee-min.png')`,
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
          <div className="bg-yellow-400 px-3 rounded-full">
            {badgeName} User
          </div>
          <div className="flex flex-row items-center gap-4 md:gap-4 h-full">
            <div className="border-2 shadow shadow-yellow-500 rounded-md p-1 h-5/6">
              <img
                className="max-h-full"
                src="https://i.ibb.co/4YBQMrT/bronze-badge.png"
                alt=""
              />
            </div>
            <button className="hidden sm:block py-1.5 px-3 md:px-5 rounded-md bg-pClr text-white font-bold">
              Edit Profile
            </button>
            <button className="sm:hidden text-xl">
              <FaRegEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUSer;
