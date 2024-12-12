import React, { useState, useEffect } from 'react';


const QueuePredictor = () => {
  const [queueData, setQueueData] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    emergency: false
  });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const calculatePredictedTime = (queueLength, emergency) => {
    const baseTime = emergency ? 5 : 10;
    return queueLength * baseTime;
  };

  const addSymptom = (symptom, severity) => {
    if (severity && !selectedSymptoms.some(s => s.name === symptom)) {
      setSelectedSymptoms([...selectedSymptoms, { name: symptom, severity }]);
    }
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.name !== symptom));
  };

  const getSeverityColor = (severity) => {
    if (severity === 'Low') return 'bg-green-500';
    if (severity === 'Moderate') return 'bg-yellow-500';
    if (severity === 'High') return 'bg-red-500';
    return 'bg-gray-300';
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age) return;

    const predictedTime = calculatePredictedTime(queueData.length, newPatient.emergency);
    const patient = {
      ...newPatient,
      symptoms: [...selectedSymptoms],
      predictedTime
    };

    setQueueData([...queueData, patient]);
    setNewPatient({ name: '', age: '', emergency: false });
    setSelectedSymptoms([]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setQueueData(queueData.map((patient, index) => ({
        ...patient,
        predictedTime: Math.max(0, patient.predictedTime - (index === 0 ? 1 : 0))
      })));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [queueData]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Queue Predictor</h1>
      
      <div className="mb-4 p-4 border rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Add New Patient</h2>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1" htmlFor="patient-name">Name</label>
          <input
            id="patient-name"
            type="text"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1" htmlFor="patient-age">Age</label>
          <input
            id="patient-age"
            type="number"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={newPatient.emergency}
              onChange={(e) => setNewPatient({ ...newPatient, emergency: e.target.checked })}
            />
            <span className="ml-2">Emergency Case</span>
          </label>
        </div>
        <div className="mb-2">
          <h3 className="text-sm font-medium">Symptoms</h3>
          <div className="flex space-x-2 mb-2">
            <button onClick={() => addSymptom('Fever', 'Low')} className="px-3 py-1 bg-blue-500 text-white rounded">Fever</button>
            <button onClick={() => addSymptom('Cough', 'Moderate')} className="px-3 py-1 bg-blue-500 text-white rounded">Cough</button>
            <button onClick={() => addSymptom('Chest Pain', 'High')} className="px-3 py-1 bg-blue-500 text-white rounded">Chest Pain</button>
          </div>
          <div className="flex flex-wrap space-x-2">
            {selectedSymptoms.map((symptom, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded ${getSeverityColor(symptom.severity)}`}
              >
                {symptom.name}
                <button
                  onClick={() => removeSymptom(symptom.name)}
                  className="ml-2 text-xs text-white"
                >×</button>
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={handleAddPatient}
          className="px-4 py-2 bg-green-600 text-white rounded mt-2"
        >
          Add Patient
        </button>
      </div>

      <div className="border rounded shadow">
        <h2 className="text-xl font-semibold mb-2 p-4">Queue</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Age</th>
              <th className="p-2 border-b">Emergency</th>
              <th className="p-2 border-b">Symptoms</th>
              <th className="p-2 border-b">Predicted Time</th>
            </tr>
          </thead>
          <tbody>
            {queueData.map((patient, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white">
                <td className="p-2 border-b">{patient.name}</td>
                <td className="p-2 border-b">{patient.age}</td>
                <td className="p-2 border-b">{patient.emergency ? 'Yes' : 'No'}</td>
                <td className="p-2 border-b">
                  {patient.symptoms.map((s, i) => (
                    <span
                      key={i}
                      className={`inline-block px-2 py-1 rounded ${getSeverityColor(s.severity)}`}
                    >
                      {s.name}
                    </span>
                  ))}
                </td>
                <td className="p-2 border-b">{patient.predictedTime} min</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueuePredictor;
