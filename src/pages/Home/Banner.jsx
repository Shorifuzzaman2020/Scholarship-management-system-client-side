import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Banner = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      loop
      className="h-60 md:h-96"
    >
      <SwiperSlide>
        <div className="bg-blue-300 h-full flex items-center justify-center text-white text-xl font-bold">🎓 100% Free Scholarships Available Now!</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-green-400 h-full flex items-center justify-center text-white text-xl font-bold">🌍 Study in Top-Ranked Global Universities</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-indigo-400 h-full flex items-center justify-center text-white text-xl font-bold">📢 Apply Now Before Deadline Ends!</div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
