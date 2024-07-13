import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, getDocs, where } from 'firebase/firestore';
import { FiGithub } from 'react-icons/fi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { HiOutlineSearch } from 'react-icons/hi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [technologiesList, setTechnologiesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectList);
        setFilteredProjects(projectList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    // Fetch unique technologies from projects
    const fetchTechnologies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const techSet = new Set();
        querySnapshot.forEach(doc => {
          const { technologies } = doc.data();
          technologies.forEach(tech => techSet.add(tech));
        });
        const techArray = Array.from(techSet);
        setTechnologiesList(techArray);
      } catch (error) {
        console.error('Error fetching technologies:', error);
      }
    };

    fetchTechnologies();
  }, []);

  useEffect(() => {
    const filterProjects = () => {
      let filtered = projects;

      if (searchTerm.trim() !== '') {
        const searchRegex = new RegExp(searchTerm.trim(), 'i');
        filtered = filtered.filter(project => searchRegex.test(project.title) || searchRegex.test(project.description));
      }

      if (selectedTechnology !== '') {
        filtered = filtered.filter(project => project.technologies.includes(selectedTechnology));
      }

      setFilteredProjects(filtered);
    };

    filterProjects();
  }, [projects, searchTerm, selectedTechnology]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterTechnology = (technology) => {
    setSelectedTechnology(technology === selectedTechnology ? '' : technology);
  };

  const handleLikeProject = (projectId) => {
    //TODO: Add logic to fetch no.of likes
    console.log(`Liked project with ID: ${projectId}`);
  };

  return (
    <div className="max-w-4xl min-h-screen p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Projects</h1>
      <div className="flex items-center mb-4 space-x-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search projects..."
            className="w-64 px-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white"
          />
          <HiOutlineSearch className="absolute text-gray-500 top-3 right-3" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Filter by technology:</span>
          {loading ? (
            <span className="px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-200 rounded-md">Loading...</span>
          ) : (
            technologiesList.map(tech => (
              <button
                key={tech}
                onClick={() => handleFilterTechnology(tech)}
                className={`btn-filter ${selectedTechnology === tech ? 'btn-active' : ''}`}
              >
                {tech}
              </button>
            ))
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 ">
        {filteredProjects.map(project => (
          <Link key={project.id} to={`/project/${project.id}`}>
            <div className="relative p-4 rounded-md cursor-pointer bg-dark-purple">
              <h2 className="text-xl font-bold text-mint-green">{project.title}</h2>
              <p className="text-mint-green">{project.description}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 text-sm font-semibold text-white bg-gray-800 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <FiGithub className="text-xl text-gray-400 hover:text-gray-500" />
                  </a>
                  <button className="flex items-center" onClick={() => handleLikeProject(project.id)}>
                    <AiOutlineHeart className="text-xl text-red-500 hover:text-red-600" />
                    //TODO: NO. of likes
                    <span className="ml-1 text-gray-400">0</span>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;