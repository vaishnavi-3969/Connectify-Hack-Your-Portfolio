import React, { useState } from 'react';
import axios from 'axios';

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert('Please upload a PDF resume.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const apiKey = 'jyjJCqljap5Slrdzc3hbE1oA3V2f9KsS7ZkKojnH'; 
      const apiUrl = 'https://api.superparser.com/parse';

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-API-Key': apiKey,
        },
      });

      console.log('API Response:', response.data);

      const parsedText = response.data.data.generated_summary_text;
      setResumeText(parsedText);
      setResponseData(response.data); 
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('An error occurred while analyzing the resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 resume-analyzer">
      <h1 className="mb-4 text-2xl font-bold">Resume Analyzer</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button
        className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
      {resumeText && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-semibold">Parsed Resume Text:</h2>
          <p>{resumeText}</p>
        </div>
      )}
      {responseData && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-semibold">API Response:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;