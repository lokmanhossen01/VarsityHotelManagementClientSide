import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSec from '../../Hooks/useAxiosSec';
import { IoMdTime } from 'react-icons/io';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useAxiosPub from '../../Hooks/useAxiosPub';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Rating } from '@smastrom/react-rating';
import ReviewPost from '../../components/ReviewPost/ReviewPost';
import AddReview from '../../components/AddReview/AddReview';
import timeAgo from '../../time';
import toast from 'react-hot-toast';

const Details = () => {
  const { userDta } = useAuth();
  const naviget = useNavigate();
  const [like, setLike] = useState(false);
  const axiosSec = useAxiosSec();
  const axiosPub = useAxiosPub();
  const { id } = useParams();
  //   console.log('Details Id:', id);

  const { data = {}, refetch } = useQuery({
    queryKey: ['meals', id],
    queryFn: async () => {
      const { data } = await axiosPub.get(`/details/${id}`);
      return data;
    },
  });

  const { data: ratingsAvg = {}, refetch: retingAvgRefetch } = useQuery({
    queryKey: ['ratingAvg', id],
    queryFn: async () => {
      const { data } = await axiosPub.get(`/sum-of-rating/${id}`);
      return data;
    },
  });

  // console.log(ratingsAvg);

  const { data: reviews = [], refetch: reviewss } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const { data } = await axiosPub.get(`/read-review/${id}`);
      return data;
    },
  });
  // console.log('reviews:==', reviews);

  const { data: likedCount = {}, refetch: counted } = useQuery({
    queryKey: ['liked', id],
    queryFn: async () => {
      const { data } = await axiosPub.get(
        `/liked-count?id=${id}&email=${userDta?.email}`
      );
      return data;
    },
  });
  // console.log(likedCount);

  const { mutateAsync } = useMutation({
    mutationFn: async (countData) => {
      const { data } = await axiosSec.put('/like-count', countData);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      refetch();
      counted();
    },
  });

  const {
    _id,
    likes = '00',
    mealImage,
    mealType,
    postDate = '0000-00-00 00:00:00',
    price = '00',
    title,
    adminName,
    review,
    rating,
    description,
    ingredients = [],
  } = data;
  const time = timeAgo(postDate);
  // console.log(postDate);

  let likeCount = likes;
  const handleLike = async () => {
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

    const newLikeState = !like;
    setLike(newLikeState);
    console.log(newLikeState);

    const email = userDta?.email;
    const count = newLikeState ? 1 : -1;
    const liked = newLikeState ? 1 : 0;
    const countData = { id, count, email, liked };
    await mutateAsync(countData);
    // console.log(newLikeState ? 'Count barbeeeeeeeeee' : 'Count Combeeeeeeeee');
  };
  useEffect(() => {
    if (likedCount) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [likedCount]);

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
    const recDta = {
      recMealImg: mealImage,
      recMealTitle: title,
      recMealId: _id,
      recEmail: userDta.email,
      recName: userDta.displayName,
      status: 'pending',
    };
    // console.log(recDta);
    await requstMutate(recDta);
  };
  return (
    <div>
      <div
        className="w-full bg-yellow-700 h-72 sm:h-96 bg-cover bg-bottom "
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/interior-luxury-restaurant-generative-ai_220873-20247.jpg?w=1060')`,
        }}
      ></div>
      <div className="rounded-md max-w-[750px] mx-auto -mt-48 mb-24 w-11/12 xl:w-10/12 shadow-md shadow-slate-100">
        <div className="p-3 rounded-t-md pb-0 bg-slate-100">
          <div
            className="w-full h-60 sm:h-80 rounded-t-md  bg-cover bg-center"
            style={{
              backgroundImage: `url(${
                mealImage ? mealImage : 'https://i.ibb.co/PwXW3g8/sdfsaf.jpg'
              })`,
            }}
          ></div>
        </div>
        <div className="p-5 pt-2">
          <div>
            <div className="flex items-center justify-between">
              <div className="text-slate-400 flex items-center gap-1">
                <IoMdTime />
                <span>{time}</span>
              </div>

              <div className="flex items-center gap-2 text-xl py-2">
                {likeCount}
                <span
                  className={`text-3xl cursor-pointer hover:text-pClr hover:scale-125 active:scale-95 duration-200 ${
                    like && 'text-pClr'
                  }`}
                  onClick={handleLike}
                >
                  {like && userDta ? <FaHeart /> : <FaRegHeart />}
                </span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>

            <div className="w-full py-5 rounded-md">
              <table className="w-full border border-slate-600 rounded-md">
                <tr className="border border-slate-600">
                  <td className="font-medium border-r w-1/2 border-slate-600 px-5 py-2">
                    Price
                  </td>
                  <td className="px-5">
                    $ {price < 10 ? `0${price}` : price}{' '}
                  </td>
                </tr>
                <tr className="border border-slate-600">
                  <td className="font-medium border-r w-1/2 border-slate-600 px-5 py-2">
                    Meal Type
                  </td>
                  <td className="px-5 capitalize">{mealType}</td>
                </tr>
                <tr className="border border-slate-600">
                  <td className="font-medium border-r w-1/2 border-slate-600 px-5 py-2">
                    Ingredients
                  </td>
                  <td className="px-5 capitalize">{ingredients.join(', ')}</td>
                </tr>
                <tr className="border border-slate-600">
                  <td className="font-medium border-r w-1/2 border-slate-600 px-5 py-2">
                    Distributor
                  </td>
                  <td className="px-5">{adminName} </td>
                </tr>
              </table>
            </div>
            <h3 className="text-2xl py-2 font-semibold">Description:</h3>
            <p>{description}</p>
          </div>
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-1">
              <Rating
                style={{ maxWidth: 180 }}
                value={ratingsAvg?.averageRating || 0}
                readOnly
              />
              <h1 className="text-2xl">({ratingsAvg?.totalCount || 0})</h1>
            </div>
            <button
              onClick={handleRequest}
              className="py-2 px-5 font-bold bg-pClr rounded-md text-black hover:scale-110 duration-200"
            >
              Meal Request
            </button>
          </div>

          <div className="h-[1px] bg-slate-600 w-full mb-20" />
          {/* Review Part */}
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-3xl font-semibold">Reviews:</h2>
            <a
              href="#add-review"
              className="px-3 py-1 border rounded-md hover:-translate-y-2 duration-300"
            >
              Add Review
            </a>
          </div>
          <div className="flex flex-col gap-4">
            {reviews.map((dta) => (
              <ReviewPost key={dta._id} revireDta={dta} />
            ))}
          </div>

          {/* Add review from */}
          <h1 className="text-3xl font-semibold pb-3 mt-10">Add Your Review</h1>
          <div
            id="add-review"
            className="p-3 border border-slate-500 rounded-md"
          >
            <AddReview
              id={id}
              reviewss={reviewss}
              retingAvgRefetch={retingAvgRefetch}
              postTitle={title}
              postRating={rating}
              postReviewCount={review}
              postLike={likes}
              postImg={mealImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
