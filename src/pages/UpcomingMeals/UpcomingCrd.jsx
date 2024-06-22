import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
import { TbShare } from 'react-icons/tb';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import usePayment from '../../Hooks/usePayment';
import Swal from 'sweetalert2';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../Hooks/useAxiosSec';
import useAxiosPub from '../../Hooks/useAxiosPub';

const UpcomingCrd = ({ dta, refetch }) => {
  const { userDta } = useAuth();
  const naviget = useNavigate();
  const axiosSec = useAxiosSec();
  const axiosPub = useAxiosPub();
  const isPay = usePayment();
  const [clicked, setClicked] = useState(false);

  const { data: likedCount = {}, refetch: counted } = useQuery({
    queryKey: ['liked', dta._id],
    queryFn: async () => {
      const { data } = await axiosPub.get(
        `/liked-count?id=${dta._id}&email=${userDta?.email}`
      );
      return data;
    },
  });
  //   console.log(likedCount, 'Like COunt ==========');

  const { mutateAsync } = useMutation({
    mutationFn: async (countData) => {
      const { data } = await axiosSec.put('/like-count-upcoming', countData);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      refetch();
      counted();
    },
  });

  const handleClick = async () => {
    if (!userDta) {
      Swal.fire({
        title: 'You Are Not Login!',
        text: 'You are not logged in, please ensure your account by logging in first.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'I want to login my account',
      }).then(async (result) => {
        if (result.isConfirmed) {
          naviget('/login');
        }
      });
      return;
    }
    if (!isPay) {
      Swal.fire({
        title: 'You have not subscription!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'I want to subscription',
      }).then(async (result) => {
        if (result.isConfirmed) {
          naviget('/#package');
        }
      });
      return;
    }

    setClicked(!clicked);

    const newLikeState = !clicked;
    const id = dta._id;
    const email = userDta?.email;
    const count = newLikeState ? 1 : -1;
    const liked = newLikeState ? 1 : 0;
    const countData = { id, count, email, liked };
    await mutateAsync(countData);
  };

  return (
    <div
      key={dta._id}
      className=" mx-auto max-w-[390px] w-full rounded-lg bg-white font-sans shadow-lg dark:bg-[#18181B]"
    >
      {/* Post Image */}
      <div className="flex flex-col gap-1">
        <div
          className="w-full bg-cover h-52 bg-center rounded-t-md"
          style={{
            backgroundImage: `url(${
              dta?.mealImage || 'https://i.ibb.co/t8j2kD5/sdfsaf.jpg'
            })`,
          }}
        ></div>
      </div>
      {/* Post content */}
      <div className="mt-3 space-y-2 px-4 min-h-24">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white/90">
          {dta?.title}
        </h2>
        <h2 className="text-sm text-gray-500 dark:text-white/50">
          {dta?.description.slice(0, 110)}...{' '}
          <span className="cursor-pointer text-[#3e96d4]">See more</span>
        </h2>
      </div>
      {/* icons */}
      <div className="mt-4 flex justify-between px-4 pb-4">
        <div
          onClick={() => handleClick(dta._id)}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          {likedCount ? (
            <span className="text-3xl hover:scale-125 duration-300 text-pClr">
              <RiHeart2Fill />
            </span>
          ) : (
            <span className="text-3xl hover:scale-125 duration-300 hover:text-pClr ">
              <RiHeart2Line />
            </span>
          )}
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white/90">
            {dta?.likes}
          </h2>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl">
            <TbShare />
          </span>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white/90">
            34
          </h2>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-[27px]">
            <BiMessageRoundedDots />
          </span>
          <h2 className="text-lg font-semibold text-slate-800 dark:text-white/90">
            40
          </h2>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCrd;
UpcomingCrd.propTypes = {
  dta: PropTypes.object,
  refetch: PropTypes.func,
};
