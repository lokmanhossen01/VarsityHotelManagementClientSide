import { BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { IoMdTime } from 'react-icons/io';
import { Rating } from '@smastrom/react-rating';
import PropTypes from 'prop-types';
import timeAgo from '../../time';

const ReviewPost = ({ revireDta }) => {
  const {
    time,
    reviewUserEmail,
    reviewUserPhoto,
    reviewUserName,
    image1,
    detail,
    rating,
  } = revireDta;
  const timess = timeAgo(time);
  // console.log(timess);
  return (
    <div className="w-full border rounded-md">
      <div className="flex items-center justify-between border-b border-slate-500 p-2">
        <div className="flex items-start gap-2">
          <img
            className="h-16 w-16 rounded-full"
            src={reviewUserPhoto}
            alt=""
          />
          <span className="flex flex-col">
            <span className="text-xl font-semibold capitalize">
              {reviewUserName}
            </span>
            <span className="text-slate-300">{reviewUserEmail}</span>
          </span>
        </div>
        <div className=" flex items-center">
          <div className="text-slate-400 flex items-center gap-1">
            <IoMdTime />
            <span>{timess ? timess : '00 time ago'}</span>
          </div>
          <button className="group relative py-2 pr-3 pl-2 text-xl">
            <BsThreeDotsVertical />
            <button className="hidden absolute right-6 top-7 duration-500 group-hover:block py-2 rounded-md w-32 bg-slate-100 text-slate-800 text-base">
              Report Abuse
            </button>
          </button>
        </div>
      </div>
      <div className="p-3">
        <p className="text-slate-300">{detail}</p>
        <div className="flex gap-4 flex-wrap my-4">
          <img className="max-h-40 rounded-md" src={image1} alt="" />
          <img
            className="max-h-40 rounded-md"
            src="https://i.ibb.co/M8Xp0pv/Screenshot-7.png"
            alt=""
          />
        </div>
        <div className="flex items-center justify-between mt-4 pr-2">
          <div>
            <Rating style={{ maxWidth: 180 }} value={rating} readOnly />
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <button className="text-xl">
                <AiOutlineLike />
                {/* <AiFillLike/> */}
              </button>
              10
            </span>
            <span className="flex items-center gap-1">
              <button className="text-xl">
                <AiOutlineDislike />
                {/* <AiFillDislike/> */}
              </button>
              06
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPost;
ReviewPost.propTypes = {
  timeAgos: PropTypes.func,
  revireDta: PropTypes.object,
};
