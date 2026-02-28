# Stage 1: build the application
FROM node:24-alpine AS builder

WORKDIR /app

# Copy only dependency files first
# This leverages Docker's cache — if package.json hasn't changed,
# there's no need to reinstall everything
COPY package*.json ./
RUN npm install

# Copy the rest of the code and compile TypeScript
COPY . .
RUN npm run build

# Stage 2: final production image (lighter)
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

# Copy only the compiled code from the previous stage
COPY --from=builder /app/dist ./dist

EXPOSE 7777

CMD ["node", "dist/server.js"]