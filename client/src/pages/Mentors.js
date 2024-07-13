import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const mentors = [
  {
    name: 'Sarah Connor',
    position: 'Software Development Engineer (SDE) at Google',
    description: 'Experienced software engineer with a focus on scalable web applications and cloud computing.',
    profileImage: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    backgroundImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    linkedin: 'https://www.linkedin.com/in/sarahconnor',
    github: 'https://github.com/terminatorswrath',
    email: 'sarah.theterminator@gmail.com'
  },
  {
    name: 'John Doe',
    position: 'Business Analyst at KPMG',
    description: 'Skilled business analyst with expertise in data analysis, financial modeling, and business strategy.',
    profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds',
    backgroundImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    github: 'https://github.com/doeyedjohn',
    email: 'john.doe@kpmg.com'
  },
  {
    name: 'Miranda Priestly',
    position: 'Product Manager at Spotify',
    description: 'Experienced product manager with a background in user research, product strategy, and cross-functional team leadership.',
    profileImage: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds',
    backgroundImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    linkedin: 'https://www.linkedin.com/in/mirandapriestly',
    github: 'https://github.com/thedevilwearsprada',
    email: 'miranda.priestly@spotify.com'
  }
];

const Mentors = () => {
  return (
    <div className="bg-[#A6CFD5] flex flex-col justify-center items-center min-h-screen p-10">
      <div className="w-full text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mentors</h1>
        <p className="text-lg text-gray-700 mt-2">
          Connect with industry professionals to enhance your personal portfolio and receive guidance in your field of interest. Reach out via LinkedIn or Email. Check out their GitHub to see the exciting projects they are working on!
        </p>
      </div>
      <div className="w-full flex flex-wrap justify-around">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="max-w-sm mx-4 my-4 bg-white shadow-xl rounded-lg text-gray-900"
          >
            <div className="rounded-t-lg h-32 overflow-hidden">
              <img className="object-cover object-top w-full" src={mentor.backgroundImage} alt="Background" />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
              <img className="object-cover object-center h-32" src={mentor.profileImage} alt="Profile" />
            </div>
            <div className="text-center mt-2">
              <h2 className="font-semibold">{mentor.name}</h2>
              <p className="text-gray-500">{mentor.position}</p>
              <p className="mt-2 text-gray-600 px-4">{mentor.description}</p>
            </div>
            <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
              <li className="flex flex-col items-center justify-around">
                <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="w-6 h-6 fill-current text-blue-900" />
                </a>
              </li>
              <li className="flex flex-col items-center justify-around">
                <a href={mentor.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="w-6 h-6 fill-current text-blue-900" />
                </a>
              </li>
              <li className="flex flex-col items-center justify-around">
                <a href={`mailto:${mentor.email}`} target="_blank" rel="noopener noreferrer">
                  <FaEnvelope className="w-6 h-6 fill-current text-blue-900" />
                </a>
              </li>
            </ul>
            <div className="p-4 border-t mx-8 mt-2">
              <button className="w-full block rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
