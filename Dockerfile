# Stage 1: Build the React Frontend
FROM node:20-slim AS build

WORKDIR /app

# Copy package files (cache invalidation optimization)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
# Note: In a real prod environment, you'd pass VITE_ env vars here or at runtime
# For this setup, we assume the user provides env vars to the running container
RUN npm run build

# Stage 2: Setup Python Backend
FROM python:3.11-slim

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy built frontend assets from Stage 1
COPY --from=build /app/dist /app/dist

# Copy backend server code
COPY server.py .

# Environment variables should be injected by the deployment platform (Back4App)
# ENV OPENAI_API_KEY=...

# Expose port (Back4App/Heroku often use $PORT, but we'll default to 80 for typical container usage)
# Modify command to use $PORT if needed, or mapping 80->80
EXPOSE 80

# Run the server
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "80"]
