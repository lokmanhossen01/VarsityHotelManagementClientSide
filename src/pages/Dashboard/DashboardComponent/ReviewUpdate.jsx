import { Rating } from '@smastrom/react-rating';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import { LuUploadCloud } from 'react-icons/lu';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ImSpinner9 } from 'react-icons/im';
import PropTypes from 'prop-types';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import useAuth from '../../../Hooks/useAuth';

export default function ReviewUpdate({ dtaFilter, refetch, modal }) {
  //   console.log('dtaFilter++++++', dtaFilter);
  const axiosSec = useAxiosSec();
  const [ratings, setRating] = useState(null);
  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const fileInputRef = useRef();
  const [loding, setLoading] = useState(false);
  const { userDta } = useAuth();
  const reviewUserName = userDta?.displayName;
  const reviewUserPhoto = userDta?.photoURL;
  const reviewUserEmail = userDta?.email;

  // console.log('Imagee==========', showName?.name);
  // Post new review
  const { mutateAsync } = useMutation({
    mutationFn: async (review) => {
      const { data } = await axiosSec.put(
        `/review-update/${dtaFilter._id}`,
        review
      );
      console.log(data);
    },
    onSuccess: () => {
      setLoading(false);
      refetch();
      modal(false);
      Swal.fire({
        title: 'Updated Review',
        timer: 1200,
        text: 'Your review has been successfully Updated.',
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
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const detail = data.YourOpinion;
    // console.log(data);

    try {
      setLoading(true);
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
          rating: ratings || dtaFilter.rating,
          detail,
          image1,
          reviewUserName,
          reviewUserPhoto,
          reviewUserEmail,
        };
        console.log('Review Datas:=====', review);
        // return;
        await mutateAsync(review);
      } else {
        const image1 = dtaFilter.image1;
        const review = {
          rating: ratings || dtaFilter.rating,
          detail,
          image1,
          reviewUserName,
          reviewUserPhoto,
          reviewUserEmail,
        };
        console.log('Review Datas:=====', review);
        // return;
        await mutateAsync(review);
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
        Add Photo &nbsp;
        <span className="text-slate-400 font-normal text-sm">
          (You can skip it if you want)
        </span>
      </h3>
      <div>
        <div className="text-slate-700">
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
        <Rating
          style={{ maxWidth: 250 }}
          value={ratings || dtaFilter?.rating}
          onChange={setRating}
        />
        <span className="text-2xl">({ratings || dtaFilter.rating}/5)</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <textarea
          defaultValue={dtaFilter?.detail}
          className={`w-full bg-transparent border rounded-md p-3 min-h-40 shadow-md shadow-slate-400 border-slate-500 outline-none`}
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
            value={'Update Review'}
            className="py-2 w-44 mx-auto block hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer rounded-md bg-pClr text-slate-100 font-semibold mt-3"
          />
        )}
      </form>
    </div>
  );
}
ReviewUpdate.propTypes = {
  dtaFilter: PropTypes.object,
  refetch: PropTypes.func,
  modal: PropTypes.boolean,
};
