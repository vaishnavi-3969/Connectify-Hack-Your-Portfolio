import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black py-7 bg-gradient-to-b from-mint-green to-light-blue">

      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="mb-8 text-5xl font-bold">Welcome to Connectify</h1>
        <p className="max-w-lg mb-12 text-lg text-center">
          Connectify is your platform for networking, mentorship, and project collaboration. Join us in building connections that matter.
        </p>
          <Link to="/login" className="items-center justify-center px-6 py-3 text-lg font-semibold text-white duration-300 rounded-md text-transition-colors bg-dark-purple hover:bg-marian-blue">
            Sign Up/Login
          </Link>
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