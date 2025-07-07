import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

import { useQuery } from '@tanstack/react-query';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ffbb28"];

const AnalyticsPage = () => {
  const { data: analytics = {}, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await fetch("https://your-server.com/analytics");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading Analytics...</p>;

  const {
    applicationsByCategory = [],
    universityByCountry = [],
    avgRatingBySubject = []
  } = analytics;

  return (
    <div className="space-y-12">
      <h2 className="text-2xl font-bold text-center">📊 Admin Analytics</h2>

      {/* Applications per Scholarship Category */}
      <div className="shadow p-4 rounded-lg bg-base-100">
        <h3 className="text-lg font-semibold mb-2">Applications per Scholarship Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={applicationsByCategory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* University by Country */}
      <div className="shadow p-4 rounded-lg bg-base-100">
        <h3 className="text-lg font-semibold mb-2">Top Countries by University Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={universityByCountry}
              dataKey="count"
              nameKey="country"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {universityByCountry.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Average Ratings by Subject */}
      <div className="shadow p-4 rounded-lg bg-base-100">
        <h3 className="text-lg font-semibold mb-2">Average Ratings by Subject Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={avgRatingBySubject}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="averageRating" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
