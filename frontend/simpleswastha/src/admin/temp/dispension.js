import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Camera } from 'lucide-react';

const Edit= () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const webcamRef = useRef(null);

  const handleScan = async () => {
    setScanning(true);
    setResult(null);
    setError(null);

    try {
      // Capture photo from webcam
      const imageSrc = webcamRef.current.getScreenshot();
      
      // Convert base64 to blob
      const blob = await (await fetch(imageSrc)).blob();
      
      // Create form data
      const formData = new FormData();
      formData.append('image', blob, 'qr-scan.jpg');

      // Send to backend
      const response = await axios.post('http://127.0.0.1:8000/api/api/qr-scan/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data.item);
      setScanning(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Scanning failed');
      setScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4">Inventory QR Code Scanner</h2>
      
      <div className="w-full max-w-md mb-4">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full rounded-lg shadow-md"
        />
      </div>

      <button 
        onClick={handleScan} 
        disabled={scanning}
        className={`flex items-center justify-center px-4 py-2 rounded ${
          scanning 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        <Camera className="mr-2" />
        {scanning ? 'Scanning...' : 'Scan QR Code'}
      </button>

      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h3 className="text-lg font-bold">Item Details:</h3>
          <p>Name: {result.Inv_name}</p>
          <p>Remaining Quantity: {result.Inv_quantity}</p>
          <p>Category: {result.Inv_category}</p>
          <p>Batch Number: {result.batch_number}</p>
        </div>
      )}
    </div>
  );
};

export default Edit;