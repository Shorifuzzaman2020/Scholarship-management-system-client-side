// import { useQuery } from "@tanstack/react-query";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';

// const ReviewSlider = ({ scholarshipId }) => {
//   const { data: reviews = [], isLoading } = useQuery({
//     queryKey: ['reviews', scholarshipId],
//     queryFn: async () => {
//       const res = await fetch(`http://localhost:5000/reviews/${scholarshipId}`);
//       return res.json();
//     }
//   });

//   if (isLoading || reviews.length === 0) return <p>No reviews yet</p>;

//   return (
//     <Swiper slidesPerView={1} loop>
//       {reviews.map((r, idx) => (
//         <SwiperSlide key={idx}>
//           <div className="p-4 border rounded bg-gray-100">
//             <div className="flex items-center gap-3 mb-2">
//               <img src={r.userImage || '/default-avatar.png'} className="w-10 h-10 rounded-full" />
//               <div>
//                 <p className="font-bold">{r.userName}</p>
//                 <p className="text-sm">{r.reviewDate}</p>
//               </div>
//             </div>
//             <p className="italic text-yellow-600">Rating: {r.rating}/5</p>
//             <p>{r.comment}</p>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default ReviewSlider;


import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ReviewSlider = () => {
  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/reviews`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    }
  });

  if (isLoading) return <p className="text-center text-green-600">Loading reviews...</p>;
  if (isError || reviews.length === 0) return <p className="text-center text-red-600">No reviews available.</p>;

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
        {reviews.map((r, idx) => (
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
                  <p className="text-sm text-gray-500">{r.reviewDate}</p>
                </div>
              </div>
              <p className="text-gray-700">{r.reviewText}</p>
              <p className="text-yellow-600 font-medium mb-2">⭐ {r.rating}/5</p>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
