# Stage 1: Build the application
FROM node:20.11.0-alpine AS build
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci || { echo "Base npm install failed"; exit 1; }

# Copy the application files
COPY . .

# Debugging step to list files
RUN ls -la Mfes/

# Install and build
RUN npm run ins || { echo "npm run ins failed"; exit 1; }
RUN npm run build || { echo "npm run build failed"; exit 1; }

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/dist/shell /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]


