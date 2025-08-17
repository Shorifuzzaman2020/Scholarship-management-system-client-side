const ApplyNowCTA = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-600 to-blue-600 py-16 text-center text-white rounded-xl my-12 mx-4 md:mx-12">
      <div className="absolute inset-0 bg-black/30 rounded-xl"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          🌍 Start Your Scholarship Journey Today!
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Thousands of students have already secured their future with our platform.  
          Don’t miss the chance to study at world-class universities.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/scholarships"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-lg transition"
          >
            Explore Scholarships
          </a>
          <a
            href="/scholarships"
            className="px-6 py-3 bg-white text-green-700 hover:bg-gray-100 font-semibold rounded-lg shadow-lg transition"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApplyNowCTA;
