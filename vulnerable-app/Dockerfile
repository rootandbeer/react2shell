# Vulnerable React2Shell Docker Image
# This image contains a Next.js application vulnerable to CVE-2025-55182 / CVE-2025-66478
# FOR EDUCATIONAL PURPOSES ONLY - DO NOT USE IN PRODUCTION

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]


