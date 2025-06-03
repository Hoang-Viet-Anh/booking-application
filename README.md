Backend repo: https://github.com/Hoang-Viet-Anh/booking-app-api

## Configuration

The API URL is configured in the file:
```ts
src/environments/environment.ts
```
---
Example:
```ts
export const environment = {
  apiUrl: 'http://localhost:5000'
};
```
---
## Running Locally

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd <project-directory>
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the Angular development server**
   ```bash
   ng serve
   ```
---
## Build and run docker container
  ```bash
  docker build -t booking-frontend .
  docker run -d -p 80:80 --name booking-frontend booking-frontend
  ```
