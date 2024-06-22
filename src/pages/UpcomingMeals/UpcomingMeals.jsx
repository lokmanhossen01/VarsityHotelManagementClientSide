import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSec from '../../Hooks/useAxiosSec';
import UpcomingMealSke from '../../components/Skeleton/UpcomingMealSke';
import FilterSearching from '../../utility/FilterSearching';
import UpcomingCrd from './UpcomingCrd';

const UpcomingMeals = () => {
  const axiosSec = useAxiosSec();
  const [filter, handleFilter] = useState('');
  const [search, setSearch] = useState('');

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['upcoming-meals', search, filter],
    queryFn: async () => {
      const { data } = await axiosSec.get(
        `/upcoming-meals?filter=${filter}&search=${search}`
      );
      return data;
    },
  });

  const handleSearchClick = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    // console.log(text);
    setSearch(text);
  };
  const handleSearch = (e) => {
    const text = e.target.value;
    // console.log(text);
    setSearch(text);
  };
  return (
    <div>
      <div
        className="h-60 bg-pClr"
        style={{
          backgroundImage: `url('https://i.ibb.co/hcxp8J7/fdsfd-min.png')`,
        }}
      ></div>
      <div className="w-11/12 xl:w-10/12 max-w-[1700px] mx-auto">
        <div className="py-5 bg-slate-500 mt-6 rounded-md px-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <FilterSearching handleFilter={handleFilter} />
          {filter && (
            <div className="hidden lg:block py-1 w-48 text-center border rounded-md px-2">
              <h1 className="text-xl font-medium">
                Result: <span className="font-bold">({data.length})</span>
                Meals
              </h1>
            </div>
          )}
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

        {isLoading ? (
          <div className="mb-16 mt-5">
            <UpcomingMealSke />
          </div>
        ) : (
          <div className="mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:grid-cols-4 gap-5 mb-16 mt-5">
            {data.length < 1 ? (
              <div className="text-slate-100 m-14 text-center border border-red-500 rounded-md p-5 max-w-[700px] text-3xl md:text-5xl mx-auto col-span-4">
                <h1 className="font-bold">No results found !</h1>
              </div>
            ) : (
              data.map((dta) => (
                <UpcomingCrd key={dta._id} dta={dta} refetch={refetch} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingMeals;
