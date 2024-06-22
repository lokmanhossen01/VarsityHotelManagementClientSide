import { CgSpinnerTwoAlt } from 'react-icons/cg';
// import { Link } from 'react-router-dom';

const Loding = () => {
  return (
    <div className="min-h-[calc(100vh-92px)] relative flex items-center justify-center">
      <span className="loader animate-spin text-4xl">
        <CgSpinnerTwoAlt />
      </span>
      {/* <Link to={'/'} className="">
        <button className="py-2 px-5 bg-error text-white rounded-md font-semibold absolute bottom-0 left-1/2 -translate-x-1/2 hover:bg-orange-700">
          Go Back Home
        </button>
      </Link> */}
    </div>
  );
};

export default Loding;
