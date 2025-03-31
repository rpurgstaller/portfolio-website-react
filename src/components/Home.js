import React from 'react';
import {Link} from 'react-router-dom';


export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center p-8">
      <h1 className="text-5xl font-extrabold">Welcome to My Portfolio</h1>
      <p className="text-xl mt-4 max-w-xl">I'm a passionate developer creating awesome projects that bring ideas to
        life.</p>
      <Link to="/projects"
            className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-300">
        View My Work
      </Link>
    </div>
  );
}
