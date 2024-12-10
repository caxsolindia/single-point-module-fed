# Stage 1: Build the application
FROM node:20.11.0-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:dev
 
# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/dist/shell /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

