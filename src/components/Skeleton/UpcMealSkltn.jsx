import Skeleton from 'react-loading-skeleton';

const UpcMealSkltn = () => {
  return (
    <div className=" mx-auto mb-5 max-w-[390px] w-full rounded-lg bg-white font-sans shadow-lg dark:bg-[#18181B]">
      {/* Post Image */}
      <div className="flex flex-col gap-1">
        <div className="w-full h-52 -mt-1">
          <Skeleton
            highlightColor="#a7a9ac2b"
            baseColor="#4d51559b"
            className="h-full"
          />
        </div>
      </div>
      {/* Post content */}
      <div className="mt-3 space-y-2 px-4">
        <h2 className="text-3xl font-semibold text-slate-800 dark:text-white/90">
          <Skeleton highlightColor="#a7a9ac2b" baseColor="#4d51559b" />
        </h2>
        <Skeleton highlightColor="#a7a9ac2b" baseColor="#4d51559b" />
        <Skeleton highlightColor="#a7a9ac2b" baseColor="#4d51559b" />
        <Skeleton highlightColor="#a7a9ac2b" baseColor="#4d51559b" />
      </div>
      {/* icons */}
      <div className="mt-4 flex justify-between px-4 pb-4 gap-4">
        <div className="w-full">
          <Skeleton
            highlightColor="#a7a9ac2b"
            baseColor="#4d51559b"
            height={26}
          />
        </div>
        <div className="w-full">
          <Skeleton
            highlightColor="#a7a9ac2b"
            baseColor="#4d51559b"
            height={26}
          />
        </div>
        <div className="w-full">
          <Skeleton
            highlightColor="#a7a9ac2b"
            baseColor="#4d51559b"
            height={26}
          />
        </div>
      </div>
    </div>
  );
};

export default UpcMealSkltn;
