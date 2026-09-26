import React from 'react';

const PredictButton = ({ onClick, loading }) => {
  return (
    <button className="predict-btn" onClick={onClick} disabled={loading}>
      {loading ? (
        "Calculating..."
      ) : (
        <>
          <span className="btn-icon">⚡</span> Predict Rain
        </>
      )}
    </button>
  );
};

export default PredictButton;