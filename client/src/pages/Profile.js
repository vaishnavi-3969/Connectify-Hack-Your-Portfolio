import React, { useState } from "react";
import { useAuth } from "../contexts/authcontext";
import { db, auth } from "../firebase/firebase";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { doSignOut } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userLoggedIn = useAuth();
  console.log(userLoggedIn.currentUser);
  const collRef = collection(db, "profile");
  const navigate = useNavigate();

  const [techStack, setTechStack] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(userLoggedIn?.currentUser?.displayName);
  const [profileModal, setProfileModal] = useState(false);
  const [links, setLinks] = useState({
    linkedinProfile: "",
    githubProfile: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleProfileModal = () => {
    setProfileModal(!profileModal);
  };

  const handleAddTechStack = (e) => {
    e.preventDefault();
    const tech = e.target.tech.value;
    setTechStack([...techStack, tech]);
    setDoc(doc(collRef, "TechStack"), {
      techStack: [...techStack, tech],
    });
    toggleModal();
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateDoc(doc(collRef, "Profile"), {
      name,
      links,
    });
    setName(name);
    setLinks(links);
    toggleProfileModal();
  };

  const fireUser = auth.currentUser;
  console.log(fireUser);

  const getUserdetails = async () => {
    const docRef = doc(db, "profile", "GKtXJQnSpYYetOeYsPltbV4bbO73");
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
  };
  const handleSignout = () => {
    doSignOut();
    navigate("/login");
  };
  getUserdetails();
  return (
    <div>
      {userLoggedIn ? (
        <div>
          <section className="relative pt-40 pb-24">
            <img
              src="https://pagedone.io/asset/uploads/1705473908.png"
              alt="cover-image"
              className="w-full absolute top-0 left-0 z-0 h-60"
            />
            <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
              <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
                <img
                  src={userLoggedIn?.currentUser?.photoURL}
                  alt="user-avatar-image"
                  className="border-4 border-solid border-white rounded-full"
                />
              </div>
              <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
                <div className="block">
                  <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
                    {name}
                  </h3>
                  <div className="space-x-3">
                    <a
                      className="text-blue-600 underline"
                      href={links?.linkedinProfile}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                    <a
                      className="text-blue-600 underline"
                      href={links?.githubProfile}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Github
                    </a>
                  </div>
                </div>
                <div className="flex">
                  <button
                    onClick={toggleProfileModal}
                    className="py-3.5 px-5 flex rounded-full bg-indigo-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3011 8.69881L8.17808 11.8219M8.62402 12.5906L8.79264 12.8819C10.3882 15.6378 11.1859 17.0157 12.2575 16.9066C13.3291 16.7974 13.8326 15.2869 14.8397 12.2658L16.2842 7.93214C17.2041 5.17249 17.6641 3.79266 16.9357 3.0643C16.2073 2.33594 14.8275 2.79588 12.0679 3.71577L7.73416 5.16033C4.71311 6.16735 3.20259 6.67086 3.09342 7.74246C2.98425 8.81406 4.36221 9.61183 7.11813 11.2074L7.40938 11.376C7.79182 11.5974 7.98303 11.7081 8.13747 11.8625C8.29191 12.017 8.40261 12.2082 8.62402 12.5906Z"
                        stroke="white"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="px-2 font-semibold text-base leading-7 text-white">
                      Edit Profile
                    </span>
                  </button>
                  <button
                    onClick={handleSignout}
                    className="py-3.5 px-5 flex rounded-full bg-red-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700"
                  >
                    Signout
                  </button>
                </div>
                {profileModal && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                    onClick={toggleProfileModal}
                  >
                    <div
                      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Edit Profile
                      </h2>
                      <form onSubmit={handleUpdateProfile}>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter Name"
                          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                        />
                        <input
                          type="text"
                          name="linkedinProfile"
                          value={links.linkedinProfile}
                          onChange={(e) =>
                            setLinks({
                              ...links,
                              linkedinProfile: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                          placeholder="LinkedIn profile"
                          required
                        />
                        <input
                          type="text"
                          name="githubProfile"
                          value={links.githubProfile}
                          onChange={(e) =>
                            setLinks({
                              ...links,
                              githubProfile: e.target.value,
                            })
                          }
                          placeholder="Github profile"
                          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                          required
                        />
                        <button
                          type="submit"
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                        >
                          Save Changes
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex max-sm:flex-wrap max-sm:justify-center items-center gap-4">
                {techStack.map((tech, index) => (
                  <button
                    key={index}
                    className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
                  >
                    {tech}
                  </button>
                ))}
                <button
                  onClick={toggleModal}
                  className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
                >
                  +
                </button>
                {isModalOpen && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                    onClick={toggleModal}
                  >
                    <div
                      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Add Tech Stack
                      </h2>
                      <form onSubmit={handleAddTechStack}>
                        <input
                          type="text"
                          name="tech"
                          placeholder="Enter Tech Stack"
                          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                          required
                        />
                        <button
                          type="submit"
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
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

export default Profile;
