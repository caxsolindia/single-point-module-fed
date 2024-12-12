# Stage 1: Build the application
FROM node:20.11.0-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm run ins
COPY . .
RUN npm run build
 
# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/dist/shell /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]

