// import ReviewSlider from "../ScholarshipDetails/ReviewSlider";

// const Testimonials = () => {
//   return (
//     <div className="bg-gray-100 mt-10 py-10 px-4">
//       <h2 className="text-2xl text-center font-bold mb-6">💬 What Our Students Say</h2>
      
      
//     </div>
//   );
// };

// export default Testimonials;

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ayesha Khan",
      country: "Canada",
      feedback:
        "Thanks to this platform, I secured a fully funded scholarship at the University of Toronto. The guidance and tips were invaluable!"
    },
    {
      name: "Rafiq Ahmed",
      country: "UK",
      feedback:
        "The application process was smooth. I’m now pursuing my Master’s in Computer Science at the University of Edinburgh."
    },
    {
      name: "Sophia Lee",
      country: "USA",
      feedback:
        "This website connected me to multiple opportunities. I landed a scholarship in New York University!"
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
        🌟 Student Testimonials
      </h2>
      <div className="grid gap-6 max-w-5xl mx-auto px-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <p className="text-gray-700 italic mb-4">“{t.feedback}”</p>
            <h4 className="font-bold text-green-700">{t.name}</h4>
            <p className="text-sm text-gray-500">{t.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
