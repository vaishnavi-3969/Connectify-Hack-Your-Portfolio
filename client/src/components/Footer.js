import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { IoLogoTwitter } from 'react-icons/io';

const Footer = () => {
  return (
    <footer className="text-white bg-gray-900 mt-auto">
      <div className="px-4 py-4 mx-auto max-w-7xl">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="mb-8 md:mb-0">
            <h3 className="mb-4 text-xl font-bold">Connectify</h3>
            <p className="text-gray-400">Your platform for networking, mentorship, and project collaboration.</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
        <hr className="my-1 border-gray-800" />
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <AiFillGithub className="text-2xl" />
            </a>
            <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <AiFillLinkedin className="text-2xl" />
            </a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <IoLogoTwitter className="text-2xl" />
            </a>
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Connectify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;