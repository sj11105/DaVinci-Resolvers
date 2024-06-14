"use client";
import { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/process_report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data);
      setError(null);
    } catch (error) {
      setResult(null);
      setError(error.response.data.error || 'An error occurred.');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      
      {result && (
        <div>
          <p>Hello {result.name}!</p>
          <p>Information gathered: {result.info_read}</p>
          {result.abnormal ? (
            <p>There are abnormalities in the report.</p>
          ) : (
            <p>Your test results look great.</p>
          )}
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <h1>Know Your Diet</h1>
      <UploadForm />
    </div>
  );
}
