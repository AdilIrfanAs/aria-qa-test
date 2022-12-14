FROM node:14-alpine AS build

WORKDIR /usr/src/app

RUN apk update

RUN apk add cmake make gcc g++ python3

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

FROM node:14-alpine AS production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Refer the environment variables
ARG NODE_ENV
ARG DB_NAME
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASSWORD
ARG JWT_SECRET_KEY

# Start the server using the production build
EXPOSE 8000
CMD [ "node", "dist/main.js" ]