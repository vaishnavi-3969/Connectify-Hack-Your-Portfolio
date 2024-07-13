import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Octokit } from '@octokit/rest';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [githubOverview, setGithubOverview] = useState(null);
  const [userLiked, setUserLiked] = useState(false);
  const [interested, setInterested] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (project?.githubLink) {
      const fetchGithubOverview = async () => {
        try {
          const octokit = new Octokit();
          const [owner, repo] = project.githubLink.split('/').slice(-2);

          const { data } = await octokit.repos.get({ owner, repo });
          setGithubOverview(data);
        } catch (error) {
          console.error('Error fetching GitHub overview:', error);
        }
      };

      fetchGithubOverview();
    }
  }, [project]);

  useEffect(() => {
    const userId = 'user123'; 

    if (project && project.likes && project.likes.includes(userId)) {
      setUserLiked(true);
    } else {
      setUserLiked(false);
    }

    if (project && project.interested && project.interested.includes(userId)) {
      setInterested(true);
    } else {
      setInterested(false);
    }
  }, [project]);

  const handleLikeProject = async () => {
    const userId = 'user123'; 

    try {
      const docRef = doc(db, 'projects', projectId);

      if (!userLiked) {
        await updateDoc(docRef, {
          likes: arrayUnion(userId)
        });
      } else {
        await updateDoc(docRef, {
          likes: arrayRemove(userId)
        });
      }

      setUserLiked(!userLiked);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleInterested = async () => {
    const userId = 'user123'; 

    try {
      const docRef = doc(db, 'projects', projectId);

      if (!interested) {
        await updateDoc(docRef, {
          interested: arrayUnion(userId)
        });
      } else {
        await updateDoc(docRef, {
          interested: arrayRemove(userId)
        });
      }

      setInterested(!interested);
    } catch (error) {
      console.error('Error updating interest:', error);
    }
  };

  return (
    <div className='min-h-screen'>
      <div className="max-w-4xl p-6 mx-auto rounded-md bg-dark-purple">
      {project ? (
        <>
          <h1 className="text-3xl font-bold text-mint-green">{project.title}</h1>
          <p className="text-mint-green">{project.description}</p>
          <p className="text-mint-green">Technologies: {project.technologies.join(', ')}</p>
          {githubOverview && (
            <div className="p-4 mt-4 rounded-md bg-mint-green">
              <h2 className="text-xl font-bold">GitHub Overview</h2>
              <p>Stars: {githubOverview.stargazers_count}</p>
              <p>Forks: {githubOverview.forks_count}</p>
              <p>Open Issues: {githubOverview.open_issues_count}</p>
            </div>
          )}
          <div className="mt-4">
            <button
              onClick={handleLikeProject}
              className={`py-2 px-4 mr-4 rounded-md ${userLiked ? 'bg-blue-600' : 'bg-dark-purple'} text-white hover:bg-blue-700`}
            >
              {userLiked ? 'Liked' : 'Like'}
            </button>
            <button
              onClick={handleInterested}
              className={`py-2 px-4 rounded-md ${interested ? 'bg-blue-600' : 'bg-dark-purple'} text-white hover:bg-blue-700`}
            >
              {interested ? 'Not Interested' : 'Show Interest'}
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default ProjectDetails;