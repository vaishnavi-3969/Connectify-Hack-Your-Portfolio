import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const initialMentors = [
  {
    name: 'Sarah Connor',
    position: 'Software Development Engineer (SDE) at Google',
    description: 'Experienced software engineer with a focus on scalable web applications and cloud computing.',
    profileImage: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    backgroundImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    linkedin: 'https://www.linkedin.com/in/sarahconnor',
    github: 'https://github.com/terminatorswrath',
    email: 'sarah.theterminator@gmail.com',
    specialization: 'Web Development, Cloud Computing',
    charge: '$50/Complete Session',
  },
  {
    name: 'John Doe',
    position: 'Business Analyst at KPMG',
    description: 'Skilled business analyst with expertise in data analysis, financial modeling, and business strategy.',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds',
    backgroundImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    github: 'https://github.com/doeyedjohn',
    email: 'john.doe@kpmg.com',
    specialization: 'Data Analysis, Financial Modeling',
    charge: '$40/Complete Session',
  },
  {
    name: 'Miranda Priestly',
    position: 'Product Manager at Spotify',
    description: 'Experienced product manager with a background in user research, product strategy, and cross-functional team leadership.',
    profileImage: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds',
    backgroundImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    linkedin: 'https://www.linkedin.com/in/mirandapriestly',
    github: 'https://github.com/thedevilwearsprada',
    email: 'miranda.priestly@spotify.com',
    specialization: 'Product Management, User Research',
    charge: '$60/Complete Session',
  }
];

const techSpecializations = [
  'Web Development',
  'Cloud Computing',
  'Data Analysis',
  'Financial Modeling',
  'Product Management',
  'User Research',
  'Machine Learning',
  'Cybersecurity',
  'Mobile Development',
  'DevOps',
  'Blockchain',
  'AR/VR',
];

const getRandomSpecializations = () => {
  const shuffled = techSpecializations.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2).join(', ');
};

const Mentors = () => {
  const [mentors, setMentors] = useState(initialMentors.map(mentor => ({ ...mentor, specialization: getRandomSpecializations() })));
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=20&nat=us');
        const newMentors = response.data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          position: 'Mentor',
          description: 'Professional mentor with expertise in various fields.',
          profileImage: user.picture.large,
          backgroundImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          linkedin: `https://www.linkedin.com/in/${user.login.username}`,
          github: `https://github.com/${user.login.username}`,
          email: user.email,
          specialization: getRandomSpecializations(),
          charge: '$30/Complete Session',
        }));
        setMentors((prevMentors) => [...prevMentors, ...newMentors]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mentors:', error);
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredMentors = filter ? mentors.filter(mentor => mentor.specialization.includes(filter)) : mentors;

  return (
    <div className="bg-[#A6CFD5] flex flex-col justify-center items-center min-h-screen p-10">
      <div className="w-full mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Mentors</h1>
        <p className="mt-2 text-lg text-gray-700">
          Connect with industry professionals to enhance your personal portfolio and receive guidance in your field of interest. Reach out via LinkedIn or Email. Check out their GitHub to see the exciting projects they are working on!
        </p>
        <div className="mt-4">
          <label className="text-gray-700">Filter by Specialization: </label>
          <select className="p-2 ml-2 border rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            {techSpecializations.map((specialization, index) => (
              <option key={index} value={specialization}>{specialization}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap justify-around w-full">
        {filteredMentors.map((mentor, index) => (
          <div
            key={index}
            className="max-w-sm mx-4 my-4 text-gray-900 bg-white rounded-lg shadow-xl"
          >
            <div className="h-32 overflow-hidden rounded-t-lg">
              <img className="object-cover object-top w-full" src={mentor.backgroundImage} alt="Background" />
            </div>
            <div className="relative w-32 h-32 mx-auto -mt-16 overflow-hidden border-4 border-white rounded-full">
              <img className="object-cover object-center h-32" src={mentor.profileImage} alt="Profile" />
            </div>
            <div className="mt-2 text-center">
              <h2 className="font-semibold">{mentor.name}</h2>
              <p className="text-gray-500">{mentor.position}</p>
              <p className="px-4 mt-2 text-gray-600">{mentor.description}</p>
              <p className="mt-2 font-semibold text-gray-700">Specialization: {mentor.specialization}</p>
              <p className="mt-2 font-semibold text-gray-700">Charge: {mentor.charge}</p>
            </div>
            <ul className="flex items-center justify-around py-4 mt-2 text-gray-700">
              <li className="flex flex-col items-center justify-around">
                <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="w-6 h-6 text-blue-900 fill-current" />
                </a>
              </li>
              <li className="flex flex-col items-center justify-around">
                <a href={mentor.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="w-6 h-6 text-blue-900 fill-current" />
                </a>
              </li>
              <li className="flex flex-col items-center justify-around">
                <a href={`mailto:${mentor.email}`} target="_blank" rel="noopener noreferrer">
                  <FaEnvelope className="w-6 h-6 text-blue-900 fill-current" />
                </a>
              </li>
            </ul>
            <div className="p-4 mx-8 mt-2 border-t">
              <button
                className="block w-full px-6 py-2 font-semibold text-white bg-gray-900 rounded-full hover:shadow-lg"
                onClick={() => window.location.href = 'https://buy.stripe.com/test_cN27tyaiIddYfmgaEG'}
              >
                Book Mentorship
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;