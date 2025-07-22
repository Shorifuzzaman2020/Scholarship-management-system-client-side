

import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LabelList
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const STATUS_COLORS = {
  pending: '#FFBB28',
  approved: '#00C49F',
  rejected: '#FF8042',
  in_review: '#0088FE'
};

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'https://scholarship-server-liard.vercel.app';
  const token = localStorage.getItem('access-token');

  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${API_URL}/analytics`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Failed to fetch analytics");
        const data = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [token, API_URL]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-8">
      <strong>Error: </strong> {error}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📊 Scholarship Analytics Dashboard
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <SummaryCard
          title="Scholarships"
          value={analytics.totalScholarships}
          icon="🎓"
          color="bg-blue-100"
        />
        <SummaryCard
          title="Applications"
          value={analytics.totalApplications}
          icon="📝"
          color="bg-green-100"
        />
        <SummaryCard
          title="Users"
          value={analytics.totalUsers}
          icon="👥"
          color="bg-purple-100"
        />
        <SummaryCard
          title="Moderators"
          value={analytics.totalModerators}
          icon="🛡️"
          color="bg-yellow-100"
        />
        <SummaryCard
          title="Reviews"
          value={analytics.totalReviews}
          icon="⭐"
          color="bg-pink-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Popular Scholarships Chart */}
        <ChartContainer title="Top Scholarships by Applications">
          {analytics.popularScholarships.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={analytics.popularScholarships}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="scholarshipName"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#8884d8" radius={[4, 4, 0, 0]}>
                  <LabelList
                    dataKey="applications"
                    position="top"
                    formatter={(value) => `${value} apps`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No scholarship application data available
            </div>
          )}
        </ChartContainer>

        {/* Application Status Chart */}
        <ChartContainer title="Application Status Distribution">
          {analytics.applicationStatuses.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.applicationStatuses}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  nameKey="name"
                >
                  {analytics.applicationStatuses.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} applications`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No application status data available
            </div>
          )}
        </ChartContainer>
      </div>

      {/* User Roles and Most Popular Scholarship */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Roles */}
        <ChartContainer title="User Role Distribution">
          {analytics.userRoles.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.userRoles}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  nameKey="name"
                >
                  {analytics.userRoles.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No user role data available
            </div>
          )}
        </ChartContainer>

        {/* Most Popular Scholarship */}
        
        {analytics.mostPopularScholarship ? (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
              <span className="mr-2">🔥</span> Most Popular Scholarship
            </h3>
            <div className="flex flex-col items-center justify-center text-center">
              {analytics.mostPopularScholarship && (
                <img
                  src={analytics.mostPopularScholarship.universityImage}
                  alt={analytics.mostPopularScholarship.universityName}
                  className="w-16 h-16 rounded-lg object-cover mb-4"
                />
              )}
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-semibold">
                  {analytics.mostPopularScholarship.scholarshipName}
                </h4>
                <p className="text-gray-600">
                  {analytics.mostPopularScholarship.universityName}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    ${analytics.mostPopularScholarship.applicationFees} fee
                  </span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {analytics.mostPopularScholarship.applications} applications
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                    {analytics.mostPopularScholarship.degree}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
              <span className="mr-2">🔥</span> Most Popular Scholarship
            </h3>
            <p className="text-gray-500">No popular scholarship data available</p>
          </div>
        )}

      </div>
    </div>
  );
};

// Helper Components
const SummaryCard = ({ title, value, icon, color }) => (
  <div className={`${color} rounded-xl shadow-md p-6 transition-transform hover:scale-105`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);

const ChartContainer = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    {children}
  </div>
);

export default AnalyticsPage;