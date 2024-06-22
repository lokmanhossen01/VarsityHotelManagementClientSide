import Skeleton from 'react-loading-skeleton';
const MealsSkeleton = () => {
  return (
    <div className="border-8 rounded-md">
      <div className="flex flex-col md:flex-row rounded-md gap-1 md:h-52 ">
        <div className="w-full md:w-1/4 h-52 sm:h-64 md:h-auto rounded-md">
        <div className='w-full h-full -mt-1'>
            <Skeleton
              highlightColor="#a7a9ac2b"
              baseColor="#4d51559b"
              className="w-full h-full rounded-t-md md:rounded-tr-none md:rounded-l-md"
            />
        </div>
        </div>
        <div className="w-full md:w-3/4 rounded-b-md md:rounded-bl-none md:rounded-r-md p-3 flex">
          <div className="w-3/4 space-y-4 pr-2 ">
            <h1 className="text-4xl sm:text-3xl font-bold">
              <Skeleton highlightColor="#a7a9ac2b" baseColor="#4d51559b" />
            </h1>
            <div className="flex items-center gap-4">
              <h1 className="h-5 w-8/12 sm:w-64">
                <Skeleton
                  highlightColor="#a7a9ac2b"
                  baseColor="#4d51559b"
                  className="h-full"
                />
              </h1>

              <p className="h-5 w-1/3 sm:w-10">
                <Skeleton
                  highlightColor="#a7a9ac2b"
                  baseColor="#4d51559b"
                  className="h-full"
                />
              </p>
            </div>
            <div className="flex gap-3 items-center flex-wrap">
              <span className="w-24 h-5">
                <Skeleton
                  highlightColor="#a7a9ac2b"
                  baseColor="#4d51559b"
                  className="h-full"
                />
              </span>
              <span className="w-24 h-5">
                <Skeleton
                  highlightColor="#a7a9ac2b"
                  baseColor="#4d51559b"
                  className="h-full"
                />
              </span>
              <span className="w-24 h-5">
                <Skeleton
                  highlightColor="#a7a9ac2b"
                  baseColor="#4d51559b"
                  className="h-full"
                />
              </span>
              <span className="w-24 h-5">
                <Skeleton
                  highlightColor="#a7a9ac2b"
                  baseColor="#4d51559b"
                  className="h-full"
                />
              </span>
              <span className="w-24 h-5">
                <Skeleton
                  highlightColor="#a7a9ac2b"
                  baseColor="#4d51559b"
                  className="h-full"
                />
              </span>
            </div>
            <p className="">
              <Skeleton
                highlightColor="#a7a9ac2b"
                baseColor="#4d51559b"
                className="h-full"
              />
            </p>
          </div>
          <div className="w-1/4 min-w-32 sm:min-w-36 flex flex-col justify-between pl-2 sm:pl-3 border-l border-slate-200">
            <p className="text-right">
              <p className="text-right inline-block rounded-bl min-w-28">
                <Skeleton highlightColor="#a7a9ac2b" baseColor="#4d51559b" />
              </p>
            </p>
            <div>
              <h1 className="text-3xl font-bold mx-auto max-w-20">
                <Skeleton highlightColor="#a7a9ac2b" baseColor="#4d51559b" />
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl w-full">
                <Skeleton highlightColor="#a7a9ac2b" baseColor="#4d51559b" />
              </h1>
              <h1 className="text-3xl w-full">
                <Skeleton highlightColor="#a7a9ac2b" baseColor="#4d51559b" />
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsSkeleton;
