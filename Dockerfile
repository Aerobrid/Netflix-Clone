# Multistage Dockerfile - builds frontend (Vite) and backend (Node/Express)

# ---- Frontend Stage ----
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy over root package files into container so frontend's "file:.." deps resolve (../ to go back 1 dir)
COPY package.json package-lock.json* ../

# Install frontend dependencies 
COPY frontend/package.json frontend/package-lock.json* ./
# (gives you frontend/node_modules directory)
RUN npm install --silent

# Copy frontend code and build 
COPY frontend/ ./
# (gives you frontend/dist dir)
RUN npm run build

# ---- Backend stage ----
FROM node:22-alpine AS backend
WORKDIR /app

# Install backend dependencies (from root package.json)
COPY package.json package-lock.json* ./
RUN npm install --production --silent

# Copy backend code to new backend folder in container
COPY backend/ ./backend

# Copy built frontend static files from dist in frontend-builder stage into the backend stage (runtime image)
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Set production environment (also set your .env variable to "production" too)
ENV NODE_ENV=production

# Expose port (ensure at runtime you supply your .env credentials)
EXPOSE 5000

# Start the Node server
CMD ["node", "backend/server.js"]
