import { useQuery } from '@tanstack/react-query';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import useAxiosPub from '../../Hooks/useAxiosPub';
import MealsCard from '../MealsCard/MealsCard';
import HomeCtgSkltn from '../Skeleton/HomeCtgSkltn';
// import 'react-tabs/style/react-tabs.css';

const MealsbyCategory = () => {
  const axioss = useAxiosPub();

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ['meals-six'],
    queryFn: async () => {
      const { data } = await axioss.get('/meals-six');
      return data;
    },
  });
  const { data: breakfast = [] } = useQuery({
    queryKey: ['breackfast'],
    queryFn: async () => {
      const { data } = await axioss.get('/breakfast');
      return data;
    },
  });
  const { data: lunch = [] } = useQuery({
    queryKey: ['lunch'],
    queryFn: async () => {
      const { data } = await axioss.get('/lunch');
      return data;
    },
  });
  const { data: dinner = [] } = useQuery({
    queryKey: ['dinner'],
    queryFn: async () => {
      const { data } = await axioss.get('/dinner');
      return data;
    },
  });

  return (
    <div className="text-center py-10">
      <h1 className="text-5xl font-bold"> Meals by Category</h1>

      <div>
        <Tabs>
          <TabList className="flex flex-col sm:flex-row items-center justify-center border-2 rounded-md p-2 sm:rounded-full py-1 max-w-[700px] mx-auto text-slate-800 gap-1 my-8">
            <Tab className="px-3 sm:px-8 py-1.5 cursor-pointer rounded-full border-2 border-white text-white font-medium outline-none w-full sm:w-auto">
              All Meals
            </Tab>
            <Tab className="px-3 sm:px-8 py-1.5 cursor-pointer rounded-full border-2 border-white text-white font-medium outline-none w-full sm:w-auto">
              Breakfast
            </Tab>
            <Tab className="px-3 sm:px-8 py-1.5 cursor-pointer rounded-full border-2 border-white text-white font-medium outline-none w-full sm:w-auto">
              Lunch
            </Tab>
            <Tab className="px-3 sm:px-8 py-1.5 cursor-pointer rounded-full border-2 border-white text-white font-medium outline-none w-full sm:w-auto">
              Dinner
            </Tab>
          </TabList>

          <TabPanel>
            {isLoading ? (
              <HomeCtgSkltn />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {meals.map((dta) => (
                  <MealsCard key={dta._id} data={dta} />
                ))}
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {isLoading ? (
              <HomeCtgSkltn />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {breakfast.map((dta) => (
                  <MealsCard key={dta._id} data={dta} />
                ))}
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {isLoading ? (
              <HomeCtgSkltn />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {lunch.map((dta) => (
                  <MealsCard key={dta._id} data={dta} />
                ))}
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {isLoading ? (
              <HomeCtgSkltn />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {dinner.map((dta) => (
                  <MealsCard key={dta._id} data={dta} />
                ))}
              </div>
            )}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MealsbyCategory;
