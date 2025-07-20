

import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewSlider = ({ scholarship }) => {
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/reviews`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    }
  });


  if (!scholarship || !scholarship._id) {
    return <p className="text-center text-red-600">Scholarship data unavailable.</p>;
  }

  // Safe filtering
  const filteredReviews = reviews.filter(
    (r) => r.scholarshipId === scholarship._id || r.scholarshipId?.toString() === scholarship._id?.toString()
  );

  if (isLoading) return <p className="text-center text-green-600">Loading reviews...</p>;

  if (isError || filteredReviews.length === 0) {
    return <p className="text-center text-red-600">No reviews found for this scholarship.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <Swiper
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {filteredReviews.map((r, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white shadow-md rounded-lg p-6 border border-green-200">
              <div className="flex flex-col justify-center items-center gap-4 mb-4">
                <img
                  src={r.reviewerImage || '/default-avatar.png'}
                  alt="User"
                  className="w-12 h-12 rounded-full border border-green-400"
                />
                <div>
                  <p className="text-lg font-semibold text-green-700">{r.reviewerName}</p>
                  <p className="text-sm text-gray-500">{new Date(r.reviewDate).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-gray-700">{r.reviewText}</p>
              <p className="text-yellow-600 font-medium mb-2">⭐ {r.rating || "N/A"}/5</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
