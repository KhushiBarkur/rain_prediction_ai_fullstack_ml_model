import os
import uuid
import datetime
import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from pymongo import MongoClient

app = FastAPI()

# 1. Enable CORS so your React frontend can talk to your FastAPI backend safely
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://rain-prediction-ai-fullstack-ml-model-1.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 3. Load your pre-trained ML weights and scaler files
model_weights = joblib.load('model_weights.pkl')
scaler = joblib.load("scaler.pkl")


# 4. Define Pydantic request models for validation
class WeatherData(BaseModel):
    temp: float
    humidity: float
    clouds: float
    pressure: float


class FeedbackData(BaseModel):
    prediction_id: str
    actual_outcome: bool  # True for Yes (It rained), False for No (Didn't rain)


@app.get("/")
def health_check():
    return {"status": "ok", "message": "RainPredict AI is online and connected to MongoDB"}


@app.post("/predict")
def predict(data: WeatherData):
    # --- Core ML Math Logic (Your original Logistic Regression algorithm) ---
    bias_input_value = 1
    features = np.array([[data.temp, data.humidity, data.clouds, data.pressure]])
    scaled = scaler.transform(features).flatten()
    scaled_with_bias = np.insert(scaled, 0, bias_input_value)
    z = np.dot(scaled_with_bias, model_weights)
    prob = 1 / (1 + np.exp(-z))

    percentage = prob * 100
    p_val = prob

    # Determine description matching your rules
    if 0 <= p_val < 0.25:
        prediction_text = "Very low chances of rain"
    elif 0.25 <= p_val < 0.50:
        prediction_text = "Low chances of rain"
    elif 0.50 <= p_val < 0.75:
        prediction_text = "Moderate chances of rain"
    elif 0.75 <= p_val < 0.90:
        prediction_text = "High chances of rain"
    else:
        prediction_text = "Very high chances of rain"


    return {
        "probability": f"{percentage:.2f}%",
        "prediction": prediction_text
    }

