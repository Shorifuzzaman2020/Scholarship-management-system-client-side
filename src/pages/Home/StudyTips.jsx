

import { FaGlobe, FaClock, FaPenFancy, FaUserFriends } from "react-icons/fa";

const StudyTips = () => {
  const tips = [
    {
      icon: <FaGlobe className="text-green-600 text-xl" />,
      text: "Research your destination country's culture and lifestyle",
    },
    {
      icon: <FaClock className="text-green-600 text-xl" />,
      text: "Check visa and application deadlines early",
    },
    {
      icon: <FaPenFancy className="text-green-600 text-xl" />,
      text: "Build a strong Statement of Purpose (SOP)",
    },
    {
      icon: <FaUserFriends className="text-green-600 text-xl" />,
      text: "Talk to alumni or current students from that university",
    },
  ];

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
        🎓 Top Study Abroad Tips
      </h2>
      <div className="space-y-5">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-green-50 p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="mt-1">{tip.icon}</div>
            <p className="text-gray-800 text-lg font-medium">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyTips;
