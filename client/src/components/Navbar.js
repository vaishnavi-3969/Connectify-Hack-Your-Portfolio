import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiClipboard, FiMessageCircle, FiCalendar, FiFile } from 'react-icons/fi';
import { GiPathDistance } from 'react-icons/gi';
import { FaConnectdevelop, FaNewspaper, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="text-white bg-gray-900 shadow-md">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center px-2 m-1 rounded-lg bg-mint-green text-dark-purple">
              <FaConnectdevelop className="mr-2 text-xl" />
              Connectify
            </Link>
            <Link to="/projects" className="flex items-center px-2 ml-4">
              <FiClipboard className="mr-2 text-xl" />
              Projects
            </Link>
            <Link to="/mentors" className="flex items-center px-2 ml-4">
              <GiPathDistance className="mr-2 text-xl" />
              Mentorship
            </Link>
            <Link to="/reviews" className="flex items-center px-2 ml-4">
              <FiMessageCircle className="mr-2 text-xl" />
              Testimonials
            </Link>
            <Link to="/events" className="flex items-center px-2 ml-4">
              <FiCalendar className="mr-2 text-xl" />
              Event
            </Link>
            <Link to="/resume-analyzer" className="flex items-center px-2 ml-4">
              <FiFile className="mr-2 text-xl" />
              Resume Analysis
            </Link>
            <Link to="/cover-letter" className="flex items-center px-2 ml-4">
              <FiFile className="mr-2 text-xl" />
              Cover Letter Generator
            </Link>
            <Link to="/tech-updated" className="flex items-center px-2 ml-4">
              <FaNewspaper className="mr-2 text-xl" />
              News
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/profile" className="px-4 py-2 ml-4 bg-gray-400 rounded-lg hover:bg-gray-700">
              <FaUser/>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;