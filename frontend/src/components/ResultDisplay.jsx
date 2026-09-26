// import React from 'react';

// const ResultDisplay = ({ data }) => {
//   // Logic to determine color based on probability string
//   const getIntensityClass = () => {
//     if (data.prediction.includes("Very high")) return "high-risk";
//     if (data.prediction.includes("High") || data.prediction.includes("Moderate")) return "mid-risk";
//     return "low-risk";
//   };

//   return (
//     <div className={`result-container ${getIntensityClass()}`}>
//       <h3>{data.probability}</h3>
//       <p>{data.prediction}</p>
//     </div>
//   );
// };

// export default ResultDisplay;
import React from 'react';

const ResultDisplay = ({ data }) => {
  if (!data) return null;

  const predictionText = data.prediction || "";
  const probabilityText = data.probability || "";

  // Logic to determine color safely based on lowercased string
  const getIntensityClass = () => {
    const text = String(predictionText).toLowerCase();

    if (text.includes("very high")) return "high-risk";
    if (text.includes("high") || text.includes("moderate")) return "mid-risk";
    return "low-risk";
  };

  return (
    <div className={`result-container ${getIntensityClass()}`}>
      <h3>{probabilityText}</h3>
      <p>{predictionText}</p>
    </div>
  );
};

export default ResultDisplay;