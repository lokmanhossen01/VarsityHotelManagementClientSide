import { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import ContactTop from '../../components/Contact/ContactTop';
import MealsGallery from '../../components/MealsGallery/MealsGallery';
import MealsbyCategory from '../../components/MealsbyCategory/MealsbyCategory';
import PricingSection from '../../components/PricingSection/PricingSection';
import { useLocation } from 'react-router-dom';
const Home = () => {
  const location = useLocation();
  // console.log(location);

  useEffect(() => {
    if (location?.hash === '#package') {
      document.getElementById('goToPackage').click();
    }
  }, [location]);
  return (
    <div>
      <a href="#package" id="goToPackage"></a>
      <Banner />
      <div className="w-11/12 xl:w-10/12 mx-auto max-w-[1700px]">
        <MealsbyCategory />
        <MealsGallery />
      </div>
      <PricingSection />
      <div className="w-11/12 xl:w-10/12 mx-auto max-w-[1700px]">
        <ContactTop />
      </div>
    </div>
  );
};

export default Home;
