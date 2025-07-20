import React from 'react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-10 rounded-lg shadow-xl">
                <h1 className="text-6xl font-extrabold text-red-600">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page not found</h2>
                <p className="text-lg text-gray-500 mt-2">
                    Sorry, the page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <a href="/" className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
