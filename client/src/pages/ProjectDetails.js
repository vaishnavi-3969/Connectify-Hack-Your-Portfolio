import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Octokit } from '@octokit/rest';
import { AiOutlineLike, AiFillLike, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiGithub } from 'react-icons/fi';
import { useAuth } from '../contexts/authcontext';
import { motion } from 'framer-motion';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const { currentUser } = useAuth();
  const [project, setProject] = useState(null);
  const [githubOverview, setGithubOverview] = useState(null);
  const [owner, setOwner] = useState(null);
  const [userLiked, setUserLiked] = useState(false);
  const [interested, setInterested] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

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

          const ownerDetails = await octokit.users.getByUsername({ username: owner });
          setOwner(ownerDetails.data);
        } catch (error) {
          console.error('Error fetching GitHub overview:', error);
        }
      };

      fetchGithubOverview();
    }
  }, [project]);

  useEffect(() => {
    const userId = currentUser ? currentUser.uid : null;

    if (project) {
      if (project.likes && userId && project.likes.includes(userId)) {
        setUserLiked(true);
      } else {
        setUserLiked(false);
      }

      if (project.interested && userId && project.interested.includes(userId)) {
        setInterested(true);
      } else {
        setInterested(false);
      }

      if (project.comments) {
        setComments(project.comments);
      }
    }
  }, [project, currentUser]);

  const handleLikeProject = async () => {
    const userId = currentUser ? currentUser.uid : null;

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
    const userId = currentUser ? currentUser.uid : null;

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

  const handleAddComment = async (e) => {
    e.preventDefault();
    const userId = currentUser ? currentUser.uid : null;
    const userName = currentUser ? currentUser.displayName : 'Anonymous';

    try {
      const docRef = doc(db, 'projects', projectId);

      await updateDoc(docRef, {
        comments: arrayUnion({ userId, userName, text: newComment, timestamp: new Date().toISOString() })
      });

      setNewComment('');
      setComments([...comments, { userId, userName, text: newComment, timestamp: new Date().toISOString() }]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='min-h-screen'>
      <div className="max-w-4xl p-6 mx-auto rounded-md bg-dark-purple">
        {project ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="mb-4 text-3xl font-bold text-mint-green">{project.title}</h1>
            <p className="mb-4 text-mint-green">{project.description}</p>
            <div className="mb-4">
              <p className="text-mint-green">Technologies: {project.technologies.join(', ')}</p>
            </div>
            {githubOverview && (
              <motion.div className="p-4 mb-4 rounded-md bg-mint-green"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="mb-2 text-xl font-bold">GitHub Overview</h2>
                <p>Stars: {githubOverview.stargazers_count}</p>
                <p>Forks: {githubOverview.forks_count}</p>
                <p>Open Issues: {githubOverview.open_issues_count}</p>
              </motion.div>
            )}
            {owner && (
              <motion.div className="p-4 mb-4 rounded-md bg-mint-green"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="mb-2 text-xl font-bold">Owner Details</h2>
                <p>Owner: {owner.login}</p>
                <p>GitHub URL: <a href={owner.html_url} target="_blank" rel="noopener noreferrer">{owner.html_url}</a></p>
                <p>Public Repos: {owner.public_repos}</p>
              </motion.div>
            )}
            <motion.div className="flex mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <button
                onClick={handleLikeProject}
                className={`flex items-center py-2 px-4 mr-4 rounded-md ${userLiked ? 'bg-blue-600' : 'bg-dark-purple'} text-white hover:bg-blue-700`}
              >
                {userLiked ? <AiFillHeart className="mr-2" /> : <AiOutlineHeart className="mr-2" />}
                {userLiked ? 'Liked' : 'Like'}
              </button>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center py-2 px-4 rounded-md bg-dark-purple text-white hover:bg-blue-700`}
              >
                <FiGithub className="mr-2" />
                GitHub
              </a>
            </motion.div>
            <motion.div className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="mb-4 text-xl font-bold text-mint-green">Comments</h2>
              {comments.length > 0 ? (
                <ul>
                  {comments.map((comment, index) => (
                    <motion.li key={index} className="mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <p className="text-white">{comment.text}</p>
                      <p className="text-sm text-gray-400">{comment.userName}</p>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">No comments yet.</p>
              )}
              <form onSubmit={handleAddComment} className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 mb-4 text-white bg-gray-800 rounded-md focus:outline-none"
                  rows="3"
                />
                <motion.button
                  type="submit"
                  className="px-4 py-2 text-white rounded-md bg-dark-purple hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Comment
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
