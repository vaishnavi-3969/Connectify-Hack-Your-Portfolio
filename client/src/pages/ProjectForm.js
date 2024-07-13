import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from '../contexts/authcontext';

const ProjectForm = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState([]);
  const [technologyInput, setTechnologyInput] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [projectInfo, setProjectInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        technologies,
        githubLink,
        projectInfo,
        owner: currentUser.email,
        likes: [],
        comments: []
      });
      setTitle('');
      setDescription('');
      setTechnologies([]);
      setGithubLink('');
      setProjectInfo('');
      alert('Project created successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const addTechnology = () => {
    if (technologyInput.trim() !== '') {
      setTechnologies([...technologies, technologyInput.trim()]);
      setTechnologyInput('');
    }
  };

  const removeTechnology = (index) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 rounded-md bg-dark-purple text-mint-green">
      <h1 className="mb-6 text-2xl font-bold text-mint-green">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-mint-green">Title</label>
          <input
            type="text"
            className="block w-full p-2 mt-1 border rounded-md border-mint-green bg-dark-purple text-mint-green"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-mint-green">Description</label>
          <textarea
            className="block w-full p-2 mt-1 border rounded-md border-mint-green bg-dark-purple text-mint-green"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-mint-green">Technologies</label>
          <div className="flex items-center mt-1">
            <input
              type="text"
              className="flex-1 p-2 border rounded-md border-mint-green bg-dark-purple text-mint-green"
              value={technologyInput}
              onChange={(e) => setTechnologyInput(e.target.value)}
              placeholder="Add a technology"
            />
            <button
              type="button"
              className="p-2 ml-2 text-white rounded-md bg-marian-blue hover:bg-light-blue"
              onClick={addTechnology}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap mt-2 space-x-2">
            {technologies.map((tech, index) => (
              <span key={index} className="px-2 py-1 text-white rounded-md bg-federal-blue">
                {tech}
                <button
                  type="button"
                  className="ml-1 text-red-500"
                  onClick={() => removeTechnology(index)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-mint-green">GitHub Link</label>
          <input
            type="url"
            className="block w-full p-2 mt-1 border rounded-md border-mint-green bg-dark-purple text-mint-green"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-mint-green">More Project Info</label>
          <textarea
            className="block w-full p-2 mt-1 border rounded-md border-mint-green bg-dark-purple text-mint-green"
            value={projectInfo}
            onChange={(e) => setProjectInfo(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 text-white rounded-md bg-marian-blue hover:bg-light-blue"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;