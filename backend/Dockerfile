# Use a lightweight Python image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code (including .pkl files)  
COPY . .

# Expose the port FastAPI runs on
EXPOSE 8000

# Command to run the server
CMD ["python", "-m", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000","--reload"]


