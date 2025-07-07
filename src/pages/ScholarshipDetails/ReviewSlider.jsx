import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ReviewSlider = ({ scholarshipId }) => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', scholarshipId],
    queryFn: async () => {
      const res = await fetch(`https://your-server.com/reviews/${scholarshipId}`);
      return res.json();
    }
  });

  if (isLoading || reviews.length === 0) return <p>No reviews yet</p>;

  return (
    <Swiper slidesPerView={1} loop>
      {reviews.map((r, idx) => (
        <SwiperSlide key={idx}>
          <div className="p-4 border rounded bg-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <img src={r.userImage || '/default-avatar.png'} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-bold">{r.userName}</p>
                <p className="text-sm">{r.reviewDate}</p>
              </div>
            </div>
            <p className="italic text-yellow-600">Rating: {r.rating}/5</p>
            <p>{r.comment}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewSlider;
