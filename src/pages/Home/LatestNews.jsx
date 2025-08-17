const LatestNews = () => {
  const news = [
    {
      title: "New Scholarship Announced in Germany",
      date: "Aug 2025",
      summary: "Germany opens new fully funded scholarships for international students in STEM fields."
    },
    {
      title: "Application Deadlines Approaching",
      date: "Sep 2025",
      summary: "Deadlines for UK and Canadian scholarships are closing soon. Apply now!"
    },
    {
      title: "USA Increases Scholarship Funding",
      date: "Oct 2025",
      summary: "The US has increased funding for graduate scholarships in technology and healthcare fields."
    }
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        📰 Latest News
      </h2>
      <div className="space-y-6">
        {news.map((n, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-green-700">{n.title}</h3>
            <p className="text-sm text-gray-500">{n.date}</p>
            <p className="text-gray-700 mt-2">{n.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
