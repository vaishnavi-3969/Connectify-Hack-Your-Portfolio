import React, { useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";

const ProjectForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [collaborators, setCollaborators] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        technologies: technologies.split(','),
        collaborators: []
      });
      setTitle('');
      setDescription('');
      setTechnologies('');
      alert('Project created successfully!');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="mb-6 text-2xl font-bold">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Technologies</label>
          <input
            type="text"
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            required
            placeholder="Comma-separated (e.g., React, Node.js, Firebase)"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;