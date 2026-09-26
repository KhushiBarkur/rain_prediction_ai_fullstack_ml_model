import { useState } from 'react';
import axios from 'axios';
import InputField from './components/InputField';
import PredictButton from './components/PredictButton';
import ResultDisplay from './components/ResultDisplay';
import './index.css';

function App() {
  // Initial state for weather parameters
  const initialState = {
    temp: "",
    humidity: "",
    clouds: "",
    pressure: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Updates specific fields in the state
  const handleChange = (name, value) => {
    if (value === "") {
      setFormData((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    // Regex check: Only allow numbers and a single decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    setFormData((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleReset = (e) => {
    if (e) e.preventDefault();
    setFormData(initialState);
    setResult(null);
  };

  // Sends data to your Python backend
  const handlePredict = async (e) => {
    // Prevent default event behavior if button triggers a form reload
    if (e && e.preventDefault) e.preventDefault(); 
    
    setLoading(true);
    try {
      const dataToSend = {
        temp: formData.temp === "" ? 0 : parseFloat(formData.temp),
        humidity: formData.humidity === "" ? 0 : parseFloat(formData.humidity),
        clouds: formData.clouds === "" ? 0 : parseFloat(formData.clouds),
        pressure: formData.pressure === "" ? 0 : parseFloat(formData.pressure)
      };

      const API_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:8000' 
        : 'https://rain-prediction-ai-fullstack-ml-model.onrender.com';

      const response = await axios.post(`${API_URL}/predict`, dataToSend);
      
      // Log response to inspect structure in Browser Console (F12)
      console.log("Prediction Response:", response.data); 
      
      setResult(response.data);
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Check your backend connection!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="rain-card">
        <header className="card-header">
          <div className="brand">
            <span className="brand-logo">🌧️</span>
            <h2>RainPredict AI</h2>
          </div>
          <p className="subtitle">Enter parameters to calculate probability of rain based on the following factors via our ML model.</p>
        </header>

        <div className="input-grid">
          <InputField label="TEMPERATURE" icon="🌡️" unit="°C" name="temp" value={formData.temp} onChange={handleChange} />
          <InputField label="HUMIDITY" icon="💧" unit="%" name="humidity" value={formData.humidity} onChange={handleChange} />
          <InputField label="AIR PRESSURE" icon="⏲️" unit="mb" name="pressure" value={formData.pressure} onChange={handleChange} />
          <InputField label="CLOUD COVERAGE" icon="☁️" unit="%" name="clouds" value={formData.clouds} onChange={handleChange} />
        </div>

        <div className="button-group">
          <PredictButton onClick={handlePredict} loading={loading} />
          <button type="button" className="reset-icon-btn" onClick={handleReset} title="Reset">
            🔄
          </button>
        </div>

        {result && <ResultDisplay data={result} />}
      </div>
    </div>
  );
}

export default App;