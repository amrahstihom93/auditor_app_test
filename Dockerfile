# Dockerfile for a Next.js production build

# 1. Base Image: Use the official Node.js 20 image for building the app.
FROM node:20-slim as base

# 2. Set up the working directory
WORKDIR /app

# 3. Install dependencies
# Use a separate step for dependencies to leverage Docker's layer caching.
# This avoids re-installing dependencies every time code changes.
COPY package.json ./
COPY package-lock.json ./
RUN npm install --omit=dev


# 4. Build the application
# Copy the rest of the application source code and build the Next.js app.
COPY . .
RUN npm run build


# 5. Production Image: Use a smaller, more secure image for the final production stage.
FROM node:20-slim as production

WORKDIR /app

# Set environment variables for Next.js in production
ENV NODE_ENV=production

# Copy the built application from the 'base' stage
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Expose the port the app will run on (default 3000 for Next.js)
EXPOSE 3000

# The command to start the application
CMD ["npm", "start"]
