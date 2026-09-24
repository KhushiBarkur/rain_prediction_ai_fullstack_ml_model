🌧️ RainPredict AI: End-to-End Machine Learning Web App
RainPredict AI is a full-stack web application that predicts the probability of rain based on local weather parameters. The project integrates a custom-trained Logistic Regression model with a modern React frontend and a high-performance FastAPI backend.

🚀 Key Features
Real-time Prediction: Instant probability calculation using a vector-optimized NumPy engine.

Glassmorphism UI: A premium, modern interface featuring frosted glass effects and responsive design.

Dynamic Risk Assessment: Categorical results ranging from "Very Low" to "Very High" risk based on sigmoid probability scores.

Robust Error Handling: Clean state management to handle connection timeouts and input validation.

🛠️ Technical Stack
Frontend: React.js, Axios, Vite, CSS3 (Glassmorphism & Animations).

Backend: Python, FastAPI, Uvicorn.

Machine Learning: Scikit-Learn (StandardScaler), Joblib, NumPy (Vectorized Dot Product).

📐 Machine Learning LogicThe core engine utilizes a Sigmoid activation function to transform linear input into a probability range SIGMOID(z) = 1/(1+e^-z)

The backend performs real-time feature scaling and injects a bias term (intercept) before calculating the dot product of the feature vector and model weights.


