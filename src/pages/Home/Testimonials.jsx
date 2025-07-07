const Testimonials = () => {
  return (
    <div className="bg-gray-100 py-10 px-4">
      <h2 className="text-2xl text-center font-bold mb-6">💬 What Our Students Say</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded shadow">
          <p>"ScholarWise helped me find the perfect scholarship in Germany!"</p>
          <p className="mt-2 font-semibold">– Anika Rahman</p>
        </div>
        <div className="p-5 bg-white rounded shadow">
          <p>"I got a 100% tuition waiver thanks to this platform!"</p>
          <p className="mt-2 font-semibold">– Mehedi Hasan</p>
        </div>
        <div className="p-5 bg-white rounded shadow">
          <p>"Super easy application and fast updates. Highly recommended."</p>
          <p className="mt-2 font-semibold">– Tania Jahan</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
