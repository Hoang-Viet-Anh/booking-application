FROM node:18 AS build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN ls -la /app/dist/booking-application/browser  # Debug: verify files exist

FROM nginx:alpine

# Copy the built application
COPY --from=build-stage /app/dist/booking-application/browser /usr/share/nginx/html

RUN cd /usr/share/nginx/html && if [ -f index.csr.html ]; then mv index.csr.html index.html; fi

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]