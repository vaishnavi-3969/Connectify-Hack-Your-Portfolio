import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill, BsFillChatDotsFill } from 'react-icons/bs';
import { HiOutlineDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black py-7 bg-gradient-to-b from-mint-green to-light-blue">
     
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="mb-8 text-5xl font-bold">Welcome to Connectify</h1>
        <p className="max-w-lg mb-12 text-lg text-center">
          Connectify is your platform for networking, mentorship, and project collaboration. Join us in building connections that matter.
        </p>
        <div className="flex mb-8 space-x-4">
          <Link to="/login" className="px-6 py-3 text-lg font-semibold text-white duration-300 rounded-md text-transition-colors bg-dark-purple hover:bg-marian-blue">
            Sign Up/Login
          </Link>
        </div>
        <div className="flex justify-center space-x-8">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/projects">
              <div className="flex items-center justify-center p-4 rounded-full bg-marian-blue bg-opacity-20">
                <HiOutlineDocumentText className="mr-2 text-3xl" />
                <span className="text-xl">Explore Projects</span>
              </div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/mentors">
              <div className="flex items-center justify-center p-4 rounded-full bg-marian-blue bg-opacity-20">
                <BsFillPersonFill className="mr-2 text-3xl" />
                <span className="text-xl">Find Mentors</span>
              </div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/events">
              <div className="flex items-center justify-center p-4 rounded-full bg-marian-blue bg-opacity-20">
                <HiOutlineUserGroup className="mr-2 text-3xl" />
                <span className="text-xl">Attend Events</span>
              </div>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/testimonials">
              <div className="flex items-center justify-center p-4 rounded-full bg-marian-blue bg-opacity-20">
                <BsFillChatDotsFill className="mr-2 text-3xl" />
                <span className="text-xl">Read Testimonials</span>
              </div>
            </Link>
          </motion.div>
        </div>
        <div className="mt-12 text-center">
          <p className="mb-4 text-lg">Join Connectify to:</p>
          <ul className="text-lg list-disc list-inside">
            <li>Connect with professionals in your field</li>
            <li>Find mentors for guidance and support</li>
            <li>Explore exciting projects and collaborations</li>
            <li>Attend events and expand your network</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;