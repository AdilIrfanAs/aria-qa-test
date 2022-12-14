# build environment
FROM node:14-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci
RUN npm install react-scripts@5.0.1 -g
COPY . ./
RUN rm ./.eslintrc.json
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Refer the environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_TIMEZONE_OFFSET

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]