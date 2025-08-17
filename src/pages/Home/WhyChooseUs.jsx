import { FaHandshake, FaBook, FaGlobe, FaAward } from "react-icons/fa";

const WhyChooseUs = () => {
  const points = [
    {
      icon: <FaHandshake className="text-green-600 text-3xl" />,
      text: "Trusted by thousands of students worldwide"
    },
    {
      icon: <FaBook className="text-green-600 text-3xl" />,
      text: "Access to top scholarships and study guides"
    },
    {
      icon: <FaGlobe className="text-green-600 text-3xl" />,
      text: "Global network of partner universities"
    },
    {
      icon: <FaAward className="text-green-600 text-3xl" />,
      text: "High success rate in scholarship approvals"
    }
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        💡 Why Choose Us?
      </h2>
      <div className="grid md:grid-cols-4 gap-6">
        {points.map((p, i) => (
          <div
            key={i}
            className="bg-green-50 p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <div className="flex justify-center mb-3">{p.icon}</div>
            <p className="text-gray-700 font-medium">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
