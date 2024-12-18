# Stage 1: Build the application
FROM node:20.11.0-alpine AS build
WORKDIR /usr/src/app

# Define build arguments for environment variables
ARG BASE_URL
ARG AUTHAPP_URL
ARG STYLEGUIDE_URL
ARG PROFILE_URL
ARG STYLEGUIDE_REMOTE_ENTRY
 
# Set environment variables for the build process
ENV BASE_URL=$BASE_URL
ENV AUTHAPP_URL=$AUTHAPP_URL
ENV STYLEGUIDE_URL=$STYLEGUIDE_URL
ENV PROFILE_URL=$PROFILE_URL
ENV STYLEGUIDE_REMOTE_ENTRY=$STYLEGUIDE_REMOTE_ENTRY

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
CMD CMD ["npm", "start"]


