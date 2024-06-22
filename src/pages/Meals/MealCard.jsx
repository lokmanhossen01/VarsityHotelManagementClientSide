import { Rating } from '@smastrom/react-rating';
import { PropTypes } from 'prop-types';
import { LuDot } from 'react-icons/lu';
import timeAgo from '../../time';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import useAxiosSec from '../../Hooks/useAxiosSec';
import toast from 'react-hot-toast';

const MealCard = ({ dta }) => {
  const { userDta } = useAuth();
  const axiosSec = useAxiosSec();
  // meals Request
  const { mutateAsync: requstMutate } = useMutation({
    mutationFn: async (request) => {
      const { data } = await axiosSec.post('/meals-request', request);
      // console.log(data);
      return data;
    },
    onSuccess: (dta) => {
      // console.log(dta);
      if (dta.insertedId) {
        toast.success('Request Sended!');
      } else {
        toast.error('Request Already Sended!');
      }
    },
  });
  // Handle request func
  const handleRequest = async () => {
    const recDta = {
      recMealImg: dta?.mealImage,
      recMealTitle: dta?.title,
      recMealId: dta?._id,
      recEmail: userDta.email,
      recName: userDta.displayName,
      status: 'pending',
    };
    // console.log(recDta);
    await requstMutate(recDta);
  };
  return (
    <div className="flex flex-col md:flex-row rounded-md p-3 bg-slate-200 gap-1">
      <div className="w-full md:w-1/4 h-52 sm:h-64 md:h-auto rounded-md">
        <div
          className="w-full h-full bg-cover bg-center rounded-t-md md:rounded-tr-none md:rounded-l-md bg-yellow-200"
          style={{
            backgroundImage: `url(${
              dta.mealImage ||
              'https://i.ibb.co/bsVvWDG/bowl-menudo-served-with-side-sliced-avocado-974629-221980.jpg'
            })`,
          }}
        ></div>
      </div>
      <div className="w-full md:w-3/4 bg-slate-700 rounded-b-md md:rounded-bl-none md:rounded-r-md p-3 flex flex-col sm:flex-row gap-5 sm:gap-0">
        <div className="w-full sm:w-3/4 space-y-2 pr-2">
          <h1 className="text-2xl sm:text-3xl font-bold">{dta?.title}</h1>
          <div className="flex items-center gap-2">
            <Rating
              style={{ maxWidth: 120 }}
              value={dta?.rating || 0}
              readOnly
            />
            <span className="text-base">({dta?.rating || 0})</span>
          </div>
          <div className="flex items-center flex-wrap text-slate-400">
            {dta?.ingredients.map((ing, i) => (
              <span key={i} className="flex items-center">
                {ing}
                <span className="text-pClr text-xl">
                  <LuDot />
                </span>
              </span>
            ))}
          </div>
          <p className="">{dta?.description.slice(0, 70)}....</p>
        </div>
        <div className="w-full sm:w-1/4 min-w-32 sm:min-w-36 flex flex-col justify-between pl-2 sm:pl-3 border-t sm:border-t-0 sm:border-l border-slate-500">
          <p className="text-right">
            <p className="text-right inline-block text-slate-400 border-l border-b px-1 sm:px-2 rounded-bl border-slate-400">
              {timeAgo(dta.postDate)}
            </p>
          </p>
          <div className="flex justify-center items-center py-4">
            <h1 className="text-3xl font-bold">${dta?.price}</h1>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to={`/meal/${dta._id}`}
              className="py-1 px-1 w-full text-center rounded-md text-sm sm:text-base font-bold bg-pClr text-slate-100  hover:scale-95 duration-200"
            >
              DETAILS
            </Link>
            <button
              onClick={handleRequest}
              className="py-1 px-1 w-full rounded-md text-sm sm:text-base font-bold border-2 border-pClr uppercase hover:scale-95 duration-200"
            >
              ADD request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MealCard.propTypes = {
  dta: PropTypes.object,
};
export default MealCard;
