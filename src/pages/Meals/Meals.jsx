import { useInfiniteQuery } from '@tanstack/react-query';
import useAxiosPub from '../../Hooks/useAxiosPub';
import MealCard from './MealCard';
import FilterSearching from '../../utility/FilterSearching';
import React, { useState } from 'react';
import InfinityScroll from 'react-infinite-scroll-component';
import MealsSkeleton from '../../components/Skeleton/MealsSkeleton';
import { BsEmojiDizzy } from 'react-icons/bs';

const Meals = () => {
  const axiosPub = useAxiosPub();
  const [filter, handleFilter] = useState('');
  const [search, setSearch] = useState('');
  // console.log(filter);
  const {
    data: meals,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['meals', filter, search],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await axiosPub.get(
        `/meals?filter=${filter}&search=${search}&page=${pageParam}`
      );
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 0 ? null : allPages.length;
    },
  });

  const fetchMoreData = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearch(text);
  };

  return (
    <div>
      <div
        className="h-60 bg-pClr"
        style={{
          backgroundImage: `url('https://i.ibb.co/xgfXcm8/dsfeee-min-1.png')`,
        }}
      ></div>
      <div className="w-11/12 xl:w-10/12 mx-auto">
        <div className="py-5 bg-slate-500 mt-6 rounded-md px-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <FilterSearching handleFilter={handleFilter} />

          <form
            onSubmit={handleSearchClick}
            className="w-full md:w-auto relative"
          >
            <input
              onChange={handleSearch}
              type="text"
              name="search"
              placeholder="Search your meals"
              className="rounded px-4 py-[7px] w-full md:w-80 max-w-full md:max-w-80 text-slate-600 focus:outline-none pr-20"
            />
            <button
              type="submit"
              className="absolute top-1/2 -translate-y-1/2 right-2 rounded-md bg-pClr text-slate-50 px-2 font-semibold"
            >
              Search
            </button>
          </form>
        </div>

        <InfinityScroll
          dataLength={meals ? meals.pages.flat().length : 0}
          next={fetchMoreData}
          hasMore={hasNextPage}
          loader={
            <div className="mb-9">
              <MealsSkeleton />
            </div>
          }
          endMessage={
            <div className="text-center mb-9 text-3xl sm:text-5xl py-6 flex items-center justify-center gap-3">
              <BsEmojiDizzy /> No more meals data <BsEmojiDizzy />
            </div>
          }
          scrollThreshold={0.9}
        >
          {isLoading ? (
            <div className="mb-16 mt-5 flex flex-col gap-6">
              <MealsSkeleton />
              <MealsSkeleton />
              <MealsSkeleton />
              <MealsSkeleton />
              <MealsSkeleton />
            </div>
          ) : (
            <div className="mb-16 mt-5 flex flex-col gap-6">
              {meals &&
                meals.pages.map((page, index) => (
                  <React.Fragment key={index}>
                    {page.map((dta) => (
                      <MealCard key={dta._id} dta={dta} />
                    ))}
                  </React.Fragment>
                ))}
            </div>
          )}
        </InfinityScroll>
      </div>
    </div>
  );
};

export default Meals;
