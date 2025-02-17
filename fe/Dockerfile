# Use an official Node.js runtime as a base image for building
FROM node:21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (better caching)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app (default is production mode)
RUN npm run build

# Use a smaller, lightweight base image for the final image
FROM nginx:alpine

# Ensure required directories exist before setting permissions
RUN mkdir -p /var/cache/nginx /var/run/nginx /var/log/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx /var/log/nginx

# Adjust permissions for serving static files
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R g+rX /usr/share/nginx/html

# Copy the build output to Nginx's default static file serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the default Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose both port 80 and 8080 for flexibility
EXPOSE 80 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
