# Build stage
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the Vite port
EXPOSE 5173

# Run Vite in host mode so it's accessible outside the container
CMD ["npm", "run", "dev", "--", "--host"]