import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Octokit } from '@octokit/rest';
import { useAuth } from '../contexts/authcontext';

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

    if (project && project.likes && userId && project.likes.includes(userId)) {
      setUserLiked(true);
    } else {
      setUserLiked(false);
    }

    if (project && project.interested && userId && project.interested.includes(userId)) {
      setInterested(true);
    } else {
      setInterested(false);
    }
  }, [project, currentUser]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const projectData = docSnap.data();
          if (projectData.comments) {
            setComments(projectData.comments);
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [projectId]);

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
            {owner && (
              <div className="p-4 mt-4 rounded-md bg-mint-green">
                <h2 className="text-xl font-bold">Owner Details</h2>
                <p>Owner: {owner.login}</p>
                <p>GitHub URL: <a href={owner.html_url} target="_blank" rel="noopener noreferrer">{owner.html_url}</a></p>
                <p>Followers: {owner.followers}</p>
                <p>Public Repos: {owner.public_repos}</p>
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
            <div className="mt-6">
              <h2 className="text-xl font-bold text-mint-green">Comments</h2>
              {comments.length > 0 ? (
                <ul className="mt-4">
                  {comments.map((comment, index) => (
                    <li key={index} className="mb-2">
                      <p className="text-white">{comment.text}</p>
                      <p className="text-sm text-gray-400">{comment.userName}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">No comments yet.</p>
              )}
              {currentUser && (
                <form onSubmit={handleAddComment} className="mt-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 text-white bg-gray-800 rounded-md focus:outline-none"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 mt-2 text-white rounded-md bg-dark-purple hover:bg-blue-700"
                  >
                    Add Comment
                  </button>
                </form>
              )}
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