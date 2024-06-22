const slide1 = 'https://i.ibb.co/NZdDC3T/eeeeeeeeeeeee-min.png';
const slide2 = 'https://i.ibb.co/c6wFfBL/Hot-Dogs-and-Deli-Meat.jpg';
const slide3 = 'https://i.ibb.co/4WY6ZRN/meals10.jpg';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation, Autoplay, Keyboard } from 'swiper/modules';
import { IoIosSearch } from 'react-icons/io';
import useAuth from '../../Hooks/useAuth';

const Banner = () => {
  const { userDta } = useAuth();
  return (
    <div className="h-[400px] md:min-h-screen">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3300,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, Keyboard]}
        className="mySwiper h-[400px] md:min-h-screen relative"
      >
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(${slide1})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: ' rgba(0, 0, 0, 0.6)' }}
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(${slide2})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: ' rgba(0, 0, 0, 0.6)' }}
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-no-repeat p-12 text-center"
            style={{
              backgroundImage: `url(${slide3})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
              style={{ backgroundColor: ' rgba(0, 0, 0, 0.6)' }}
            ></div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="h-[400px] md:min-h-screen absolute top-0 left-1/2 -translate-x-1/2 z-10 w-full flex flex-col items-center justify-center max-w-[750px] mx-auto text-center gap-4 px-4 pt-10 sm:pt-0">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mx-auto">
          Welcome to our University Hostel
        </h1>
        <p className="text-base sm:text-lg text-slate-200 px-10">
          {userDta
            ? `Welcome! Explore today's meal options, share your feedback, and enjoy a smooth dining experience with easy access to meal details and reviews.`
            : `Log in to view daily meal plans and share your reviews. Enhance your dining experience with easy access to meal information and feedback options.`}
        </p>
        <div className="relative w-full max-w-72 sm:max-w-[450px] sm:mt-7">
          <input
            className="py-1.5 sm:py-2 w-full px-5 pr-8 rounded-full bg-[#ffffff13] border placeholder-slate-300 outline-none"
            type="text"
            placeholder="Search Keyword"
          />
          <span className="text-xl absolute -translate-y-1/2 right-3 text-slate-300 top-1/2 cursor-pointer">
            <IoIosSearch />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
