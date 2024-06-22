import { Rating } from '@smastrom/react-rating';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import { LuUploadCloud } from 'react-icons/lu';
import Swal from 'sweetalert2';
import useAxiosSec from '../../Hooks/useAxiosSec';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// import timeAgo from '../../time';

export default function AddReview({
  id,
  reviewss,
  retingAvgRefetch,
  postTitle,
  postRating,
  postReviewCount,
  postLike,
  postImg,
}) {
  // console.log('id', id);
  const axiosSec = useAxiosSec();
  const naviget = useNavigate();
  const [rating, setRating] = useState(0);
  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const fileInputRef = useRef();
  const [loding, setLoading] = useState(false);
  const { userDta } = useAuth();
  const reviewUserName = userDta?.displayName;
  const reviewUserPhoto = userDta?.photoURL;
  const reviewUserEmail = userDta?.email;

  // console.log('Imagee==========', showName?.name);

  // Function to format the current date and time
  function getCurrentDateTimeFormatted() {
    // Create a Date object for the current date and time
    let now = new Date();

    // Get individual components
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    let day = now.getDate().toString().padStart(2, '0');
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    // Return formatted string
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  // Output formatted current date and time
  const time = getCurrentDateTimeFormatted();
  // console.log(timeAgo(time, '>>>>>>>'));

  // Post new review
  const { mutateAsync } = useMutation({
    mutationFn: async (review) => {
      const { data } = await axiosSec.post('/post-review', review);
      console.log(data);
    },
    onSuccess: () => {
      reviewss();
      retingAvgRefetch();
      Swal.fire({
        title: 'Thank You',
        text: 'Your review has been successfully posted.',
        icon: 'success',
      });
    },
  });

  const handleClearFile = () => {
    setShowName('');
    setShowImagePreview('');
    fileInputRef.current.value = '';
  };

  // console.log(showName);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
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

    if (rating < 1) {
      Swal.fire({
        title: 'Please give your rating',
        icon: 'warning',
        timer: 1500,
      });
      return;
    }
    const detail = data.YourOpinion;
    // console.log(data);

    try {
      setLoading(true);
      const postId = id;
      if (showName?.name) {
        const imagess = new FormData();
        imagess.append('image', showName);
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API
          }`,
          imagess
        );
        const image1 = data.data.display_url;
        const review = {
          rating,
          detail,
          image1,
          postId,
          postTitle,
          postRating,
          postReviewCount,
          postLike,
          postImg,
          reviewUserName,
          reviewUserPhoto,
          reviewUserEmail,
          time,
        };
        // console.log('Review Datas:=====', review);
        await mutateAsync(review);
        setLoading(false);
        setShowName('');
        setShowImagePreview('');
        fileInputRef.current.value = '';
        reset();
        setRating(0);
      } else {
        const image1 = null;
        const review = {
          rating,
          detail,
          image1,
          postId,
          postTitle,
          postRating,
          postReviewCount,
          postLike,
          postImg,
          reviewUserName,
          reviewUserPhoto,
          reviewUserEmail,
          time,
        };
        // console.log('Review Datas:=====', review);
        await mutateAsync(review);
        setLoading(false);
        setShowName('');
        setShowImagePreview('');
        fileInputRef.current.value = '';
        reset();
        setRating(0);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: 'Oops...!',
        text: `Sorry, your review could not be Posted ! "${error.message}"`,
        icon: 'error',
      });
    }
  };
  // console.log('From Error:', errors);
  // console.log('Loding Status: ', loding);
  return (
    <div>
      <h3 className="mb-2 font-semibold text-xl">
        Add Photo
        <span className="text-slate-300 font-normal text-sm">
          (You can skip it if you want)
        </span>
      </h3>
      <div>
        <div className="text-slate-100">
          {showName?.name ? (
            <div className=" mx-auto flex w-full items-center gap-x-6  rounded-lg border-2 border-dashed border-gray-400 p-5 bg-transparent">
              <img
                className="size-[100px] h-[100px] w-full max-w-[150px] rounded-lg object-cover"
                src={showImagePreview}
                alt={showName?.name}
              />
              <div className="flex-1 space-y-1.5 overflow-hidden">
                <h5 className=" text-xl font-medium tracking-tight truncate">
                  {showName?.name}
                </h5>
                <p className=" text-gray-500">
                  {(showName.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <div onClick={handleClearFile}>
                <span className="text-3xl">
                  <IoMdClose />
                </span>
              </div>
            </div>
          ) : (
            <label
              className=" mx-auto flex w-full flex-col items-center justify-center space-y-1 rounded-lg border-2 border-dashed border-gray-400 p-3 bg-transparent cursor-pointer"
              htmlFor="file5"
            >
              <span className="text-5xl">
                <LuUploadCloud />
              </span>
              <div className="space-y-1.5 text-center">
                <h5 className="whitespace-nowrap text-lg font-medium tracking-tight ">
                  Upload your file
                </h5>
                <p className="text-sm text-gray-500">
                  File Should be in PNG, JPEG or JPG formate
                </p>
              </div>
            </label>
          )}

          <input
            ref={fileInputRef}
            onChange={(e) => {
              if (
                e.target.files &&
                e.target.files[0].type.startsWith('image/') &&
                e.target.files[0]
              ) {
                const imageFile = e.target.files[0];
                setShowName(imageFile);
                setShowImagePreview(URL.createObjectURL(imageFile));
              } else {
                toast.error('Only images can be uploaded!');
              }
            }}
            className="hidden"
            accept="image/*"
            id="file5"
            type="file"
          />
        </div>
      </div>
      <div className="py-6 flex justify-center items-center gap-3">
        <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
        <span className="text-2xl">({rating ? rating : 0}/5)</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <textarea
          className={`w-full bg-transparent border rounded-md p-3 min-h-40 shadow-md shadow-slate-400 border-slate-500`}
          placeholder="Enter Your Opinion..."
          {...register('YourOpinion', { required: true, minLength: 30 })}
        />
        {errors.YourOpinion?.type === 'required' && (
          <p className="text-red-500 py-2">Please Input Your Your Opinion!</p>
        )}
        {errors.YourOpinion?.type === 'minLength' && (
          <p className="text-red-500 py-2">
            Please Input Your Your Opinion Minimum 20 Character!
          </p>
        )}
        {loding ? (
          <p className="py-2 w-44 mx-auto block duration-300 cursor-progress rounded-md bg-pClr text-slate-100 mt-3">
            <ImSpinner9 className="animate-spin text-2xl mx-auto" />
          </p>
        ) : (
          <input
            type="submit"
            value={'Save Review'}
            className="py-2 w-44 mx-auto block hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer rounded-md bg-pClr text-slate-100 font-semibold mt-3"
          />
        )}
      </form>
    </div>
  );
}
AddReview.propTypes = {
  id: PropTypes.string,
  reviewss: PropTypes.func,
  retingAvgRefetch: PropTypes.func,
  postTitle: PropTypes.string,
  postRating: PropTypes.string,
  postReviewCount: PropTypes.string,
  postLike: PropTypes.string,
  postImg: PropTypes.string,
};
