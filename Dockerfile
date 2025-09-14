# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js will run on
EXPOSE 3000

# Set environment variables (override in production as needed)
ENV NODE_ENV=production

# Build the Next.js app
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]
