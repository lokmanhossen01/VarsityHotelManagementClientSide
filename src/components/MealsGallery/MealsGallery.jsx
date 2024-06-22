const img1 = 'https://i.ibb.co/7gWStfJ/meals8.jpg';
const img3 = 'https://i.ibb.co/3yr18gm/dfsdfsdf.jpg';
const img4 = 'https://i.ibb.co/4WY6ZRN/meals10.jpg';
const img6 = 'https://i.ibb.co/42v6rNQ/meals-9.jpg';
const img7 = 'https://i.ibb.co/DK6YDSy/meals7.jpg';
const img8 = 'https://i.ibb.co/6Fw6dV5/meals6.jpg';
const img9 = 'https://i.ibb.co/nz0bF1T/meals5.jpg';
const img10 = 'https://i.ibb.co/NymD7JN/meals4.jpg';
const img11 = 'https://i.ibb.co/VwRt3zN/meals3.png';

const MealsGallery = () => {
  return (
    <div className="pb-16 bg-fixed">
      <div className="mt-6 mb-7">
        <h1 className="text-3xl md:text-5xl text-center pt-5 font-bold pb-0">
          Our Meals Gallery
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="h-64 rounded-md col-span-2 overflow-hidden">
          <div
            className="h-full rounded-md w-full bg-cover bg-no-repeat bg-center hover:scale-110 hover:rotate-2 duration-[2s] "
            style={{
              backgroundImage: `url(${img1})`,
            }}
          ></div>
        </div>

        <div className="h-64 rounded-md overflow-hidden">
          <div
            className="h-full rounded-md w-full bg-cover bg-no-repeat bg-center hover:scale-110 hover:rotate-2 duration-[2s] "
            style={{
              backgroundImage: `url(${img8})`,
            }}
          ></div>
        </div>

        <div className="h-64 rounded-md overflow-hidden">
          <div
            className="h-full rounded-md w-full bg-cover bg-no-repeat bg-center hover:scale-110 hover:rotate-2 duration-[2s] "
            style={{
              backgroundImage: `url(${img3})`,
            }}
          ></div>
        </div>

        <div className="sm:h-full rounded-md sm:row-span-2 hidden sm:block overflow-hidden">
          <div
            className="h-full rounded-md w-full bg-cover bg-no-repeat bg-center hover:scale-110 hover:rotate-2 duration-[2s] "
            style={{
              backgroundImage: `url(${img9})`,
            }}
          ></div>
        </div>

        <div className="h-64 rounded-md col-span-2 sm:hidden overflow-hidden">
          <div
            className="h-full rounded-md w-full bg-cover bg-no-repeat bg-center hover:scale-110 hover:rotate-2 duration-[2s] "
            style={{
              backgroundImage: `url(${img11})`,
            }}
          ></div>
        </div>

        <div className="h-64 rounded-md overflow-hidden">
          <div
            className="h-full rounded-md w-full bg-cover bg-no-repeat bg-center hover:scale-110 hover:rotate-2 duration-[2s] "
            style={{
              backgroundImage: `url(${img4})`,
            }}
          ></div>
        </div>

        <div className="h-64 rounded-md sm:col-span-2 overflow-hidden">
          <div
            className="h-full rounded-md w-full bg-cover bg-no-repeat bg-center hover:scale-110 hover:rotate-2 duration-[2s] "
            style={{
              backgroundImage: `url(${img10})`,
            }}
          ></div>
        </div>

        <div className="h-64 rounded-md col-span-2 overflow-hidden">
          <div
            className="h-full rounded-md w-full bg-cover bg-no-repeat bg-center hover:scale-110 hover:rotate-2 duration-[2s] "
            style={{
              backgroundImage: `url(${img7})`,
            }}
          ></div>
        </div>

        <div className="sm:h-64 rounded-md col-span-1 sm:block hidden overflow-hidden">
          <div
            className="h-full rounded-md w-full bg-cover bg-no-repeat bg-center hover:scale-110 hover:rotate-2 duration-[2s] "
            style={{
              backgroundImage: `url(${img6})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MealsGallery;
