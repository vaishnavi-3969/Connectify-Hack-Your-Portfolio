import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectList);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl min-h-screen p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects.map(project => (
          <Link key={project.id} to={`/project/${project.id}`}>
            <div className="p-4 rounded-md cursor-pointer bg-dark-purple">
              <h2 className="text-xl font-bold text-mint-green">{project.title}</h2>
              <p className="text-mint-green">{project.description}</p>
              <p className="text-mint-green">Technologies: {project.technologies.join(', ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;