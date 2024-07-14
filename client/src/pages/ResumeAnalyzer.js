import React, { useEffect, useState } from "react";
import axios from "axios";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [dataBackend, setDataBackend] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a PDF resume.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const apiKey = "jyjJCqljap5Slrdzc3hbE1oA3V2f9KsS7ZkKojnH";
      const apiUrl = "https://api.superparser.com/parse";

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-API-Key": apiKey,
        },
      });

      console.log("API Response:", response.data);

      const parsedText = response.data.data.generated_summary_text;
      setResumeText(parsedText);
      setResponseData(response.data);
      axios
        .post("http://127.0.0.1:5000/analyze-resume", response.data)
        .then((res) => {
          console.log("Response text", res.data);
          setDataBackend(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("An error occurred while analyzing the resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const analysis = dataBackend.replace(/[&\\#+()$~%'":*?<>{}]/g, "");
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-center">Resume Analyzer</h1>
      <div className="flex items-center justify-center mb-4">
        <label
          htmlFor="resumeFile"
          className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Upload PDF Resume
          <input
            id="resumeFile"
            type="file"
            className="hidden"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="flex items-center justify-center mb-4">
        <button
          className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>
      {resumeText && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-semibold">Parsed Resume Text:</h2>
          <p>{resumeText}</p>
        </div>
      )}
      {dataBackend && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-semibold">Resume Analysis:</h2>
          <p>{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
