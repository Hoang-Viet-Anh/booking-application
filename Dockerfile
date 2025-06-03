FROM node:18 AS build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN ls -la /app/dist/booking-application  # Debug: verify files exist

FROM nginx:alpine
COPY --from=build-stage /app/dist/booking-application /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
