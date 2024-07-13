import React from 'react';
import { useAuth } from '../contexts/authcontext';
import { Link } from 'react-router-dom';
import { BsFillPersonFill, BsFillChatDotsFill } from 'react-icons/bs';
import { HiOutlineDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { motion } from 'framer-motion';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen px-4 py-8 text-center">
      {currentUser ? (
        <div>
          <div>
            <h1 className="mb-4 text-3xl font-bold">Welcome back, {currentUser.displayName}!</h1>
            <p className="mb-8 text-lg">Connectify is your platform for networking, mentorship, and project collaboration. Join us in building connections that matter.</p>
            <Link to="/profile" className="px-6 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
              Go to Profile
            </Link>
          </div>
          <div>
            <div className="flex justify-center space-x-8 py-11">
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

          </div>
        </div>
      ) : (
        <div>
          <h1>Sorry, you are not logged in</h1>
          <p>Please log in to view this page</p>
        </div>
      )}
    </div>
  );
};

export default Home;