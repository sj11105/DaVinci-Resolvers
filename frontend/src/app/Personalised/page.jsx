"use client";
import { useState } from 'react';
import axios from 'axios';

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.953 7.953 0 014 12H0c0 4.411 3.589 8 8 8v-4.709z"></path>
  </svg>
);

const formatTextWithLineBreaks = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));
};

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/process_report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h1 className="text-2xl text-black font-bold mb-4 text-center">Know Your Diet</h1>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="w-full text-black p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          onClick={handleUpload} 
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition duration-200"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Upload"}
        </button>
        
        {result && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg shadow">
            <p className="text-xl font-bold text-green-600">Hello {result.name}!</p>
            <p className="mt-2 text-lg">
              {result.abnormal ? (
                <span className="text-red-500">There are some abnormalities in the report. Relax, we got you <br/></span>
              ) : (
                <span className="text-green-600">Your test results look great. Keep up with your health.<br/></span>
              )}
            <br/>
            </p>
            <p className="mt-2 text-black text-lg">{formatTextWithLineBreaks(result.result)}</p>
            <br/>
            <h1 className="text-black text-xl font-bold mt-4">Advised diet plan</h1>
            <br/>
            <p className="text-lg text-black">{formatTextWithLineBreaks(result.plan)}</p>
            <br/>
            <h1 className="text-black text-xl font-bold mt-4">Example diet routine</h1>
            <br/>
            <p className="text-lg text-black">{formatTextWithLineBreaks(result.diet)}</p>
          </div>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <UploadForm />
    </div>
  );
}
