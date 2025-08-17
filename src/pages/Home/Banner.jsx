
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const Banner = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/scholarships");
  };

  const handleVisitOfficeClick = () => {
    navigate("/our-office");
  };
  const slides = [
    {
      title: "A New Approach to",
      highlight: "Study Of University",
      subtitle: "Apply now for fully funded scholarships and build your future in top universities worldwide!",
      image: "https://i.ibb.co.com/5XS3fw5z/pexels-pixabay-267885.webp"
    },
    {
      title: "Explore Global Opportunities",
      highlight: "Scholarships Abroad",
      subtitle: "Your gateway to world-class education in the USA, UK, Canada, and beyond.",
      image: "https://i.ibb.co/vxkvWtXR/whats-university-like-accepted-students.jpg"
    },
    {
      title: "Admissions Open Now!",
      highlight: "Join Top Universities",
      subtitle: "Limited seats, apply early to secure your spot and shape your career.",
      image: "https://i.ibb.co.com/HTMXYr4J/pexels-keira-burton-6147369.webp"
    }
  ];

  return (
    <div className="h-[500px] w-11/12 mx-auto mt-4 relative rounded-lg overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-opacity-50"></div>

              <div className="relative text-center px-4 max-w-3xl text-white z-10">
                <h2 className="text-lg md:text-2xl font-medium mb-2">{slide.title}</h2>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
                  {slide.highlight}
                </h1>
                <p className="text-sm md:text-lg font-light mb-6">{slide.subtitle}</p>

                <div className="flex justify-center gap-4 flex-wrap">
                  <button
                    onClick={handleExploreClick}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    Explore Scholarship Now
                  </button>

                  <button
                    onClick={handleVisitOfficeClick}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    Visit our office
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
