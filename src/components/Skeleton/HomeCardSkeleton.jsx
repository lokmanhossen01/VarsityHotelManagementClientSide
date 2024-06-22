import Skeleton from 'react-loading-skeleton';

const HomeCardSkeleton = () => {
  return (
    <div className="max-w-[500px] mx-auto w-full p-2 bg-slate-700 text-slate-300 rounded-md">
      <div className="bg-cover bg-center h-60 rounded-md w-full">
        <Skeleton
          className="h-full"
          highlightColor="#a7a9ac2b"
          baseColor="#4d51559b"
        />
      </div>
      <div className="w-full ">
        <div className="w-full min-h-24 pt-4 pb-2">
          <h1 className="text-2xl font-bold w-10/12 mx-auto">
            <Skeleton
              highlightColor="#a7a9ac2b"
              baseColor="#4d51559b"
              height={40}
            />
          </h1>
        </div>
        <h1 className="text-2xl font-bold mx-auto">
          <Skeleton
            highlightColor="#a7a9ac2b"
            baseColor="#4d51559b"
            height={40}
          />
        </h1>
      </div>
    </div>
  );
};

export default HomeCardSkeleton;
