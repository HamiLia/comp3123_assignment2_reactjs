# Node base image
FROM node:18

# Set workdir
WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start command
CMD ["npm", "start"]
