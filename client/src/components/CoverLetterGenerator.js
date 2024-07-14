import React, { useState } from "react";
import { getDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import axios from "axios";
import { saveAs } from "file-saver";

const CoverLetterGenerator = () => {
  const [response, setResponse] = useState("");
  const collRef = collection(db, "profile");
  const userDocRef = doc(collRef, auth.currentUser.uid);
  const userDoc = getDoc(userDocRef);

  const handleSubmit = (e) => {
    e.preventDefault();
    userDoc
      .then((doc) => {
        if (doc.exists()) {
          const dbData = doc.data();
          console.log(dbData.techStack);
          axios
            .post("http://127.0.0.1:5000/cover-letter", {
              name: dbData.name,
              githubProfile: dbData.githubProfile,
              linkedinProfile: dbData.linkedinProfile,
              techStack: dbData.techStack,
            })
            .then((res) => {
              console.log(res.data);
              setResponse(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("No such document");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function saveText(text) {
    var data = new Blob([response], { type: "application/msword" });
    saveAs(data, "coverletter.doc");
  }
  return (
    <div>
      <form action="">
        <textarea
          id="message"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        <button
          onClick={handleSubmit}
          class="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      <div>
        <p> {response}</p>
        <button
          onClick={saveText}
          class="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
