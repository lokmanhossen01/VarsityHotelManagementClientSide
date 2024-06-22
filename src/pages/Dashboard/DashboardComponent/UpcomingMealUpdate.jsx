import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import { LuUploadCloud } from 'react-icons/lu';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ImSpinner9 } from 'react-icons/im';
import useAxiosSec from '../../../Hooks/useAxiosSec';
import useAuth from '../../../Hooks/useAuth';
import PropTypes from 'prop-types';

const UpcomingMealUpdate = ({ dtaFilter, refetch, modal }) => {
  // console.log('id', id);
  const axiosSec = useAxiosSec();
  const [showName, setShowName] = useState({});
  const [showImagePreview, setShowImagePreview] = useState({});
  const fileInputRef = useRef();
  const [loding, setLoading] = useState(false);
  const { userDta } = useAuth();
  const adminName = userDta?.displayName;
  const adminEmail = userDta?.email;
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState(
    dtaFilter?.ingredients
  );
  const [ingrErr, setIngrErr] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  // console.log(showName);
  const handleAddIngredient = () => {
    setIngrErr(false);
    if (ingredient.trim() !== '') {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient('');
    }
  };

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
  const postDate = getCurrentDateTimeFormatted();
  // console.log(time);

  // Post new review
  const { mutateAsync } = useMutation({
    mutationFn: async (meal) => {
      const { data } = await axiosSec.put(
        `/upcoming-meal-update/${dtaFilter?._id}`,
        meal
      );
      console.log(data);
    },
    onSuccess: () => {
      refetch();
      modal(false);
      Swal.fire({
        title: 'Thank You',
        timer: 1000,
        text: 'Your meal has been successfully Updated.',
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
    if (ingredientsList.length < 1) {
      setIngrErr(true);
      return;
    } else {
      setIngrErr(false);
    }

    const title = data.title;
    const mealType = data.mealType;
    const description = data.description;
    const price = data.price;
    const ingredients = ingredientsList;
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
        const mealImage = data.data.display_url;
        const rating = dtaFilter?.rating || 0;
        const likes = dtaFilter?.likes || 0;
        const review = dtaFilter?.review || 0;
        const meal = {
          rating,
          description,
          title,
          likes,
          mealType,
          price,
          review,
          mealImage,
          adminName,
          adminEmail,
          ingredients,
          postDate,
        };
        // console.log('Meal Datas:=====', meal);
        // return;
        await mutateAsync(meal);
        setLoading(false);
        setShowName('');
        setShowImagePreview('');
        fileInputRef.current.value = '';
        setIngredientsList([]);
        reset();
      } else {
        const mealImage = dtaFilter?.mealImage;
        const rating = dtaFilter?.rating || 0;
        const likes = dtaFilter?.likes || 0;
        const review = dtaFilter?.review || 0;
        const meal = {
          rating,
          description,
          title,
          likes,
          mealType,
          price,
          review,
          mealImage,
          adminName,
          adminEmail,
          ingredients,
          postDate,
        };
        // console.log('Meal Datas:=====', meal);
        // return;
        await mutateAsync(meal);
        setLoading(false);
        setShowName('');
        setShowImagePreview('');
        fileInputRef.current.value = '';
        setIngredientsList([]);
        reset();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: 'Oops...!',
        text: `Sorry, Meal could not be Posted ! "${error.message}"`,
        icon: 'error',
      });
    }
  };
  // console.log('From Error:', errors);
  // console.log('Loding Status: ', loding);
  return (
    <div className="min-h-[]">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-slate-800 font-bold pb-4 pt-3">
          Update Meal
        </h1>
        <button
          onClick={() => modal(false)}
          className="py-2 px-6 bg-red-500 text-white font-semibold rounded-md"
        >
          Close
        </button>
      </div>
      <div className="w-full border border-slate-300 rounded-md p-4">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col md:flex-row gap-3 lg:gap-5">
              <div className="flex flex-col w-full md:w-1/2">
                {/* Meal Title */}
                <input
                  defaultValue={dtaFilter?.title}
                  className="px-3 py-2 rounded-md w-full border border-slate-400 outline-none bg-transparent"
                  type="text"
                  placeholder="Enter Meal Title"
                  {...register('title', { required: true, minLength: 10 })}
                />
                {errors.title?.type === 'required' && (
                  <p className="text-red-500 pt-1">Please Input Meal Title!</p>
                )}
                {errors.title?.type === 'minLength' && (
                  <p className="text-red-500 pt-1">
                    Please Input Meal Title Minimum 10 Character!
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row w-full gap-3 lg:gap-5 md:w-1/2">
                {/* Select meals type */}
                <div className="flex flex-col w-full sm:w-1/2">
                  <select
                    id="selectmethod"
                    defaultValue=""
                    name="mealType"
                    {...register('mealType', { required: true })}
                    className="custom-select py-2 px-3 rounded-md border border-slate-400 outline-none bg-transparent"
                  >
                    <option value="" disabled>
                      Select Meal Type
                    </option>
                    <option
                      selected={dtaFilter?.mealType === 'breakfast'}
                      value="breakfast"
                    >
                      Breakfast
                    </option>
                    <option
                      selected={dtaFilter?.mealType === 'lunch'}
                      value="lunch"
                    >
                      Lunch
                    </option>
                    <option
                      selected={dtaFilter?.mealType === 'dinner'}
                      value="dinner"
                    >
                      Dinner
                    </option>
                  </select>
                  {errors.mealType && (
                    <p className="text-red-500 pt-1">
                      Please Select Meal Type!
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-full sm:w-1/2">
                  {/* Price */}
                  <input
                    defaultValue={dtaFilter?.price}
                    className="py-2 px-3 rounded-md border border-slate-400 outline-none bg-transparent"
                    type="text"
                    placeholder="Enter Meal Price"
                    {...register('price', { required: true, minLength: 1 })}
                  />
                  {(errors.price?.type === 'required' ||
                    errors.price?.type === 'minLength') && (
                    <p className="text-red-500 pt-1">
                      Please Input Meal Price!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/*  ingredient */}
            {ingredientsList?.length > 0 && (
              <div className="w-full px-3 py-1 rounded-md bg-slate-50 border border-slate-400 mt-3 md:mt-5 flex flex-col items-start">
                <div className="flex gap-5">
                  <h3 className="font-bold bg-slate-200 inline-block px-3 rounded mb-2">
                    Preview Ingredient
                  </h3>
                  <h3 className="font-semibold bg-slate-200 px-3 rounded mb-2 flex gap-1">
                    <span className="hidden sm:block font-medium">Added </span>{' '}
                    Ingredient ({ingredientsList?.length})
                  </h3>
                </div>
                <div>
                  {ingredientsList.map((item, index) => (
                    <span key={index}>{item}, </span>
                  ))}
                </div>
                <div className="text-right w-full">
                  <span
                    className="px-3 bg-red-500 text-white rounded-md cursor-pointer"
                    onClick={() => setIngredientsList([])}
                  >
                    Clear
                  </span>
                </div>
              </div>
            )}
            <div className=" my-3 md:my-5">
              <div className="flex">
                <input
                  type="text"
                  className="py-2 px-3 bg-transparent border border-r-0 border-slate-400 rounded-l-md outline-none w-9/12"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  placeholder="Enter ingredients"
                />
                <div
                  onClick={handleAddIngredient}
                  className="py-2 px-4 rounded-r-md bg-pClr text-white font-semibold border border-pClr cursor-pointer select-none w-1/4 text-center"
                >
                  Add
                </div>
              </div>
              {ingrErr && (
                <p className="text-red-500 pt-1">
                  Please add the meal ingredients!
                </p>
              )}
            </div>

            {/* Description meals */}
            <div>
              <textarea
                defaultValue={dtaFilter?.description}
                className={`w-full bg-transparent rounded-md p-3 min-h-32 border border-slate-400 outline-none`}
                placeholder="Enter Meal Details..."
                {...register('description', { required: true, minLength: 40 })}
              />
              {errors.description?.type === 'required' && (
                <p className="text-red-500 pt-1">
                  Please Input Meal Description!
                </p>
              )}
              {errors.description?.type === 'minLength' && (
                <p className="text-red-500 pt-1">
                  Please Input Meal Description Minimum 40 Character!
                </p>
              )}
            </div>

            {/* Upload image */}
            <div
              className={`${
                imgErr ? 'text-red-500' : 'text-slate-700'
              } py-2 md:py-3`}
            >
              <div>
                <h1 className="text-slate-700 text-2xl font-semibold">
                  Upload if want to update image else skip.
                </h1>
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
                        Upload Meal Photo
                      </h5>
                      <p className="text-sm">
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
                      setImgErr(false);
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
              {imgErr && (
                <p className="text-red-500 pt-1">Please Input Meal Photo!</p>
              )}
            </div>
            {loding ? (
              <p className="py-2 w-full sm:w-60 md:w-96 mx-auto block duration-300 cursor-progress rounded-md bg-pClr text-slate-100 mt-3">
                <ImSpinner9 className="animate-spin text-2xl mx-auto" />
              </p>
            ) : (
              <input
                type="submit"
                value={'Update Upcoming Meal'}
                className="py-2 w-full sm:w-60 md:w-96 mx-auto block hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer rounded-md bg-pClr text-slate-100 font-semibold mt-3"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

UpcomingMealUpdate.propTypes = {
  dtaFilter: PropTypes.object,
  refetch: PropTypes.func,
  modal: PropTypes.boolean,
};
export default UpcomingMealUpdate;
