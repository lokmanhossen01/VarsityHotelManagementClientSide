import HomeCardSkeleton from './HomeCardSkeleton';

const HomeCtgSkltn = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
      <HomeCardSkeleton />
    </div>
  );
};

export default HomeCtgSkltn;
