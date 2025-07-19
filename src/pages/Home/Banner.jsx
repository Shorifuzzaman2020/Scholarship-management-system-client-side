
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Banner = () => {
  const slides = [
    {
      title: "🎓 100% Free Scholarships",
      subtitle: "Unlock your dream university with fully funded scholarships!",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "🌍 Study at Top Global Universities",
      subtitle: "Admission open in USA, UK, Canada, Germany & more!",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "⏰ Hurry Up!",
      subtitle: "Apply before deadlines end. Limited seats available!",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000 }}
      loop
      className="h-64 md:h-96"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className={`h-full bg-gradient-to-r ${slide.gradient} text-white flex flex-col items-center justify-center px-4 w-11/12 mx-auto my-4 rounded-lg text-center transition-all duration-500`}
          >
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 drop-shadow-sm">
              {slide.title}
            </h2>
            <p className="text-sm md:text-lg font-medium max-w-2xl">
              {slide.subtitle}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
